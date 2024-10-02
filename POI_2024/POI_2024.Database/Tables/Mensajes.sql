CREATE TABLE [dbo].[Mensajes] (
    [ID_Mensaje]    INT      IDENTITY (1, 1) NOT NULL,
    [UsuarioEmisor] INT      NULL,
    [ChatReceptor]  INT      NULL,
    [Mensaje]       TEXT     NULL,
    [FechaEnvio]    DATETIME DEFAULT (getdate()) NULL,
    [Archivo]       INT      NULL,
    PRIMARY KEY CLUSTERED ([ID_Mensaje] ASC),
    FOREIGN KEY ([Archivo]) REFERENCES [dbo].[Archivos] ([ID_Archivo]),
    FOREIGN KEY ([ChatReceptor]) REFERENCES [dbo].[Chats] ([ID_Chat]),
    FOREIGN KEY ([UsuarioEmisor]) REFERENCES [dbo].[Usuarios] ([Matricula])
);


GO

