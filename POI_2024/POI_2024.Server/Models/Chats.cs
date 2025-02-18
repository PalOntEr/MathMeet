namespace POI_2024.Server.Models
{
    public class Chats
    {
        public int ID_Chat { get; set; }
        public string Nombre { get; set; }

        public int UsuarioAdmin { get; set; }
        public int ID_ArchivoFoto { get; set; }

    }

    public class ChatsWithImage
        {
        public int ID_Chat { get; set; }
        public string Nombre { get; set; }
        public Byte[] Foto { get; set; }
        }

    public class ChatFoundInfo
    {
        public Chats ChatInfo { get; set; }
        public List<UserSelected> Integrantes { get; set; }
    }

    public class ChatsRegister
    {
        public Chats ChatInfo { get; set; }
        public List<UserSelected> UsuarioList { set; get; }
    }
    public class ChatUsuarios
    {
        public int ID_ChatUsuario { get; set; }
        public int ID_Chat { get; set; }
        public int Integrante { get; set; }
    }
}
