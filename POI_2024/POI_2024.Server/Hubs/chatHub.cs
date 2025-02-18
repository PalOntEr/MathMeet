using Microsoft.AspNetCore.SignalR;
using POI_2024.Server.DBContext;
using Microsoft.EntityFrameworkCore;
using POI_2024.Server.Models;
using System;


namespace POI_2024.Server.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ApplicationDbContext _context;

        private static readonly Dictionary<string, (int Matricula, string ChatID)> ConnectedUsers = new();
        public ChatHub(ApplicationDbContext context)
        {
            _context = context;

        }
        public async Task JoinChat(string ChatID, int Matricula)
        {
            ConnectedUsers[Context.ConnectionId] = (Matricula,ChatID);

            var activeUsers = ConnectedUsers
                .Where(pair => pair.Value.ChatID == ChatID)
                .Select(pair => pair.Value.Matricula   )
                .ToList();

            await Groups.AddToGroupAsync(Context.ConnectionId, ChatID);

            Console.WriteLine("USUARIO QUE SE CONECTO: " + Matricula);
            Console.WriteLine("CHAT AL QUE SE CONECTO: " +  ChatID);
            foreach (var kvp in ConnectedUsers)
            {
                Console.WriteLine($"Key: {kvp.Key}, Value: {kvp.Value}");
            }

            foreach (var user in activeUsers)
            {
                Console.WriteLine($"User: {user}");
            }
            await Clients.Group(ChatID).SendAsync("UpdateActiveUsers", activeUsers);
        }

        public async Task LeaveChat(string ChatID, int Matricula)
        {
            Console.WriteLine("TOP 5 HIJOS DE SU PUTA MADRE CAPTADOS EN CAMARA " + Matricula);
            await Clients.Group(ChatID).SendAsync("UserDisconnected", Matricula);
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            // Retrieve the ConnectionId of the user disconnecting
            string connectionId = Context.ConnectionId;

            // Check if the user exists in the ConnectedUsers dictionary
            if (ConnectedUsers.ContainsKey(connectionId))
            {
                // Retrieve user data before removing
                var userData = ConnectedUsers[connectionId];
                string chatId = userData.ChatID;
                int matricula = userData.Matricula;

                // Remove the user from the ConnectedUsers dictionary
                ConnectedUsers.Remove(connectionId);

                // Optionally remove the user from the SignalR group if needed
                await Groups.RemoveFromGroupAsync(connectionId, chatId);

                // Log for debugging purposes (optional)
                Console.WriteLine($"User with Matricula: {matricula} disconnected from ChatID: {chatId}");

                // Update the active users for the specific chat
                var activeUsers = ConnectedUsers
                    .Where(pair => pair.Value.ChatID == chatId)
                    .Select(pair => pair.Value.Matricula)
                    .ToList();

                // Send the updated list of active users to all clients in the chat
                await Clients.Group(chatId).SendAsync("UpdateActiveUsers", activeUsers);
            }

            // Call the base method
            await base.OnDisconnectedAsync(exception);
        }
        
        public async Task SendMessage(string user, string message,int? IDArchive, string ChatID, int UserID, bool? Encrypted, bool? Location)
        {

            var UserFound = await _context.Usuarios.Where(u => u.Matricula == UserID).Select(u => u.ID_ArchivoFoto).FirstOrDefaultAsync();
            var FotoFound = await _context.Archivos.Where(u => u.ID_Archivo == UserFound).FirstOrDefaultAsync();
            if (IDArchive != null)
            {
                var ArchiveFound = await _context.Archivos.Where(u => u.ID_Archivo == IDArchive).FirstOrDefaultAsync();
                await Clients.Group(ChatID).SendAsync("ReceiveMessage", user, message, ArchiveFound, DateTime.Now, FotoFound, Encrypted, Location);
            }
            else
            {
                await Clients.Group(ChatID).SendAsync("ReceiveMessage", user, message, null, DateTime.Now, FotoFound, Encrypted, Location);
            }
        }

        public async Task SendLocation(string user, string message, string ChatID, int UserID)
        {
            var UserFound = await _context.Usuarios.Where(u => u.Matricula == UserID).Select(u => u.ID_ArchivoFoto).FirstOrDefaultAsync();
            var FotoFound = await _context.Archivos.Where(u => u.ID_Archivo == UserFound).FirstOrDefaultAsync();
            await Clients.Group(ChatID).SendAsync("ReceiveMessage", user, message, null, DateTime.Now, FotoFound, false, true);
        }
    }
}
