CREATE TABLE [dbo].[Chats] (
    [ID_Chat]        INT           IDENTITY (1, 1) NOT NULL,
    [Nombre]         VARCHAR (100) NULL,
    [UsuarioAdmin]   INT           NULL,
    [ID_ArchivoFoto] INT           NULL,
    PRIMARY KEY CLUSTERED ([ID_Chat] ASC),
    FOREIGN KEY ([ID_ArchivoFoto]) REFERENCES [dbo].[Archivos] ([ID_Archivo]),
    FOREIGN KEY ([UsuarioAdmin]) REFERENCES [dbo].[Usuarios] ([Matricula])
);


GO

