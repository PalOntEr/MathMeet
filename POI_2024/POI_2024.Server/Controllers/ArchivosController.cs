using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using POI_2024.Server.DBContext;
using POI_2024.Server.Models;

namespace POI_2024.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]

    public class ArchivosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ArchivosController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> InsertArchive([FromBody] Archivo newArchive)
        {

            // Validamos si el modelo recibido es válido
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);  // Si el modelo no es válido, regresamos un error 400
            }

            // Insertamos el usuario en la base de datos
            _context.Archivos.Add(newArchive);
            await _context.SaveChangesAsync();  // Guardamos los cambios en la base de datos de forma asíncrona

            // Retornamos un resultado 201 Created, con la ruta al nuevo recurso creado
            return CreatedAtAction(nameof(GetArchivoById), new { ID_Archivo = newArchive.ID_Archivo }, newArchive);

        }

        [HttpGet(Name = "GetArchivobyID")]
        public async Task<ActionResult<Archivo>> GetArchivoById(int ID_Archivo)
        {
            var ID_ArchivoFound = await _context.Archivos.FindAsync(ID_Archivo);
            if (ID_ArchivoFound == null)
            {
                return NotFound();
            }

            return ID_ArchivoFound;
        }

        [HttpGet("{ID_Archivo}")]
        public async Task<ActionResult<Archivo>> GetArchivo(int ID_Archivo)
        {
            Archivo ArchivoFound = await _context.Archivos.Where(u=> u.ID_Archivo == ID_Archivo).FirstOrDefaultAsync();
            if (ArchivoFound == null)
            {
                return NotFound();
            }

            return ArchivoFound;
        }
    }
}
