using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using POI_2024.Server.DBContext;
using POI_2024.Server.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace POI_2024.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LogInController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LogInController(ApplicationDbContext context)
        {
            _context = context;
        }


        //Post para iniciar sesion 
        [HttpPost (Name = "LogIn")] 

        public async Task<ActionResult<Usuario>> LogIn([FromBody] UserLoginRequest userToLog)
        {

            // Validamos si el modelo recibido es válido
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);// Si el modelo no es válido, regresamos un error 400
            }

            // buscamos el usuario en la base de datos
            var user = await _context.Usuarios
                .Where(u => u.Matricula == userToLog.Matricula)
                .FirstOrDefaultAsync(); //regresa el primero que encuentre o si no regresa null


            if (user == null) //aqui es si no encontró la condicion buscada
            {
                return NotFound(new { Message = "Usuario no registrado" });
            }

            if (user.Contrasena != userToLog.Contrasena)
            {
                return Unauthorized(new { Message = "Contraseña incorrecta" });
            }

            return Ok(user);


        }
    }
}
