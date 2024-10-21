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
    }
}