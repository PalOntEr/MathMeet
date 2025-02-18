CREATE PROCEDURE [dbo].[sp_Usuario]
    @Op TINYINT,
    @Matricula INT = NULL,
    @NombreCompleto VARCHAR(200) = NULL,
    @Contrasena VARCHAR(150) = NULL,
    @ID_ArchivoFoto INT = NULL,
    @CalCoins INT = NULL
AS
BEGIN
    IF @Op = 1
    BEGIN
        INSERT INTO [dbo].[Usuarios] ([Matricula], [NombreCompleto], [Contrasena], [ID_ArchivoFoto], [CalCoins])
        VALUES (@Matricula, @NombreCompleto, @Contrasena, @ID_ArchivoFoto, @CalCoins);
    END

    ELSE IF @Op = 2
    BEGIN
        UPDATE [dbo].[Usuarios]
        SET [NombreCompleto] = ISNULL(@NombreCompleto, [NombreCompleto]),
            [Contrasena] = ISNULL(@Contrasena, [Contrasena]),
            [ID_ArchivoFoto] = ISNULL(@ID_ArchivoFoto, [ID_ArchivoFoto]),
            [CalCoins] = ISNULL(@CalCoins, [CalCoins])
        WHERE [Matricula] = @Matricula;
    END

    ELSE IF @Op = 3
    BEGIN
        DELETE FROM [dbo].[Usuarios]
        WHERE [Matricula] = @Matricula;
    END
    
    ELSE IF @Op = 4
    BEGIN
        SELECT [Matricula], [NombreCompleto], [Contrasena], [ID_ArchivoFoto], [CalCoins] FROM [dbo].[Usuarios] WHERE
            (ISNULL(@Matricula, [Matricula]) = [Matricula]) AND
            (ISNULL(@NombreCompleto, [NombreCompleto]) = [NombreCompleto]) AND
            (ISNULL(@Contrasena, [Contrasena]) = [Contrasena]) AND
            (ISNULL(@ID_ArchivoFoto, [ID_ArchivoFoto]) = [ID_ArchivoFoto]) AND
            (ISNULL(@CalCoins, [CalCoins]) = [CalCoins]);
    END
END
