CREATE PROCEDURE sp_ChatsUsuarios
@Op TINYINT,
@ID_ChatUsuario INT,
@ID_Chat INT,
@Integrante INT
AS
BEGIN
	IF @Op = 1
		BEGIN
		INSERT INTO [dbo].[ChatsUsuarios] ([ID_Chat],[Integrante]) VALUES(@ID_Chat, @Integrante);
		END

	IF @Op = 2
		BEGIN
		UPDATE [dbo].[ChatsUsuarios]
		SET
		[ID_Chat] = ISNULL(@ID_Chat, [ID_Chat]),
		[Integrante] = ISNULL(@Integrante, [Integrante])
		WHERE [ID_ChatUsuario] = [ID_Chat];
		END

	IF @Op = 3
		BEGIN
		DELETE FROM [dbo].[ChatsUsuarios]
		WHERE [ID_ChatUsuario] = @ID_ChatUsuario;
		END

	IF @Op = 4
		BEGIN
		SELECT [ID_Chat],[Integrante] FROM [dbo].[ChatsUsuarios]
		WHERE (ISNULL(@ID_ChatUsuario,[ID_ChatUsuario]) = [ID_ChatUsuario]) AND
		(ISNULL(@ID_Chat, [ID_Chat]) = [ID_Chat]) AND
		(ISNULL(@Integrante, [Integrante]) = [Integrante]);
		END
END