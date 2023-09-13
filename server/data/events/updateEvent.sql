UPDATE [dbo].[user_login]
SET [refreshToken]=@refreshToken
   
WHERE [username]=@eventUsername

SELECT [id]
      ,[username]
      ,[refreshToken]
 
  FROM [dbo].[user_login]
  WHERE [username]=@eventUsername