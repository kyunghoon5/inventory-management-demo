/****** Script for SelectTopNRows command from SSMS  ******/
SELECT [id]
      ,[username]
   
  FROM [dbo].[user_login]
  where [id] = @eventId