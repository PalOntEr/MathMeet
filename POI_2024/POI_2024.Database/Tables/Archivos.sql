CREATE TABLE [dbo].[Archivos] (
    [ID_Archivo]    INT             IDENTITY (1, 1) NOT NULL,
    [Nombre]        VARCHAR (255)   NOT NULL,
    [MIMEType]      VARCHAR (255)   NOT NULL,
    [Tamano]        INT             NOT NULL,
    [Contenido]     VARBINARY (MAX) NOT NULL,
    [FechaRegistro] DATETIME        DEFAULT (getdate()) NULL,
    PRIMARY KEY CLUSTERED ([ID_Archivo] ASC)
);


GO

