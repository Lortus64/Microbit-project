--
-- Create the database schema.


USE indproj;

--
-- Start by dropping all tables, order may matter.
--
DROP TABLE IF EXISTS log;
DROP TABLE IF EXISTS minmax;
DROP TABLE IF EXISTS microbit;
DROP TABLE IF EXISTS users;

DROP PROCEDURE IF EXISTS getmicrobit;
DROP PROCEDURE IF EXISTS getone;
DROP PROCEDURE IF EXISTS tempminmax;
DROP PROCEDURE IF EXISTS lightminmax;
DROP PROCEDURE IF EXISTS logupdate;
DROP PROCEDURE IF EXISTS login;
DROP PROCEDURE IF EXISTS addbit;
DROP PROCEDURE IF EXISTS updatebit;
DROP PROCEDURE IF EXISTS delbit;

DROP TRIGGER IF EXISTS tempminmax_update;
DROP TRIGGER IF EXISTS lightminmax_update;

DROP EVENT IF EXISTS savemorning;
DROP EVENT IF EXISTS saveday;
DROP EVENT IF EXISTS savenight;
DROP EVENT IF EXISTS deletelog;


-- -----------------TABLES----------------------------
--
-- Table for microbitmicrobit.
--
CREATE TABLE microbit
(
    microbitid INT,
    room VARCHAR(20) DEFAULT "No room",
    temperature INT,
    light INT,
    descript VARCHAR(40) DEFAULT "No description",
    
	UNIQUE KEY (`microbitid`),
    PRIMARY KEY (microbitid)
);

--
-- Table for minmax.
--
CREATE TABLE minmax
(
    microbitid INT,
    maxtemp INT,
    mintemp INT,
    maxlight INT,
	minlight INT,
    
	FOREIGN KEY (microbitid) REFERENCES microbit(microbitid),

    PRIMARY KEY (microbitid)
);

--
-- Table for minmax.
--
CREATE TABLE log
(
    microbitid INT,
    maxtemp INT,
    mintemp INT,
    maxlight INT,
	minlight INT,
    logtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--
-- Table for users.
--
CREATE TABLE users
(
    username VARCHAR(20) NOT NULL,
    pass VARCHAR(100) NOT NULL,
    
	PRIMARY KEY (username)
);


-- -----------------TRIGGERS----------------------------

--
-- Trigger for temp
--
CREATE TRIGGER tempminmax_update
AFTER UPDATE
ON microbit FOR EACH ROW
	CALL tempminmax(NEW.temperature, NEW.microbitid);
 
--
-- Trigger for light
--
CREATE TRIGGER lightminmax_update
AFTER UPDATE
ON microbit FOR EACH ROW
	CALL lightminmax(NEW.light, NEW.microbitid);
    
-- -----------------PROCEDURE----------------------------    
    

DELIMITER ;;

--
-- Get microbit
--
 CREATE PROCEDURE getmicrobit()
BEGIN
	SELECT * FROM microbit ORDER BY room;
END ;;

--
-- Get one microbit
--
 CREATE PROCEDURE getone(
	tempid INT
 )
BEGIN
	SELECT microbitid, room, descript FROM microbit WHERE microbitid=tempid;
END ;;

--
-- Procedures temp
--
 CREATE PROCEDURE tempminmax(
	temp INT,
    tempid INT
)
BEGIN
	IF (SELECT maxtemp FROM minmax WHERE microbitid=tempid) IS NOT NULL THEN
		IF temp > (SELECT maxtemp FROM minmax WHERE microbitid=tempid) THEN
			UPDATE minmax SET maxtemp = temp WHERE microbitid=tempid;
		ELSEIF temp < (SELECT mintemp FROM minmax WHERE microbitid=tempid) THEN
			UPDATE minmax SET mintemp = temp WHERE microbitid=tempid;
		END IF;
	ELSE
		UPDATE minmax SET mintemp=temp, maxtemp=temp WHERE microbitid=tempid;
	END IF;
END ;;


--
-- Procedures light
--
 CREATE PROCEDURE lightminmax(
	light INT,
    lightid INT
)
BEGIN
	IF (SELECT maxlight FROM minmax WHERE microbitid=lightid) IS NOT NULL THEN
		IF light > (SELECT maxlight FROM minmax WHERE microbitid=lightid) THEN
			UPDATE minmax SET maxlight = light WHERE microbitid=lightid;
		ELSEIF light < (SELECT minlight FROM minmax WHERE microbitid=lightid) THEN
			UPDATE minmax SET minlight = light WHERE microbitid=lightid;
		END IF;
	ELSE
		UPDATE minmax SET minlight=light, maxlight=light WHERE microbitid=lightid;
	END IF;
END ;;

--
-- Log
--
CREATE PROCEDURE logupdate()
BEGIN
DECLARE n INT DEFAULT 0;
DECLARE i INT DEFAULT 0;
SELECT COUNT(*) FROM minmax INTO n;
SET i=0;
WHILE i<n+1 DO 
  INSERT INTO log(microbitid, maxtemp, mintemp, maxlight, minlight) SELECT * FROM minmax WHERE microbitid=i;
  SET i = i + 1;
END WHILE;
UPDATE minmax SET maxtemp = NULL, mintemp = NULL, maxlight = NULL, minlight = NULL;
End;
;;

--
-- Login
--
CREATE PROCEDURE login(
    tempusername VARCHAR(20)
)
BEGIN
	IF (SELECT username FROM users WHERE username=tempusername) IS NOT NULL THEN
		SELECT pass FROM users WHERE username=tempusername;
	END IF;
END;;

--
-- create microbit
--
CREATE PROCEDURE addbit(
    tempid INT,
    temproom VARCHAR(20),
    tempdescript VARCHAR(40)
)
BEGIN
	IF temproom != "" AND tempdescript != "" THEN
		INSERT INTO microbit 
			(microbitid, room, descript)
		VALUES
			(tempid, temproom, tempdescript)
		;
	ELSEIF temproom != "" THEN
		INSERT INTO microbit 
			(microbitid, room)
		VALUES
			(tempid, temproom)
		;
    ELSEIF tempdescript != "" THEN
		INSERT INTO microbit 
			(microbitid, descript)
		VALUES
			(tempid, tempdescript)
		;
	ELSE 
		INSERT INTO microbit 
			(microbitid)
		VALUES
			(tempid)
		;
	END IF;

	INSERT INTO minmax 
		(microbitid)
	VALUES
		(tempid)
	;
END;;

--
-- Login
--
CREATE PROCEDURE delbit(
    tempid INT
)
BEGIN
	DELETE FROM minmax WHERE microbitid = tempid;
    DELETE FROM microbit WHERE microbitid = tempid;
END;;

--
-- Update
--
CREATE PROCEDURE updatebit(
	oldid INT,
	tempid INT,
    temproom VARCHAR(20),
    tempdescript VARCHAR(40)
)
BEGIN
	SET @mintemp = (SELECT mintemp FROM minmax WHERE microbitid = oldid);
    SET @maxtemp = (SELECT maxtemp FROM minmax WHERE microbitid = oldid);
    SET @minlight = (SELECT minlight FROM minmax WHERE microbitid = oldid);
    SET @maxlight = (SELECT maxlight FROM minmax WHERE microbitid = oldid);
    
	CALL delbit(oldid);
    CALL addbit(tempid, temproom, tempdescript);
    UPDATE minmax SET mintemp = @mintemp, maxtemp = @maxtemp, minlight = @minlight, maxlight = @maxlight WHERE microbitid = tempid;
    
END;;

DELIMITER ;

-- -----------------EVENT SCHEDULE----------------------------  
--
-- Morning save
--
CREATE EVENT savemorning
ON SCHEDULE EVERY 8 HOUR
STARTS TIME("08:00:00")
DO
   CALL logupdate();

--
-- Day save
--
-- CREATE EVENT saveday
-- ON SCHEDULE EVERY 1 DAY
-- STARTS TIME("16:00:00")
-- DO
--   CALL logupdate();

--
-- Night save
--
-- CREATE EVENT savenight
-- ON SCHEDULE EVERY 1 DAY
-- STARTS TIME("00:00:00")
-- DO
--   CALL logupdate();
   
--
-- Delete log
--
CREATE EVENT deletelog
ON SCHEDULE EVERY 1 MONTH
STARTS '2020-11-01 00:00:00'
DO
   DELETE FROM log;
   
   
DELETE FROM users;
 -- -----------------Insert user----------------------------    
INSERT INTO users 
    (username, pass)
VALUES
    ("user", "1603823001693$10$ca26dffa5d471c4c8bb1f4fc47f12f84")
;

