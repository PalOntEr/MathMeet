CREATE PROCEDURE [dbo].[sp_Mensaje]
	@Op TINYINT,
	@UsuarioEmisor INT = NULL,
	@ChatReceptor INT = NULL,
	@Mensaje TEXT = NULL,
	@ID_Archivo INT = NULL,
	@ID_Mensaje INT = NULL
AS
BEGIN
	IF @Op = 1 --Insertar mensaje
	BEGIN
		INSERT INTO [dbo].[Mensajes] ([UsuarioEmisor], [ChatReceptor], [Mensaje], [ID_Archivo])
		VALUES (@UsuarioEmisor, @ChatReceptor, @Mensaje, @ID_Archivo)
	END

	ELSE IF @Op = 2 --Actualizar contenido del mensaje
	BEGIN
		UPDATE [dbo].[Mensajes] SET [Mensaje] = @Mensaje, [ID_Archivo] = @ID_Archivo WHERE [ID_Mensaje] = @ID_Mensaje
	END

	ELSE IF @Op = 3 --Eliminar un mensaje específico
	BEGIN
		DELETE FROM [dbo].[Mensajes] WHERE [ID_Mensaje] = @ID_Mensaje
	END

	ELSE IF @Op = 4 --Obtener mensajes con filtros especificados
	BEGIN
		SELECT [UsuarioEmisor], [ChatReceptor], [Mensaje], [ID_Archivo], [ID_Mensaje] FROM [dbo].[Mensajes] WHERE
			(ISNULL(@UsuarioEmisor, [UsuarioEmisor]) = [UsuarioEmisor]) AND
			(ISNULL(@ChatReceptor, [ChatReceptor]) = [ChatReceptor]) AND
			(ISNULL(@Mensaje, [Mensaje]) LIKE [Mensaje]) AND
			(ISNULL(@ID_Archivo, [ID_Archivo]) = [ID_Archivo]) AND
			(ISNULL(@ID_Mensaje, [ID_Mensaje]) = [ID_Mensaje])
	END
END
