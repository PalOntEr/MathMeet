IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'POI_2024')
BEGIN
    CREATE DATABASE POI_2024;
END;
GO

USE POI_2024;

DROP TABLE IF EXISTS Mensajes;
DROP TABLE IF EXISTS ArchivosTareas;
DROP TABLE IF EXISTS Tareas;
DROP TABLE IF EXISTS ChatsUsuarios;
DROP TABLE IF EXISTS Chats;
DROP TABLE IF EXISTS UsuariosPremios;
DROP TABLE IF EXISTS Premios;
DROP TABLE IF EXISTS Usuarios;
DROP TABLE IF EXISTS Archivos;

CREATE TABLE Archivos(
    ID_Archivo INT PRIMARY KEY IDENTITY(1,1),
    Nombre VARCHAR(255) NOT NULL,
    MIMEType VARCHAR(255) NOT NULL,
    Tamano INT NOT NULL,
    Contenido VARBINARY(MAX) NOT NULL,
    FechaRegistro DATETIME DEFAULT GETDATE()
);

CREATE TABLE Usuarios(
    Matricula INT PRIMARY KEY,
    NombreCompleto VARCHAR(200) NOT NULL,
    Contrasena VARCHAR(150) NOT NULL,
    ID_ArchivoFoto INT FOREIGN KEY REFERENCES Archivos(ID_Archivo),
    CalCoins INT NOT NULL DEFAULT 0
);

CREATE TABLE Premios(
    ID_Premio INT PRIMARY KEY IDENTITY(1,1),
    ID_ArchivoPremio INT FOREIGN KEY REFERENCES Archivos(ID_Archivo),
    Costo INT NOT NULL
);

CREATE TABLE UsuariosPremios(
    UsuarioPremio INT PRIMARY KEY IDENTITY(1,1),
    Matricula INT FOREIGN KEY REFERENCES Usuarios(Matricula),
    ID_Premio INT FOREIGN KEY REFERENCES Premios(ID_Premio)
);

CREATE TABLE Chats(
    ID_Chat INT PRIMARY KEY IDENTITY(1,1),
    Nombre VARCHAR(100),
    UsuarioAdmin INT FOREIGN KEY REFERENCES Usuarios(Matricula),
    ID_ArchivoFoto INT FOREIGN KEY REFERENCES Archivos(ID_Archivo)
);

CREATE TABLE ChatsUsuarios(
    ID_ChatUsuario INT PRIMARY KEY IDENTITY(1,1),
    ID_Chat INT FOREIGN KEY REFERENCES Chats(ID_Chat),
    Integrante INT FOREIGN KEY REFERENCES Usuarios(Matricula)
);

CREATE TABLE Mensajes(
    ID_Mensaje INT PRIMARY KEY IDENTITY(1,1),
    UsuarioEmisor INT FOREIGN KEY REFERENCES Usuarios(Matricula),
    ChatReceptor INT FOREIGN KEY REFERENCES Chats(ID_Chat),
    Mensaje TEXT,
    FechaEnvio DATETIME DEFAULT GETDATE(),
    Archivo INT FOREIGN KEY REFERENCES Archivos(ID_Archivo)
);

CREATE TABLE Tareas(
    ID_Tareas INT PRIMARY KEY IDENTITY(1,1),
    ID_Chat INT FOREIGN KEY REFERENCES Chats(ID_Chat),
    FechaCreacion DATETIME DEFAULT GETDATE(),
    FechaFinalizacion DATETIME,
    Descripcion TEXT NOT NULL,
    Nombre VARCHAR(30) NOT NULL,
    Estatus INT NOT NULL,
    CalCoins INT NOT NULL
);

CREATE TABLE ArchivosTareas(
    Matricula INT,
    ID_Archivo INT,
    ID_Tarea INT,
    PRIMARY KEY (Matricula, ID_Archivo, ID_Tarea),
    FOREIGN KEY (Matricula) REFERENCES Usuarios(Matricula),
    FOREIGN KEY (ID_Archivo) REFERENCES Archivos(ID_Archivo),
    FOREIGN KEY (ID_Tarea) REFERENCES Tareas(ID_Tareas)
);