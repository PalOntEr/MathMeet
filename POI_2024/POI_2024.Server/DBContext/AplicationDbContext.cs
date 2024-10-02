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
            modelBuilder.Entity<Usuario>().HasKey(u => u.Matricula); // Add this line to define the primary key
        }

        public DbSet<Usuario> Usuarios { get; set; }
    }
}



