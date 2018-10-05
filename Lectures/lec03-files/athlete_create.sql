CREATE TABLE Athlete
	(aid INTEGER, 
	 name CHAR(30) NOT NULL, 
	 country CHAR(20),
	 sport CHAR(20),
	UNIQUE (name, country),
	PRIMARY KEY (aid));

CREATE TABLE Olympics
(oid INTEGER PRIMARY KEY,
 year INTEGER,
 city CHAR(20));

CREATE TABLE Compete
   (aid INTEGER,  oid INTEGER,
     PRIMARY KEY  (aid, oid),
     FOREIGN KEY (aid) REFERENCES Athlete,
     FOREIGN KEY (oid) REFERENCES Olympics);


INSERT INTO Athlete VALUES (1, 'Michael Phelps', 'USA', 'Swimming');
INSERT INTO Athlete VALUES (2, 'Jackie Joyner-Kersee', 'USA', 'Track');
INSERT INTO Athlete VALUES (3, 'Mary Lou Retton', 'USA', 'Gymnastics');
INSERT INTO Athlete VALUES (4, 'Usain Bolt', 'Jamaica', 'Track');

INSERT INTO Olympics VALUES (1, 2012, 'London');
INSERT INTO Olympics VALUES (2, 2008, 'Beijing');
INSERT INTO Olympics VALUES (3, 1984, 'Los Angeles');

INSERT INTO Compete VALUES (1, 1);
INSERT INTO Compete VALUES (1, 2);
INSERT INTO Compete VALUES (4, 1);
INSERT INTO Compete VALUES (4, 2);
INSERT INTO Compete VALUES (3, 3);
INSERT INTO Compete VALUES (2, 3);

