using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using POI_2024.Server.DBContext;
using POI_2024.Server.Models;

namespace POI_2024.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]

    public class TareasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TareasController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> InsertTarea([FromBody] TareasUsers newTareaUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Tareas newTarea = newTareaUser.Tarea;
            List<UserSelected> userSelected = newTareaUser.Usuarios;
            _context.Tareas.Add(newTarea);
            await _context.SaveChangesAsync();

            int IDTarea = newTarea.ID_Tareas;

            foreach (var user in userSelected)
            {
                Console.WriteLine("Hola entraste al cicloforeach: " + user.Matricula);
                StatusTareas NewStatusTareas = new StatusTareas
                {
                    IDTarea = IDTarea,
                    Matricula = user.Matricula,
                    Status = 1
                };

                _context.StatusTareas.Add(NewStatusTareas);
                await _context.SaveChangesAsync();

            }

            return CreatedAtAction(nameof(GetTareaByID), new { ID_Tareas = newTarea.ID_Tareas }, newTarea);
        }

        [HttpGet("{IDChat}")]
        public async Task<ActionResult<IEnumerable<Tareas>>> GetTareasOfChat(int IDChat)
        {
            var AssignmentsFound = await _context.Tareas.Where(u => 
             u.ID_Chat == IDChat).ToListAsync();
            
            return Ok(AssignmentsFound);
        }

        [HttpGet(Name = "GetTareaByID")]
        public async Task<ActionResult<Tareas>> GetTareaByID(int IDTarea)
        {
            var Tarea = await _context.Tareas.FindAsync(IDTarea);
            if (Tarea == null)
            {
                return NotFound();
            }

            return Tarea;
        }
    }
}
