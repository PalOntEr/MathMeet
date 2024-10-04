CREATE PROCEDURE [dbo].[sp_Archivos]
	@Op TINYINT,
	@ID_Archivo INT = NULL,
	@Nombre VARCHAR(255) = NULL,
	@MIMEType VARCHAR(255) = NULL,
	@Tamano INT = NULL,
	@Contenido VARBINARY(MAX) = NULL,
	@UploadType TINYINT = NULL,
	@UploadedTo INT = NULL,
	@UploadedBy INT = NULL
AS
BEGIN
	IF @Op = 1
	BEGIN
		INSERT INTO [dbo].[Archivos] (Nombre,MIMEType,Tamano, Contenido)
		VALUES (@Nombre,@MIMEType, @Tamano, @Contenido)
		--IF (@UploadType = 1 AND @UploadedTo IS NOT NULL AND @UploadedBy IS NOT NULL) --Si se subió a un chat y por un usuario ejecutar procedure para insertar mensaje
		--	EXEC sp_Mensaje 1, @UploadedBy, @UploadedTo, @Nombre, ;
		--ELSE
		--IF (@UploadType = 2 AND @UploadedTo IS NOT NULL AND @UploadedBy IS NOT NULL) --Si se subió a un premio y por un usuario ejecutar procedure para insertar mensaje
		--	EXEC sp_Premios 1, @UploadedTo, @ID_Archivo, @Tamano;
	END

	ELSE IF @Op = 2
	BEGIN
		UPDATE [dbo].[Archivos]
		SET
			Nombre = ISNULL(@Nombre,Nombre),
			MIMEType = ISNULL(@MIMEType,MIMEType),
			Tamano = ISNULL(@Tamano,Tamano),
			Contenido = ISNULL(@Contenido,Contenido)
		WHERE
		ID_Archivo = @ID_Archivo
	END

	ELSE IF @Op = 3
	BEGIN
		DELETE FROM [dbo].[Archivos]
		WHERE ID_Archivo = @ID_Archivo
	END	

	ELSE IF @Op = 4
	BEGIN
		SELECT [ID_Archivo], [Nombre], [MIMEType], [Tamano], [Contenido], [FechaRegistro] FROM [dbo].[Archivos] WHERE
			(ISNULL(@ID_Archivo, [ID_Archivo]) = [ID_Archivo]) AND
			(ISNULL(@Nombre, [Nombre]) = [Nombre]) AND
			(ISNULL(@MIMEType, [MIMEType]) = [MIMEType]) AND
			(ISNULL(@Tamano, [Tamano]) = [Tamano]) AND
			(ISNULL(@Contenido, [Contenido]) = [Contenido])
	END
END