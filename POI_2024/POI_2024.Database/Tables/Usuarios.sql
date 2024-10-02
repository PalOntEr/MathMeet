CREATE TABLE [dbo].[Usuarios] (
    [Matricula]      INT           NOT NULL,
    [NombreCompleto] VARCHAR (200) NOT NULL,
    [Contrasena]     VARCHAR (150) NOT NULL,
    [ID_ArchivoFoto] INT           NULL,
    [CalCoins]       INT           DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([Matricula] ASC),
    FOREIGN KEY ([ID_ArchivoFoto]) REFERENCES [dbo].[Archivos] ([ID_Archivo])
);


GO

