﻿namespace POI_2024.Server.Models
{
    public class Usuario
    {
        public int Matricula { get; set; }
        public string? NombreCompleto { get; set; }
        public string? Contrasena { get; set; }
        public int? ID_ArchivoFoto { get; set; }
        public int? CalCoins { get; set; }
        public int? status { get; set; }
        public bool? Encrypt { get; set; }
    }

    public class UserSelected
    {
        public int Matricula { set; get; }
        public string Nombre { set; get; }

        public int? Active { set; get; }
    }   
    public class UserLoginRequest
    {
        public int Matricula { get; set; }
        public string Contrasena { get; set; }
    }

    public class UserTareaStatus
    {
        public UserSelected Users { get; set; }

        public Byte[] Contenido { get; set; }
        public int Status { get; set; }
    }
}
