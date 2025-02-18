using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using POI_2024.Server.DBContext;
using POI_2024.Server.Models;

namespace POI_2024.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]

    public class UsersTareasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersTareasController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet("{Matricula},{IsAdmin}")]
        
        public async Task<ActionResult<IEnumerable<Tareas>>> GetTareasOfUser(int Matricula, bool IsAdmin)
        {
            if (IsAdmin)
            {
                var AssignmentsFound = await _context.Tareas.Join(
                    _context.Chats,
                    tareas => tareas.ID_Chat,
                    chats => chats.ID_Chat,
                    (tareas, chats) => new { Tareas = tareas, Chats = chats }
                    ).Where(joined => joined.Chats.UsuarioAdmin == Matricula).Select(joined => joined.Tareas).ToListAsync();
                return Ok(AssignmentsFound);

            }
            else
            {
                var AssignmentsFound = await _context.StatusTareas.Join(
                    _context.Tareas,
                    statustareas => statustareas.IDTarea,
                    tareas => tareas.ID_Tareas,
                    (statustareas, tareas) => new {StatusTareas = statustareas, Tareas = tareas }
                    ).Where(joined => joined.StatusTareas.Matricula == Matricula).Select(joined => joined.Tareas).ToListAsync();
            return Ok(AssignmentsFound);
            }
        }

        [HttpGet("{IDTarea}")]

        public async Task<ActionResult<IEnumerable<UserTareaStatus>>> GetListOfUsersTarea(int IDTarea)
        {
            var UserTareaStatusFound = await _context.StatusTareas.Join(
                _context.Usuarios,
                statustareas => statustareas.Matricula,
                usuarios => usuarios.Matricula,
                (statustareas, usuarios) => new { StatusTareas = statustareas, Usuarios = usuarios }
                ).Join(
                _context.Archivos,
                joined => joined.Usuarios.ID_ArchivoFoto,
                archivos => archivos.ID_Archivo,
                (joined, archivos) => new { joined.StatusTareas, joined.Usuarios, Archivos = archivos}
                ).Where(joined => joined.StatusTareas.IDTarea == IDTarea).Select(joined => new {
                joined.Usuarios.Matricula,
                joined.Usuarios.NombreCompleto,
                joined.Archivos.Contenido,
                joined.StatusTareas.Status}).ToListAsync();
                
            if(UserTareaStatusFound == null)
            {
                return NotFound();
            }
            else
            {
                Console.WriteLine("Si se encontro algo gg");
            }

            return Ok(UserTareaStatusFound);
        }

        [HttpGet]
        
        public async Task<ActionResult<int>> GetStatusOfTarea(int IDTarea, int Matricula)
        {
            var Tarea = await _context.StatusTareas.Where(u=> u.IDTarea == IDTarea && u.Matricula == Matricula).Select(p => p.Status).FirstOrDefaultAsync();
            if (Tarea == null)
            {
                return NotFound();
            }
            return Tarea;
        }

        [HttpPut]
        public async Task<ActionResult> UpdateStatusOfTarea([FromBody] UpdateTareaRequest request)
        {
            var TareaToUpdate = await _context.StatusTareas.Where(u=> u.IDTarea == request.IDTarea && u.Matricula == request.Matricula).FirstOrDefaultAsync();

            if(TareaToUpdate == null)
            {
                return NotFound();
            }

            TareaToUpdate.Status = request.Accepted;
            await _context.SaveChangesAsync();

            return Ok("Tarea Updated"); 
        }
    }
}
