namespace POI_2024.Server.Models
{
    public class Archivo
    {
        public int ID_Archivo { get; set; }
        public string Nombre { get; set; }
        public string MIMEType { get; set; }
        public int Tamano { get; set; }
        public Byte[] Contenido { get; set; }
        public DateTime FechaRegistro { get; set; } = DateTime.Now;

    }
}
