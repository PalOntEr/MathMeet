using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using POI_2024.Server.Models;
using POI_2024.Server.DBContext;
using Microsoft.AspNetCore.Identity.Data;


namespace POI_2024.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MensajesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MensajesController(ApplicationDbContext context)
        {
            _context = context;

        }

        [HttpGet]

        public async Task<ActionResult<IEnumerable<UsuarioMensaje>>> GetMensajesOfChat(int ID_Chat)
        {
            var MessagesFound = await _context.Mensajes.Where(u => u.ChatReceptor == ID_Chat).ToListAsync();

            List<UsuarioMensaje> ListOfMessages = new List<UsuarioMensaje>();
            foreach (var Message in MessagesFound)
            {
                var UsuarioName = await _context.Usuarios.Where(u=> u.Matricula == Message.UsuarioEmisor).Select(u=> u.NombreCompleto).FirstOrDefaultAsync();
                Archivo ArchiveFound = null;
                if (Message.ID_Archivo != null)
                {
                   ArchiveFound = await _context.Archivos.Where(u => u.ID_Archivo == Message.ID_Archivo).FirstOrDefaultAsync();
                }

                var UsuarioMensajeFound = new UsuarioMensaje
                {
                    ID_Mensaje = Message.ID_Mensaje,
                    Mensaje = Message.Mensaje ?? "",
                    FechaEnvio = Message.FechaEnvio,
                    UsuarioEmisor = UsuarioName,
                    Archivo = ArchiveFound
                };
                ListOfMessages.Add(UsuarioMensajeFound);
            }
            return Ok(ListOfMessages);
        }

        [HttpPost]
        public async Task<IActionResult> InsertMessage([FromBody] Mensajes mensaje)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Mensajes.Add(mensaje);
            
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(InsertMessage), new { ID_Mensaje = mensaje.ID_Mensaje }, mensaje);
        }
    }
}
