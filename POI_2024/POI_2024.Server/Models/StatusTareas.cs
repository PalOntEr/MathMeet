namespace POI_2024.Server.Models
{
    public class StatusTareas
    {
        public int IDStatusTarea { get; set; }
        public int IDTarea {  get; set; }
        public int Matricula { get; set; }
        public int Status { get; set; }

    }

    public class UpdateTareaRequest
    {
        public int IDTarea { get; set; }
        public int Matricula { get; set; }
        public bool Accepted { get; set; }
    }
}
