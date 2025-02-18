namespace POI_2024.Server.Models
{
    public class Premios
    {
        public int ID_Premio { get; set; }
        public int ID_ArchivoPremio { get; set; }
        public int Costo { get; set; }
    }

    public class PremiosContent
    {
        public Premios InfoPremio { get; set; }
        public Byte[] PremioContenido { get; set; }
    }
}
