CREATE PROCEDURE [dbo].[sp_Chats]
@Op TINYINT,
@ID_Chat INT = NULL,
@Nombre VARCHAR(100) = NULL,
@UsuarioAdmin INT = NULL,
@ID_ArchivoFoto INT = NULL
AS
BEGIN
	IF @Op = 1
	BEGIN
		INSERT INTO [dbo].[Chats] ([Nombre],[UsuarioAdmin],[ID_ArchivoFoto])
		VALUES (@Nombre,@UsuarioAdmin,@ID_ArchivoFoto);
	END
	ELSE IF @Op = 2
	BEGIN
		UPDATE [dbo].[Chats]
		SET
		[Nombre] = ISNULL(@Nombre,[Nombre]),
		[UsuarioAdmin] = ISNULL(@UsuarioAdmin,[UsuarioAdmin]),
		[ID_ArchivoFoto] = ISNULL(@ID_ArchivoFoto, [ID_ArchivoFoto] );
	END
	ELSE IF @Op = 3
	BEGIN
		DELETE FROM [dbo].[Chats]
		WHERE [ID_Chat] = @ID_Chat;
	END
	ELSE IF @Op = 4
	BEGIN 
	SELECT  [Nombre],[UsuarioAdmin],[ArchivoFoto] FROM [dbo].[Chats]
	WHERE (ISNULL(@ID_Chat, [ID_Chat]) = [ID_Chat]) AND
	(ISNULL(@Nombre, [Nombre]) = [Nombre]) AND
	(ISNULL(@UsuarioAdmin, [UsuarioAdmin]) = [UsuarioAdmin]) AND
	(ISNULL(@ID_ArchivoFoto,[ID_ArchivoFoto]) = [ID_ArchivoFoto]);
	END
END