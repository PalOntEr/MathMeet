-- Insert dummy data into database
INSERT INTO Archivos (Nombre, MIMEType, Tamano, Contenido)
VALUES 
    ('Emote1.png', 'image/png', 
     (SELECT LEN(BulkColumn) FROM OPENROWSET(BULK 'C:\Users\Compl\OneDrive\Documentos\MathMeetRepository\POI_2024\POI_2024\poi_2024.client\src\Images\Calc Emote1.png', SINGLE_BLOB) AS Image), 
     (SELECT BulkColumn FROM OPENROWSET(BULK 'C:\Users\Compl\OneDrive\Documentos\MathMeetRepository\POI_2024\POI_2024\poi_2024.client\src\Images\Calc Emote1.png', SINGLE_BLOB) AS Image)
     ),

    ('Emote2.png', 'image/png', 
     (SELECT LEN(BulkColumn) FROM OPENROWSET(BULK 'C:\Users\Compl\OneDrive\Documentos\MathMeetRepository\POI_2024\POI_2024\poi_2024.client\src\Images\Calc Emote2.png', SINGLE_BLOB) AS Image), 
     (SELECT BulkColumn FROM OPENROWSET(BULK 'C:\Users\Compl\OneDrive\Documentos\MathMeetRepository\POI_2024\POI_2024\poi_2024.client\src\Images\Calc Emote2.png', SINGLE_BLOB) AS Image)
     ),

    ('Emote3.png', 'image/png', 
     (SELECT LEN(BulkColumn) FROM OPENROWSET(BULK 'C:\Users\Compl\OneDrive\Documentos\MathMeetRepository\POI_2024\POI_2024\poi_2024.client\src\Images\Calc Emote3.png', SINGLE_BLOB) AS Image), 
     (SELECT BulkColumn FROM OPENROWSET(BULK 'C:\Users\Compl\OneDrive\Documentos\MathMeetRepository\POI_2024\POI_2024\poi_2024.client\src\Images\Calc Emote3.png', SINGLE_BLOB) AS Image)),

    ('Emote4.png', 'image/png', 
     (SELECT LEN(BulkColumn) FROM OPENROWSET(BULK 'C:\Users\Compl\OneDrive\Documentos\MathMeetRepository\POI_2024\POI_2024\poi_2024.client\src\Images\Calc Emote4.png', SINGLE_BLOB) AS Image), 
     (SELECT BulkColumn FROM OPENROWSET(BULK 'C:\Users\Compl\OneDrive\Documentos\MathMeetRepository\POI_2024\POI_2024\poi_2024.client\src\Images\Calc Emote4.png', SINGLE_BLOB) AS Image)),

    ('Emote5.png', 'image/png', 
     (SELECT LEN(BulkColumn) FROM OPENROWSET(BULK 'C:\Users\Compl\OneDrive\Documentos\MathMeetRepository\POI_2024\POI_2024\poi_2024.client\src\Images\Calc Emote5.png', SINGLE_BLOB) AS Image), 
     (SELECT BulkColumn FROM OPENROWSET(BULK 'C:\Users\Compl\OneDrive\Documentos\MathMeetRepository\POI_2024\POI_2024\poi_2024.client\src\Images\Calc Emote5.png', SINGLE_BLOB) AS Image));


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

INSERT INTO Mensajes (UsuarioEmisor, ChatReceptor, Mensaje, ID_Archivo)
VALUES (123456, 1, 'Hello', 1);

INSERT INTO Tareas (ID_Chat, FechaCreacion, Descripcion, Nombre, CalCoins)
VALUES (1, GETDATE(), 'Task 1', 'Task 1', 10);

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

INSERT INTO Mensajes (UsuarioEmisor, ChatReceptor, Mensaje, ID_Archivo)
VALUES (654321, 2, 'Hi', 2);

INSERT INTO Tareas (ID_Chat, FechaCreacion, Descripcion, Nombre, CalCoins)
VALUES (2, GETDATE(), 'Task 2', 'Task 2', 20);

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

INSERT INTO Mensajes (UsuarioEmisor, ChatReceptor, Mensaje,ID_Archivo)
VALUES (789012, 3, 'Hey', 3);

INSERT INTO Tareas (ID_Chat, FechaCreacion, Descripcion, Nombre, CalCoins)
VALUES (3, GETDATE(), 'Task 3', 'Task 3', 30);

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

INSERT INTO Mensajes (UsuarioEmisor, ChatReceptor, Mensaje, ID_Archivo)
VALUES (345678, 4, 'Hola', 4);

INSERT INTO Tareas (ID_Chat, FechaCreacion, Descripcion, Nombre, CalCoins)
VALUES (4, GETDATE(), 'Task 4', 'Task 4', 40);

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

INSERT INTO Mensajes (UsuarioEmisor, ChatReceptor, Mensaje, ID_Archivo)
VALUES (567890, 5, 'Greetings', 5);

INSERT INTO Tareas (ID_Chat, FechaCreacion, Descripcion, Nombre, CalCoins)
VALUES (5, GETDATE(), 'Task 5', 'Task 5', 50);