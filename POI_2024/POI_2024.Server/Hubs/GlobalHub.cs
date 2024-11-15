using Microsoft.AspNetCore.SignalR;
using POI_2024.Server.DBContext;
using Microsoft.EntityFrameworkCore;
using System.Collections.Concurrent;
using Microsoft.Identity.Client;

namespace POI_2024.Server.Hubs
{
    public class GlobalHub : Hub
    {
        private static readonly ConcurrentDictionary<string, (int Matricula, string ChatID)> ConnectedUsers = new();
        public async Task JoinPage(int Matricula)
        {
            var connectionId = Context.ConnectionId;
            var matricula = Matricula; // Replace with your actual retrieval logic

            // Add user to the global list
            ConnectedUsers[connectionId] = (matricula, "Global");
            var ActiveUsers = ConnectedUsers.Select(pair => pair.Value.Matricula).ToList();
            // Notify clients about user connection
            await Clients.All.SendAsync("UserConnected", matricula);
            await Clients.All.SendAsync("UpdateUsers", ActiveUsers);
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var connectionId = Context.ConnectionId;

            // Remove user from the global list
            if (ConnectedUsers.TryRemove(connectionId, out var userData))
            {
                // Notify clients about user disconnection
                await Clients.All.SendAsync("UserDisconnected", userData.Matricula);
            }
        }

        public async Task LeavePage(int Matricula)
        {
            var connectionId = ConnectedUsers
    .Where(pair => pair.Value.Matricula == Matricula)
    .Select(pair => pair.Key)
    .FirstOrDefault();
            if (ConnectedUsers.TryRemove(connectionId, out var userData))
            {
                // Notify clients about user disconnection
                await Clients.All.SendAsync("UserDisconnected", userData.Matricula);
            }
        }
    }
}
