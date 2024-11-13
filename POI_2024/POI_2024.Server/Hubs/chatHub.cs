using Microsoft.AspNetCore.SignalR;
using POI_2024.Server.DBContext;
using Microsoft.EntityFrameworkCore;
using POI_2024.Server.Models;


namespace POI_2024.Server.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ApplicationDbContext _context;

        public ChatHub(ApplicationDbContext context)
        {
            _context = context;

        }
        public async Task JoinChat(string ChatID, int Matricula)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, ChatID);
            await Clients.Group(ChatID).SendAsync("UserConnected", Matricula);
        }

        public async Task OnDisconnectedAsync(Exception? exception, int Matricula, string ChatID)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "ChatID");
            await Clients.Group(ChatID).SendAsync("UserDisconnected", Matricula);
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(string user, string message,int? IDArchive, string ChatID, int UserID, bool Encrypted)
        {

            var UserFound = await _context.Usuarios.Where(u => u.Matricula == UserID).Select(u => u.ID_ArchivoFoto).FirstOrDefaultAsync();
            var FotoFound = await _context.Archivos.Where(u => u.ID_Archivo == UserFound).FirstOrDefaultAsync();
            if (IDArchive != null)
            {
                var ArchiveFound = await _context.Archivos.Where(u => u.ID_Archivo == IDArchive).FirstOrDefaultAsync();
                await Clients.Group(ChatID).SendAsync("ReceiveMessage", user, message, ArchiveFound, DateTime.Now,FotoFound, Encrypted);
            }
            else
            {
                await Clients.Group(ChatID).SendAsync("ReceiveMessage", user, message, null, DateTime.Now,FotoFound, Encrypted);
            }
        }
    }
}
