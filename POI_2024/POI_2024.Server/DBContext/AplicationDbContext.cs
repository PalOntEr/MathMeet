using Microsoft.EntityFrameworkCore;
using POI_2024.Server.Models;
namespace POI_2024.Server.DBContext
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuario>().HasKey(u => u.Matricula);
            modelBuilder.Entity<Chats>().HasKey(u => u.ID_Chat);
            modelBuilder.Entity<ChatUsuarios>().HasKey(u => u.ID_ChatUsuario);
            modelBuilder.Entity<Mensajes>().HasKey(u => u.ID_Mensaje);
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Chats> Chats { get; set; }
        public DbSet<ChatUsuarios> ChatsUsuarios { get; set; }
        public DbSet<Mensajes> Mensajes { get; set; }
    }
}



