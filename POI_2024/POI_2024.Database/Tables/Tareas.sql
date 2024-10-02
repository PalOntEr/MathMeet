CREATE TABLE [dbo].[Tareas] (
    [ID_Tareas]         INT          IDENTITY (1, 1) NOT NULL,
    [ID_Chat]           INT          NULL,
    [FechaCreacion]     DATETIME     DEFAULT (getdate()) NULL,
    [FechaFinalizacion] DATETIME     NULL,
    [Descripcion]       TEXT         NOT NULL,
    [Nombre]            VARCHAR (30) NOT NULL,
    [Estatus]           INT          NOT NULL,
    [CalCoins]          INT          NOT NULL,
    PRIMARY KEY CLUSTERED ([ID_Tareas] ASC),
    FOREIGN KEY ([ID_Chat]) REFERENCES [dbo].[Chats] ([ID_Chat])
);


GO

