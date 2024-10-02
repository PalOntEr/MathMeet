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
        public async IAsyncEnumerable<Usuario> Get()
        {
            var usuarios = await _context.Usuarios.ToListAsync();
            foreach (var usuario in usuarios)
            {
                yield return usuario;
            }
        }
    }
}