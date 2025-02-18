using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using POI_2024.Server.DBContext;
using POI_2024.Server.Models;

namespace POI_2024.Server.Controllers
{

    [Route("[controller]")]
    [ApiController]

    public class ArchivosTareasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ArchivosTareasController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]

        public async Task<IActionResult> InsertArchivoOfTarea([FromBody] ArchivosTareas NewArchivoTarea)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.ArchivosTareas.Add(NewArchivoTarea);
            await _context.SaveChangesAsync();

            var ExistingTarea = await _context.StatusTareas.FirstOrDefaultAsync(u =>
            u.Matricula == NewArchivoTarea.Matricula &&
            u.IDTarea == NewArchivoTarea.ID_Tarea);

            if(ExistingTarea != null)
            {
                ExistingTarea.Status = 2;
                _context.SaveChanges();
            }
            else
            {
                Console.WriteLine("Tarea not found");
            }

            return Ok(ExistingTarea);
        }

        [HttpGet]

        public async Task<List<Archivo>> GetArchivosOfTareaOfUser(int IdTarea, int Matricula)
        {
            var ArchivosFound = await _context.ArchivosTareas.Join(
                _context.Archivos,
                archivostareas => archivostareas.ID_Archivo,
                archivos => archivos.ID_Archivo,
                (archivostareas, archivos) => new { ArchivosTareas = archivostareas, Archivos = archivos }
                ).Where(joined => joined.ArchivosTareas.ID_Tarea == IdTarea && joined.ArchivosTareas.Matricula == Matricula).
                Select(joined => joined.Archivos).ToListAsync();


            return ArchivosFound;
        }
    }
}
