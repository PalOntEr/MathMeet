namespace POI_2024.Server.Models
{
    public class Tareas
    {
        public int ID_Tareas { get; set; }
        public int ID_Chat { get; set; }
        public DateTime FechaCreacion { get; set; } = DateTime.Now;
        public DateTime? FechaFinalizacion { get; set; }
        public string Descripcion { get; set; }
        public string Nombre { get; set; }
        public int CalCoins { get; set; }
    }

    public class TareasUsers
    {
        public Tareas Tarea { get; set; }
        public List<UserSelected> Usuarios { get; set; }
    }
}
