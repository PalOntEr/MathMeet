-- Insert dummy data into database

INSERT INTO Archivos (Nombre, MIMEType, Tamano, Contenido, FechaRegistro)
VALUES ('Archivo1', 'image/jpeg', 1024, 0x0123456789ABCDEF, GETDATE());

INSERT INTO Usuarios (Matricula, NombreCompleto, Contrasena, ID_ArchivoFoto, CalCoins)
VALUES (123456, 'John Doe', 'password123', 1, 100);

INSERT INTO Premios (ID_ArchivoPremio, Costo)
VALUES (1, 50);

INSERT INTO UsuariosPremios (Matricula, ID_Premio)
VALUES (123456, 1);

INSERT INTO Chats (Nombre, UsuarioAdmin, ID_ArchivoFoto)
VALUES ('Chat1', 123456, 1);

INSERT INTO ChatsUsuarios (ID_Chat, Integrante)
VALUES (1, 123456);

INSERT INTO Mensajes (UsuarioEmisor, ChatReceptor, Mensaje, Archivo)
VALUES (123456, 1, 'Hello', 1);

INSERT INTO Tareas (ID_Chat, FechaCreacion, Descripcion, Nombre, Estatus, CalCoins)
VALUES (1, GETDATE(), 'Task 1', 'Task 1', 1, 10);

INSERT INTO ArchivosTareas (Matricula, ID_Archivo, ID_Tarea)
VALUES (123456, 1, 1);

INSERT INTO Archivos (Nombre, MIMEType, Tamano, Contenido, FechaRegistro)
VALUES ('Archivo2', 'image/png', 2048, 0xABCDEF0123456789, GETDATE());

INSERT INTO Usuarios (Matricula, NombreCompleto, Contrasena, ID_ArchivoFoto, CalCoins)
VALUES (654321, 'Jane Smith', 'password456', 2, 200);

INSERT INTO Premios (ID_ArchivoPremio, Costo)
VALUES (2, 100);

INSERT INTO UsuariosPremios (Matricula, ID_Premio)
VALUES (654321, 2);

INSERT INTO Chats (Nombre, UsuarioAdmin, ID_ArchivoFoto)
VALUES ('Chat2', 654321, 2);

INSERT INTO ChatsUsuarios (ID_Chat, Integrante)
VALUES (2, 654321);

INSERT INTO Mensajes (UsuarioEmisor, ChatReceptor, Mensaje, Archivo)
VALUES (654321, 2, 'Hi', 2);

INSERT INTO Tareas (ID_Chat, FechaCreacion, Descripcion, Nombre, Estatus, CalCoins)
VALUES (2, GETDATE(), 'Task 2', 'Task 2', 1, 20);

INSERT INTO ArchivosTareas (Matricula, ID_Archivo, ID_Tarea)
VALUES (654321, 2, 2);

INSERT INTO Archivos (Nombre, MIMEType, Tamano, Contenido, FechaRegistro)
VALUES ('Archivo3', 'image/jpeg', 3072, 0x0123456789ABCDEF, GETDATE());

INSERT INTO Usuarios (Matricula, NombreCompleto, Contrasena, ID_ArchivoFoto, CalCoins)
VALUES (789012, 'Alice Johnson', 'password789', 3, 300);

INSERT INTO Premios (ID_ArchivoPremio, Costo)
VALUES (3, 150);

INSERT INTO UsuariosPremios (Matricula, ID_Premio)
VALUES (789012, 3);

INSERT INTO Chats (Nombre, UsuarioAdmin, ID_ArchivoFoto)
VALUES ('Chat3', 789012, 3);

INSERT INTO ChatsUsuarios (ID_Chat, Integrante)
VALUES (3, 789012);

INSERT INTO Mensajes (UsuarioEmisor, ChatReceptor, Mensaje, Archivo)
VALUES (789012, 3, 'Hey', 3);

INSERT INTO Tareas (ID_Chat, FechaCreacion, Descripcion, Nombre, Estatus, CalCoins)
VALUES (3, GETDATE(), 'Task 3', 'Task 3', 1, 30);

INSERT INTO ArchivosTareas (Matricula, ID_Archivo, ID_Tarea)
VALUES (789012, 3, 3);

INSERT INTO Archivos (Nombre, MIMEType, Tamano, Contenido, FechaRegistro)
VALUES ('Archivo4', 'image/png', 4096, 0xABCDEF0123456789, GETDATE());

INSERT INTO Usuarios (Matricula, NombreCompleto, Contrasena, ID_ArchivoFoto, CalCoins)
VALUES (345678, 'Bob Williams', 'password012', 4, 400);

INSERT INTO Premios (ID_ArchivoPremio, Costo)
VALUES (4, 200);

INSERT INTO UsuariosPremios (Matricula, ID_Premio)
VALUES (345678, 4);

INSERT INTO Chats (Nombre, UsuarioAdmin, ID_ArchivoFoto)
VALUES ('Chat4', 345678, 4);

INSERT INTO ChatsUsuarios (ID_Chat, Integrante)
VALUES (4, 345678);

INSERT INTO Mensajes (UsuarioEmisor, ChatReceptor, Mensaje, Archivo)
VALUES (345678, 4, 'Hola', 4);

INSERT INTO Tareas (ID_Chat, FechaCreacion, Descripcion, Nombre, Estatus, CalCoins)
VALUES (4, GETDATE(), 'Task 4', 'Task 4', 1, 40);

INSERT INTO ArchivosTareas (Matricula, ID_Archivo, ID_Tarea)
VALUES (345678, 4, 4);

INSERT INTO Archivos (Nombre, MIMEType, Tamano, Contenido, FechaRegistro)
VALUES ('Archivo5', 'image/jpeg', 5120, 0x0123456789ABCDEF, GETDATE());

INSERT INTO Usuarios (Matricula, NombreCompleto, Contrasena, ID_ArchivoFoto, CalCoins)
VALUES (567890, 'Charlie Brown', 'password345', 5, 500);

INSERT INTO Premios (ID_ArchivoPremio, Costo)
VALUES (5, 250);

INSERT INTO UsuariosPremios (Matricula, ID_Premio)
VALUES (567890, 5);

INSERT INTO Chats (Nombre, UsuarioAdmin, ID_ArchivoFoto)
VALUES ('Chat5', 567890, 5);

INSERT INTO ChatsUsuarios (ID_Chat, Integrante)
VALUES (5, 567890);

INSERT INTO Mensajes (UsuarioEmisor, ChatReceptor, Mensaje, Archivo)
VALUES (567890, 5, 'Greetings', 5);

INSERT INTO Tareas (ID_Chat, FechaCreacion, Descripcion, Nombre, Estatus, CalCoins)
VALUES (5, GETDATE(), 'Task 5', 'Task 5', 1, 50);

INSERT INTO ArchivosTareas (Matricula, ID_Archivo, ID_Tarea)
VALUES (567890, 5, 5);

INSERT INTO Archivos (Nombre, MIMEType, Tamano, Contenido, FechaRegistro)
VALUES ('Archivo6', 'image/png', 6144, 0xABCDEF0123456789, GETDATE());

INSERT INTO Usuarios (Matricula, NombreCompleto, Contrasena, ID_ArchivoFoto, CalCoins)
VALUES (678901, 'David Smith', 'password678', 6, 600);

INSERT INTO Premios (ID_ArchivoPremio, Costo)
VALUES (6, 300);

INSERT INTO UsuariosPremios (Matricula, ID_Premio)
VALUES (678901, 6);

INSERT INTO Chats (Nombre, UsuarioAdmin, ID_ArchivoFoto)
VALUES ('Chat6', 678901, 6);

INSERT INTO ChatsUsuarios (ID_Chat, Integrante)
VALUES (6, 678901);

INSERT INTO Mensajes (UsuarioEmisor, ChatReceptor, Mensaje, Archivo)
VALUES (678901, 6, 'Howdy', 6);

INSERT INTO Tareas (ID_Chat, FechaCreacion, Descripcion, Nombre, Estatus, CalCoins)
VALUES (6, GETDATE(), 'Task 6', 'Task 6', 1, 60);

INSERT INTO ArchivosTareas (Matricula, ID_Archivo, ID_Tarea)
VALUES (678901, 6, 6);

INSERT INTO Archivos (Nombre, MIMEType, Tamano, Contenido, FechaRegistro)
VALUES ('Archivo7', 'image/jpeg', 7168, 0x0123456789ABCDEF, GETDATE());

INSERT INTO Usuarios (Matricula, NombreCompleto, Contrasena, ID_ArchivoFoto, CalCoins)
VALUES (789123, 'Eve Adams', 'password901', 7, 700);

INSERT INTO Premios (ID_ArchivoPremio, Costo)
VALUES (7, 350);

INSERT INTO UsuariosPremios (Matricula, ID_Premio)
VALUES (789123, 7);

INSERT INTO Chats (Nombre, UsuarioAdmin, ID_ArchivoFoto)
VALUES ('Chat7', 789123, 7);

INSERT INTO ChatsUsuarios (ID_Chat, Integrante)
VALUES (7, 789123);

INSERT INTO Mensajes (UsuarioEmisor, ChatReceptor, Mensaje, Archivo)
VALUES (789123, 7, 'Hi there', 7);

INSERT INTO Tareas (ID_Chat, FechaCreacion, Descripcion, Nombre, Estatus, CalCoins)
VALUES (7, GETDATE(), 'Task 7', 'Task 7', 1, 70);

INSERT INTO ArchivosTareas (Matricula, ID_Archivo, ID_Tarea)
VALUES (789123, 7, 7);

INSERT INTO Archivos (Nombre, MIMEType, Tamano, Contenido, FechaRegistro)
VALUES ('Archivo8', 'image/png', 8192, 0xABCDEF0123456789, GETDATE());

INSERT INTO Usuarios (Matricula, NombreCompleto, Contrasena, ID_ArchivoFoto, CalCoins)
VALUES (890123, 'Frank White', 'password234', 8, 800);

INSERT INTO Premios (ID_ArchivoPremio, Costo)
VALUES (8, 400);

INSERT INTO UsuariosPremios (Matricula, ID_Premio)
VALUES (890123, 8);

INSERT INTO Chats (Nombre, UsuarioAdmin, ID_ArchivoFoto)
VALUES ('Chat8', 890123, 8);

INSERT INTO ChatsUsuarios (ID_Chat, Integrante)
VALUES (8, 890123);

INSERT INTO Mensajes (UsuarioEmisor, ChatReceptor, Mensaje, Archivo)
VALUES (890123, 8, 'Hello there', 8);

INSERT INTO Tareas (ID_Chat, FechaCreacion, Descripcion, Nombre, Estatus, CalCoins)
VALUES (8, GETDATE(), 'Task 8', 'Task 8', 1, 80);

INSERT INTO ArchivosTareas (Matricula, ID_Archivo, ID_Tarea)
VALUES (890123, 8, 8);

INSERT INTO Archivos (Nombre, MIMEType, Tamano, Contenido, FechaRegistro)
VALUES ('Archivo9', 'image/jpeg', 9216, 0x0123456789ABCDEF, GETDATE());

INSERT INTO Usuarios (Matricula, NombreCompleto, Contrasena, ID_ArchivoFoto, CalCoins)
VALUES (901234, 'Grace Green', 'password567', 9, 900);

INSERT INTO Premios (ID_ArchivoPremio, Costo)
VALUES (9, 450);

INSERT INTO UsuariosPremios (Matricula, ID_Premio)
VALUES (901234, 9);

INSERT INTO Chats (Nombre, UsuarioAdmin, ID_ArchivoFoto)
VALUES ('Chat9', 901234, 9);

INSERT INTO ChatsUsuarios (ID_Chat, Integrante)
VALUES (9, 901234);

INSERT INTO Mensajes (UsuarioEmisor, ChatReceptor, Mensaje, Archivo)
VALUES (901234, 9, 'Good day', 9);

INSERT INTO Tareas (ID_Chat, FechaCreacion, Descripcion, Nombre, Estatus, CalCoins)
VALUES (9, GETDATE(), 'Task 9', 'Task 9', 1, 90);

INSERT INTO ArchivosTareas (Matricula, ID_Archivo, ID_Tarea)
VALUES (901234, 9, 9);

INSERT INTO Archivos (Nombre, MIMEType, Tamano, Contenido, FechaRegistro)
VALUES ('Archivo10', 'image/png', 10240, 0xABCDEF0123456789, GETDATE());

INSERT INTO Usuarios (Matricula, NombreCompleto, Contrasena, ID_ArchivoFoto, CalCoins)
VALUES (123789, 'Hank Brown', 'password890', 10, 1000);

INSERT INTO Premios (ID_ArchivoPremio, Costo)
VALUES (10, 500);

INSERT INTO UsuariosPremios (Matricula, ID_Premio)
VALUES (123789, 10);

INSERT INTO Chats (Nombre, UsuarioAdmin, ID_ArchivoFoto)
VALUES ('Chat10', 123789, 10);

INSERT INTO ChatsUsuarios (ID_Chat, Integrante)
VALUES (10, 123789);

INSERT INTO Mensajes (UsuarioEmisor, ChatReceptor, Mensaje, Archivo)
VALUES (123789, 10, 'Hey there', 10);

INSERT INTO Tareas (ID_Chat, FechaCreacion, Descripcion, Nombre, Estatus, CalCoins)
VALUES (10, GETDATE(), 'Task 10', 'Task 10', 1, 100);

INSERT INTO ArchivosTareas (Matricula, ID_Archivo, ID_Tarea)
VALUES (123789, 10, 10);