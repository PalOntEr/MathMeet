CREATE PROCEDURE [dbo].[sp_Tareas]
@Op TINYINT,
@ID_Chat INT,
@ID_Tareas INT,
@Fecha_Finalizacion DATETIME,
@Descripcion TEXT,
@Nombre VARCHAR(30),
@CalCoins INT
AS
BEGIN
	IF @Op = 1
	BEGIN
		INSERT INTO [dbo].[Tareas]([ID_Chat], [FechaFinalizacion],[Descripcion],[Nombre],[CalCoins])
		VALUES (@ID_Chat,@Fecha_Finalizacion,@Descripcion,@Nombre,@CalCoins)
	END

	IF @Op = 2 
	BEGIN
		UPDATE [dbo].[Tareas]
		SET
		[FechaFinalizacion] = ISNULL(@Fecha_Finalizacion,FechaFinalizacion),
		[Descripcion] = ISNULL(@Descripcion,Descripcion),
		[Nombre] = ISNULL(@Nombre,Nombre),
		[CalCoins] = ISNULL(@Calcoins,CalCoins)
		WHERE
		[ID_Tareas] = @ID_Tareas
	END

	IF @Op = 3
	BEGIN
		DELETE FROM [dbo].[Tareas]
		WHERE [ID_Tareas] = @ID_Tareas
	END

	IF @Op = 4
	BEGIN
		SELECT [Nombre], [Descripcion],[CalCoins],[FechaFinalizacion] FROM [dbo].[Tareas]
		WHERE (ISNULL(@ID_Chat, [ID_Chat]) = [ID_Chat]) 
		AND (ISNULL(@Fecha_Finalizacion,[FechaFinalizacion]) = [FechaFinalizacion]) 
		AND (ISNULL(@Descripcion,[Descripcion]) LIKE [Descripcion]) 
		AND (ISNULL(@Nombre,[Nombre]) = [Nombre]) 
		AND (ISNULL(@CalCoins,[CalCoins]) = [CalCoins]) 
		AND [ID_Tareas] = @ID_Tareas;
	END
END