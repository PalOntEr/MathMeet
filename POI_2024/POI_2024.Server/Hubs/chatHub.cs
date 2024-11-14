using Microsoft.AspNetCore.SignalR;
using POI_2024.Server.DBContext;
using Microsoft.EntityFrameworkCore;
using POI_2024.Server.Models;


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
            ConnectedUsers[Matricula.ToString()] = (Matricula,ChatID);

            var activeUsers = ConnectedUsers
                .Where(pair => pair.Value == (Matricula, ChatID))
                .Select(pair => pair.Key)
                .ToList();

            await Groups.AddToGroupAsync(Context.ConnectionId, ChatID);
            await Clients.Group(ChatID).SendAsync("UpdateActiveUsers", activeUsers);

        }

        public async Task LeaveChat(string ChatID, int Matricula)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, ChatID);
            await Clients.Group(ChatID).SendAsync("UserDisconnected", Matricula);
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            if (ConnectedUsers.TryGetValue(Context.ConnectionId, out var userInfo))
            {   
                // Remove user from the dictionary
                ConnectedUsers.Remove(Context.ConnectionId);

                // Notify clients about the updated active users
                var activeUsers = ConnectedUsers
                    .Where(pair => pair.Value.ChatID == userInfo.ChatID)
                    .Select(pair => pair.Value.Matricula)
                    .ToList();

                await Clients.Group(userInfo.ChatID).SendAsync("UpdateActiveUsers", activeUsers);
                await Clients.Group(userInfo.ChatID).SendAsync("UserDisconnected", activeUsers);
            }

            await base.OnDisconnectedAsync(exception);
        }
        public override async Task OnConnectedAsync()
        {
            // Retrieve user information from the context or query parameters
            string? matricula = Context.GetHttpContext()?.Request.Query["Matricula"];
            string? chatID = Context.GetHttpContext()?.Request.Query["ChatID"];
            // Ensure the matricula and chatId values are valid (optional: add further validation)
            if (!string.IsNullOrEmpty(matricula) && !string.IsNullOrEmpty(chatID))
            {
                // Add or update the ConnectedUsers dictionary with the new connection
                ConnectedUsers[Context.ConnectionId] = (Int32.Parse(matricula), chatID);

                // Add the user to the appropriate SignalR group
                await Groups.AddToGroupAsync(Context.ConnectionId, chatID);

                // Optionally notify clients about the new connection
                List<int> activeUsers = ConnectedUsers
                    .Where(pair => pair.Value.ChatID == chatID)
                    .Select(pair => pair.Value.Matricula)
                    .ToList();

                await Clients.Group(chatID).SendAsync("UpdateActiveUsers", activeUsers);
            }

            await base.OnConnectedAsync();
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
