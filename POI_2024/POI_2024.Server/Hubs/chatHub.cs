using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;


namespace POI_2024.Server.Hubs
{
    public class ChatHub : Hub
    {

        public async Task JoinChat(string ChatID)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, ChatID);
        }

        public async Task OnDisconnectedAsync(Exception exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "ChatID");
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(string user, string message,string ChatID)
        {
            await Clients.Group(ChatID).SendAsync("ReceiveMessage", user, message);
        }
    }
}
