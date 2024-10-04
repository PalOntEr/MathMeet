CREATE TABLE [dbo].[UsuariosPremios] (
    [UsuarioPremio] INT IDENTITY (1, 1) NOT NULL,
    [Matricula]     INT NULL,
    [ID_Premio]     INT NULL,
    PRIMARY KEY CLUSTERED ([UsuarioPremio] ASC),
    FOREIGN KEY ([ID_Premio]) REFERENCES [dbo].[Premios] ([ID_Premio]),
    FOREIGN KEY ([Matricula]) REFERENCES [dbo].[Usuarios] ([Matricula])
);


GO

