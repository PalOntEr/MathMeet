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
            ConnectedUsers[Matricula.ToString()] = (Matricula,ChatID);

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
            await Clients.Group(ChatID).SendAsync("UserDisconnected", Matricula);
        }

        public async Task SendMessage(string user, string message,int? IDArchive, string ChatID, int UserID, bool? Encrypted)
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
