using Microsoft.VisualBasic;

namespace POI_2024.Server.Models
{
    public class Mensajes
    {
        public int ID_Mensaje { get; set; }
        public int UsuarioEmisor {  get; set; }
        public int ChatReceptor { get; set; }
        public string Mensaje { get; set; }
        public DateTime FechaEnvio { get; set; } = DateTime.Now;
        public int? ID_Archivo { get; set; }

    }

    public class UsuarioMensaje
    {
        public int ID_Mensaje { get; set; }
        public string Mensaje { get; set; }
        public DateTime FechaEnvio { get; set; }
        public string UsuarioEmisor { get; set; }

        public Byte[] Archivo { get; set; }
    }
}
