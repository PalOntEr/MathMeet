CREATE PROCEDURE [dbo].[sp_Premios]
    @Op TINYINT,
    @ID_Premio INT = NULL,
    @ID_ArchivoPremio INT = NULL,
    @Costo INT = NULL
AS
BEGIN
    IF @Op = 1
    BEGIN
        INSERT INTO [dbo].[Premios] ([ID_ArchivoPremio], [Costo])
        VALUES (@ID_ArchivoPremio, @Costo);
    END

    ELSE IF @Op = 2
    BEGIN
        UPDATE [dbo].[Premios]
        SET [ID_ArchivoPremio] = ISNULL(@ID_ArchivoPremio, [ID_ArchivoPremio]),
            [Costo] = ISNULL(@Costo, [Costo])
        WHERE [ID_Premio] = @ID_Premio;
    END

    ELSE IF @Op = 3
    BEGIN
        DELETE FROM [dbo].[Premios]
        WHERE [ID_Premio] = @ID_Premio;
    END
    
    ELSE IF @Op = 4
    BEGIN
        SELECT [ID_Premio], [ID_ArchivoPremio], [Costo] FROM [dbo].[Premios] WHERE
            (ISNULL(@ID_Premio, [ID_Premio]) = [ID_Premio]) AND
            (ISNULL(@ID_ArchivoPremio, [ID_ArchivoPremio]) = [ID_ArchivoPremio]) AND
            (ISNULL(@Costo, [Costo]) = [Costo]);
    END
END
