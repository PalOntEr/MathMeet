using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using POI_2024.Server.DBContext;
using POI_2024.Server.Models;

namespace POI_2024.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]

    public class UserEmotesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserEmotesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Archivo>>> GetEmotesFromUser(int User) {

            var ListOfEmotesFound = await _context.UsuariosPremios.Where(u => u.Matricula == User).ToListAsync();

            var emoteIDs = ListOfEmotesFound.Select(e => e.ID_Premio).ToList();
            var EmotesFound = await _context.Archivos.Where(a => emoteIDs.Contains(a.ID_Archivo)).ToListAsync();
            return Ok(EmotesFound);
        }

        [HttpPost]

        public async Task<ActionResult> RegisterPurchase([FromBody]UsuariosPremios PremioToRegister)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _context.UsuariosPremios.AddAsync(PremioToRegister);
            var UsuarioFound = await _context.Usuarios.Where(u => u.Matricula == PremioToRegister.Matricula).FirstOrDefaultAsync();
            var Premio = await _context.Premios.Where(u => u.ID_Premio == PremioToRegister.ID_Premio).Select(u => u.Costo).FirstOrDefaultAsync();
            UsuarioFound.CalCoins -= Premio;

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
