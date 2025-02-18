CREATE TABLE [dbo].[ChatsUsuarios] (
    [ID_ChatUsuario] INT IDENTITY (1, 1) NOT NULL,
    [ID_Chat]        INT NULL,
    [Integrante]     INT NULL,
    PRIMARY KEY CLUSTERED ([ID_ChatUsuario] ASC),
    FOREIGN KEY ([ID_Chat]) REFERENCES [dbo].[Chats] ([ID_Chat]),
    FOREIGN KEY ([Integrante]) REFERENCES [dbo].[Usuarios] ([Matricula])
);


GO

