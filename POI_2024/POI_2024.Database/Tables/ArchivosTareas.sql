CREATE TABLE [dbo].[ArchivosTareas] (
    [Matricula]  INT NOT NULL,
    [ID_Archivo] INT NOT NULL,
    [ID_Tarea]   INT NOT NULL,
    PRIMARY KEY CLUSTERED ([Matricula] ASC, [ID_Archivo] ASC, [ID_Tarea] ASC),
    FOREIGN KEY ([ID_Archivo]) REFERENCES [dbo].[Archivos] ([ID_Archivo]),
    FOREIGN KEY ([ID_Tarea]) REFERENCES [dbo].[Tareas] ([ID_Tareas]),
    FOREIGN KEY ([Matricula]) REFERENCES [dbo].[Usuarios] ([Matricula])
);


GO

