using Microsoft.AspNetCore.SignalR;
using POI_2024.Server.DBContext;
using Microsoft.EntityFrameworkCore;


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

        public async Task SendMessage(string user, string message,int? IDArchive, string ChatID, int UserID)
        {

            var UserFound = await _context.Usuarios.Where(u => u.Matricula == UserID).Select(u => u.ID_ArchivoFoto).FirstOrDefaultAsync();
            var FotoFound = await _context.Archivos.Where(u => u.ID_Archivo == UserFound).FirstOrDefaultAsync();
            if (IDArchive != null)
            {
                var ArchiveFound = await _context.Archivos.Where(u => u.ID_Archivo == IDArchive).FirstOrDefaultAsync();
                await Clients.Group(ChatID).SendAsync("ReceiveMessage", user, message, ArchiveFound, DateTime.Now,FotoFound);
            }
            else
            {
                await Clients.Group(ChatID).SendAsync("ReceiveMessage", user, message, null, DateTime.Now,FotoFound);
            }
        }
    }
}
