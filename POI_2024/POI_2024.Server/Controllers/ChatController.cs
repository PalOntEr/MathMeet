using Microsoft.AspNetCore.Mvc;
using POI_2024.Server.Models;
using POI_2024.Server.DBContext;
using static POI_2024.Server.Models.ChatsRegister;
using System.ComponentModel;
using Microsoft.Extensions.Configuration.EnvironmentVariables;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace POI_2024.Server.Controllers
{

    [Route("[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ChatController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpPost("{IDChat}")]

        public async Task<IActionResult> InsertUserIntoChat(int IDChat, [FromBody] List<UserSelected> UsersListAdded)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            List<Object> usersAdded = new List<Object>();
            foreach(var UserSelected in UsersListAdded)
            {
                int User = UserSelected.Matricula;
            _context.ChatsUsuarios.Add(new ChatUsuarios { ID_Chat = IDChat, Integrante = User});
                usersAdded.Add(new ChatUsuarios { ID_Chat = IDChat, Integrante = User });
            }

            await _context.SaveChangesAsync();
            return new JsonResult(usersAdded);
        }

        [HttpPost]
        public async Task<IActionResult> InsertChat([FromBody] ChatsRegister newChat)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var Chat = newChat.ChatInfo;

            _context.Chats.Add(Chat);
            await _context.SaveChangesAsync();
            var chatId = Chat.ID_Chat;

            var UsersSelected = newChat.UsuarioList;
            foreach (var User in UsersSelected)
            {
                var UsuarioAgregado = new ChatUsuarios
                {
                    ID_Chat = chatId,
                    Integrante = User.Matricula
                };

                _context.ChatsUsuarios.Add(UsuarioAgregado);
            }
            var UserAdmin = new ChatUsuarios
            {
                ID_Chat = chatId,
                Integrante = newChat.ChatInfo.UsuarioAdmin
            };

            _context.ChatsUsuarios.Add(UserAdmin);
            await _context.SaveChangesAsync();

            return Ok();
        } 

        [HttpGet ("{IDChat}")]

        public async Task<ActionResult<ChatFoundInfo>> GetChatInfo(int IDChat)
        {
            var ChatInfoFound = await _context.Chats.Where(u => u.ID_Chat == IDChat).FirstOrDefaultAsync();

            var ListOfUsers = await _context.ChatsUsuarios.Where(u => u.ID_Chat == IDChat).Select(
                u => new
                {
                    u.Integrante
                }).ToListAsync();
            List<UserSelected> ListOfUsersFound = new List<UserSelected>();

            foreach(var IDUser in ListOfUsers)
            {
                var Username = await _context.Usuarios.Where(u => u.Matricula == IDUser.Integrante).Select(
                    u => new { u.NombreCompleto,
                        u.Matricula,
                    u.status}
                ).FirstOrDefaultAsync();

                var UserSelected = new UserSelected
                {
                    Nombre = Username.NombreCompleto,
                    Matricula = Username.Matricula,
                    Active = Username.status
                };

                ListOfUsersFound.Add(UserSelected);
            };

            var ChatInfoWithUsers = new ChatFoundInfo
            {
                ChatInfo = ChatInfoFound,
                Integrantes = ListOfUsersFound
            };

            return (ChatInfoWithUsers);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Chats>>> GetChats(int UserLoggedIn)
        {
            var ID_ChatsFound = await _context.ChatsUsuarios.Where(u =>
            u.Integrante == UserLoggedIn).Select(u => new
            {
                u.ID_Chat
            }).ToListAsync();

            var ChatIDS = ID_ChatsFound.Select(c => c.ID_Chat).ToList();

            var ChatsFound = await _context.Chats.Where(u => ChatIDS.Contains(u.ID_Chat)).Select(
                u => new
                {
                    u.Nombre,
                    u.ID_Chat
                }).ToListAsync();

            return Ok(ChatsFound);
        }
    }
}
