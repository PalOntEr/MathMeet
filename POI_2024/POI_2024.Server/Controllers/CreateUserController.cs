using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using POI_2024.Server.Models;
using POI_2024.Server.DBContext;
using Microsoft.AspNetCore.Identity.Data;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace POI_2024.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CreateUserController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public CreateUserController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST api/<ValuesController>
        [HttpPost]
        public async Task<IActionResult> InsertUser([FromBody] Usuario newUser)
        {

            // Validamos si el modelo recibido es válido
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);  // Si el modelo no es válido, regresamos un error 400
            }

            // Insertamos el usuario en la base de datos
            _context.Usuarios.Add(newUser);
            await _context.SaveChangesAsync();  // Guardamos los cambios en la base de datos de forma asíncrona

            // Retornamos un resultado 201 Created, con la ruta al nuevo recurso creado
            return CreatedAtAction(nameof(GetUsuarioById), new { matricula = newUser.Matricula }, newUser);

        }


        // Para obtener un usuario por su matricula
        [HttpGet(Name = "GetUsuariosbyID")]
        public async Task<ActionResult<Usuario>> GetUsuarioById(int matricula)
        {
            var usuario = await _context.Usuarios.FindAsync(matricula);
            if (usuario == null)
            {
                return NotFound();
            }

            return usuario;
        }

    }
}
