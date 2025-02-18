CREATE TABLE [dbo].[Premios] (
    [ID_Premio]        INT IDENTITY (1, 1) NOT NULL,
    [ID_ArchivoPremio] INT NULL,
    [Costo]            INT NOT NULL,
    PRIMARY KEY CLUSTERED ([ID_Premio] ASC),
    FOREIGN KEY ([ID_ArchivoPremio]) REFERENCES [dbo].[Archivos] ([ID_Archivo])
);


GO

