using Microsoft.AspNetCore.SignalR;
using POI_2024.Server.DBContext;
using Microsoft.EntityFrameworkCore;
using POI_2024.Server.Models;
using System.Threading.Tasks;


namespace POI_2024.Server.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ApplicationDbContext _context;

        public ChatHub(ApplicationDbContext context)
        {
            _context = context;

        }
        public async Task JoinChat(string ChatID)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, ChatID);
        }

        public async Task OnDisconnectedAsync(Exception exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "ChatID");
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(string user, string message,int? IDArchive, string ChatID)
        {

            if (IDArchive != null)
            {
                var ArchiveFound = await _context.Archivos.Where(u => u.ID_Archivo == IDArchive).FirstOrDefaultAsync();
                await Clients.Group(ChatID).SendAsync("ReceiveMessage", user, message, ArchiveFound, DateTime.Now);
            }
            else
            {
                await Clients.Group(ChatID).SendAsync("ReceiveMessage", user, message, null, DateTime.Now);
            }
        }
    }
}
