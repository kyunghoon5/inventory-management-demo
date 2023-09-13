/****** Script for SelectTopNRows command from SSMS  ******/
INSERT INTO dbo.user_login (username, password,refreshToken)
VALUES (@username, @password, @refreshToken );


SELECT SCOPE_IDENTITY() AS eventId