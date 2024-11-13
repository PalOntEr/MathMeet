CREATE TABLE [dbo].[Mensajes] (
    [ID_Mensaje]    INT      IDENTITY (1, 1) NOT NULL,
    [UsuarioEmisor] INT      NOT NULL,
    [ChatReceptor]  INT      NOT NULL,
    [Mensaje]       TEXT     NULL,
    [FechaEnvio]    DATETIME2 DEFAULT (getdate()) NOT NULL,
    [ID_Archivo]       INT      NULL,
    [Encrypted] BIT NULL, 
    PRIMARY KEY CLUSTERED ([ID_Mensaje] ASC),
    FOREIGN KEY ([ID_Archivo]) REFERENCES [dbo].[Archivos] ([ID_Archivo]),
    FOREIGN KEY ([ChatReceptor]) REFERENCES [dbo].[Chats] ([ID_Chat]),
    FOREIGN KEY ([UsuarioEmisor]) REFERENCES [dbo].[Usuarios] ([Matricula])
);


GO

