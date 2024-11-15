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
            modelBuilder.Entity<Archivo>().HasKey(u => u.ID_Archivo);
            modelBuilder.Entity<UsuariosPremios>().HasKey(u => u.UsuarioPremio);
            modelBuilder.Entity<Tareas>().HasKey(u => u.ID_Tareas);
            modelBuilder.Entity<StatusTareas>().HasKey(u => u.IDStatusTarea);
            modelBuilder.Entity<ArchivosTareas>().HasKey(u => new { u.Matricula, u.ID_Archivo, u.ID_Tarea});
            modelBuilder.Entity<Premios>().HasKey(u => new { u.ID_Premio});
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Chats> Chats { get; set; }
        public DbSet<ChatUsuarios> ChatsUsuarios { get; set; }
        public DbSet<Mensajes> Mensajes { get; set; }
        public DbSet<Archivo> Archivos { get; set; }
        public DbSet<UsuariosPremios> UsuariosPremios { get; set; }
        public DbSet<Tareas> Tareas { get; set; }
        public DbSet<StatusTareas> StatusTareas { get; set; }
        public DbSet<ArchivosTareas> ArchivosTareas { get; set; }
        public DbSet<Premios> Premios { get; set; }
    }
}



