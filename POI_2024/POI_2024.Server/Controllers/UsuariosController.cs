using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using POI_2024.Server.Models;
using POI_2024.Server.DBContext;

namespace POI_2024.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsuariosController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetUsuarios")]
        public async Task<ActionResult<IEnumerable<Usuario>>> Get([FromQuery] string? name)
        {
            if (!string.IsNullOrWhiteSpace(name))
            {
                var UsersFound = await _context.Usuarios.Where(u => u.NombreCompleto.Contains(name)).Select( u => new
                {
                    u.NombreCompleto,
                    u.Matricula
                }).ToListAsync();
                return Ok(UsersFound);
            }

            var Users = await _context.Usuarios.Select(u => new
            {
                u.NombreCompleto,
                u.Matricula
            }).ToListAsync();
            return Ok(Users);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] Usuario UsuarioToUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var UsuarioFound = await _context.Usuarios.Where(u => u.Matricula == UsuarioToUpdate.Matricula).FirstOrDefaultAsync();
            Console.WriteLine(UsuarioFound);
            if (UsuarioFound == null)
            {
                return NotFound("User not found");
            }

            // Update only the fields that are not null
            if (!string.IsNullOrEmpty(UsuarioToUpdate.NombreCompleto))
            {
                UsuarioFound.NombreCompleto = UsuarioToUpdate.NombreCompleto;
            }

            if (!string.IsNullOrEmpty(UsuarioToUpdate.Contrasena))
            {
                UsuarioFound.Contrasena = UsuarioToUpdate.Contrasena;
            }

            if (UsuarioToUpdate.ID_ArchivoFoto != null)
            {
                UsuarioFound.ID_ArchivoFoto = UsuarioToUpdate.ID_ArchivoFoto;
            }

            if (UsuarioToUpdate.CalCoins != 0)
            {
                UsuarioFound.CalCoins += UsuarioToUpdate.CalCoins;
            }

            if (UsuarioToUpdate.Encrypt != null)
            {
                UsuarioFound.Encrypt = UsuarioToUpdate.Encrypt;
            }

            if (UsuarioToUpdate.status != null)
            {
                UsuarioFound.status = UsuarioToUpdate.status;
            }
            // Save changes to the database
            await _context.SaveChangesAsync();

            return Ok("User information updated successfully");
        }
    }
}