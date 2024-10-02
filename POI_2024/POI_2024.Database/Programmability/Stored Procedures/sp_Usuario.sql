CREATE PROCEDURE [dbo].[sp_Usuario]
    @Op TINYINT,
    @Matricula INT,
    @NombreCompleto VARCHAR(200),
    @Contrasena VARCHAR(150),
    @ID_ArchivoFoto INT,
    @CalCoins INT
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
        SET [NombreCompleto] = @NombreCompleto,
            [Contrasena] = @Contrasena,
            [ID_ArchivoFoto] = @ID_ArchivoFoto,
            [CalCoins] = @CalCoins
        WHERE [Matricula] = @Matricula;
    END
    ELSE IF @Op = 3
    BEGIN
        DELETE FROM [dbo].[Usuarios]
        WHERE [Matricula] = @Matricula;
    END
END
