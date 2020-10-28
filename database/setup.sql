-- Skapa databass
-- CREATE DATABASE indproj;
DROP DATABASE IF EXISTS indproj;
CREATE DATABASE IF NOT EXISTS indproj;

-- Välj vilken databas du vill använda
USE indproj;

-- Skapa en användare user med lösenorder pass och ge tillgång oavsett
-- hostnamn. 
CREATE USER IF NOT EXISTS 'user'@'%'
IDENTIFIED
-- WITH mysql_native_password -- MySQL with version > 8.0.4
BY 'pass'
;

-- Ge användaren alla rättigheter på en specifk databas.
GRANT ALL PRIVILEGES
    ON indproj.*
    TO 'user'@'%'
;

GRANT ALL PRIVILEGES
ON *.*
TO 'user'@'%'
;

-- Visa vad en användare kan göra mot vilken databas.
SHOW GRANTS FOR 'user'@'%';

-- Visa för nuvarande användare
-- SHOW GRANTS FOR CURRENT_USER;