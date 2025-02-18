using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using POI_2024.Server.Models;
using POI_2024.Server.DBContext;
using Microsoft.AspNetCore.Identity.Data;

namespace POI_2024.Server.Controllers
{
        [Route("[controller]")]
        [ApiController]
        public class PremiosController : ControllerBase
        {
            private readonly ApplicationDbContext _context;

            public PremiosController(ApplicationDbContext context)
            {
                _context = context;
            }

            [HttpGet]

            public async Task<ActionResult<IEnumerable<PremiosContent>>> GetPremios()
            {
            return (
            await _context.Premios.Join(
                _context.Archivos,
                premios => premios.ID_ArchivoPremio,
                archivos => archivos.ID_Archivo,
                (premios, archivos) => new { InfoPremio = premios, PremioContenido = archivos.Contenido }
                ).Select(joined => new PremiosContent{ InfoPremio = joined.InfoPremio, PremioContenido = joined.PremioContenido}).ToListAsync()
            );
            }
        }
}
