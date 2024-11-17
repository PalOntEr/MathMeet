CREATE TABLE [dbo].[StatusTareas](
[IDStatusTarea] INT IDENTITY(1,1) PRIMARY KEY,
[IDTarea] INT ,
[Matricula] INT,
[Status] INT,
FOREIGN KEY ([IDTarea]) REFERENCES Tareas([ID_Tareas]),
FOREIGN KEY ([Matricula]) REFERENCES Usuarios([Matricula])
)