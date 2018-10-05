--Insert data into USERS
INSERT INTO USERS(USER_ID, FIRST_NAME, LAST_NAME, YEAR_OF_BIRTH, MONTH_OF_BIRTH, DAY_OF_BIRTH, GENDER)
SELECT DISTINCT CAST(USER_ID AS NUMBER), FIRST_NAME, LAST_NAME, CAST(YEAR_OF_BIRTH AS INTEGER), CAST(MONTH_OF_BIRTH AS INTEGER), CAST(DAY_OF_BIRTH AS INTEGER), GENDER
FROM keykholt.PUBLIC_USER_INFORMATION;

--Insert data into CITIES
INSERT INTO CITIES(CITY_NAME, STATE_NAME, COUNTRY_NAME)
SELECT DISTINCT HOMETOWN_CITY, HOMETOWN_STATE, HOMETOWN_COUNTRY
FROM keykholt.PUBLIC_USER_INFORMATION
UNION 
SELECT DISTINCT CURRENT_CITY, CURRENT_STATE, CURRENT_COUNTRY
FROM keykholt.PUBLIC_USER_INFORMATION
UNION
SELECT DISTINCT EVENT_CITY, EVENT_STATE, EVENT_COUNTRY
FROM keykholt.PUBLIC_EVENT_INFORMATION;

--Insert data into Friends
INSERT INTO FRIENDS(USER1_ID,USER2_ID)
SELECT DISTINCT CAST(USER1_ID AS NUMBER),CAST(USER2_ID AS NUMBER)
FROM keykholt.PUBLIC_ARE_FRIENDS;

--Insert data into PROGRAMS
INSERT INTO PROGRAMS(INSTITUTION, CONCENTRATION, DEGREE)
SELECT DISTINCT INSTITUTION_NAME, CAST(PROGRAM_CONCENTRATION AS VARCHAR2(100)),PROGRAM_DEGREE
FROM keykholt.PUBLIC_USER_INFORMATION;

--Insert data into USER_EVENTS 
INSERT INTO USER_EVENTS(EVENT_ID, EVENT_CREATOR_ID, EVENT_NAME, EVENT_TAGLINE, EVENT_DESCRIPTION, EVENT_HOST, EVENT_TYPE, EVENT_SUBTYPE, EVENT_LOCATION, EVENT_START_TIME,EVENT_END_TIME,EVENT_CITY_ID)
SELECT DISTINCT CAST(EVENT_ID AS NUMBER), CAST(EVENT_CREATOR_ID AS NUMBER), EVENT_NAME,EVENT_TAGLINE, EVENT_DESCRIPTION, EVENT_HOST, EVENT_TYPE, EVENT_SUBTYPE, EVENT_LOCATION, EVENT_START_TIME,EVENT_END_TIME, CITY_ID
FROM keykholt.PUBLIC_EVENT_INFORMATION EI, CITIES
WHERE EI.EVENT_CITY=CITIES.CITY_NAME AND 
      EI.EVENT_STATE=CITIES.STATE_NAME AND
      EI.EVENT_COUNTRY=CITIES.COUNTRY_NAME;


--Insert data into USER_CURRENT_CITY
INSERT INTO USER_CURRENT_CITY(USER_ID,CURRENT_CITY_ID)
SELECT DISTINCT USER_ID, CITY_ID
FROM keykholt.PUBLIC_USER_INFORMATION UI, CITIES
WHERE UI.CURRENT_CITY=CITIES.CITY_NAME AND 
      UI.CURRENT_STATE=CITIES.STATE_NAME AND
      UI.CURRENT_COUNTRY=CITIES.COUNTRY_NAME;

--Insert data into USER_HOMETOWN_CITY
INSERT INTO USER_HOMETOWN_CITY(USER_ID,HOMETOWN_CITY_ID)
SELECT DISTINCT USER_ID, CITY_ID
FROM keykholt.PUBLIC_USER_INFORMATION UI, CITIES
WHERE UI.HOMETOWN_CITY=CITIES.CITY_NAME AND 
      UI.HOMETOWN_STATE=CITIES.STATE_NAME AND
      UI.HOMETOWN_COUNTRY=CITIES.COUNTRY_NAME;

--Insert data into EDUCATION
INSERT INTO EDUCATION(USER_ID, PROGRAM_ID, PROGRAM_YEAR)
SELECT DISTINCT USER_ID, PROGRAM_ID, PROGRAM_YEAR 
FROM keykholt.PUBLIC_USER_INFORMATION UI, PROGRAMS
WHERE UI.INSTITUTION_NAME=PROGRAMS.INSTITUTION AND 
      UI.PROGRAM_CONCENTRATION=PROGRAMS.CONCENTRATION AND
      UI.PROGRAM_DEGREE=PROGRAMS.DEGREE;



--Insert data into ALBUMS
SET AUTOCOMMIT OFF
INSERT INTO ALBUMS(ALBUM_ID, ALBUM_OWNER_ID, ALBUM_NAME, ALBUM_CREATED_TIME, ALBUM_MODIFIED_TIME, ALBUM_LINK, ALBUM_VISIBILITY, COVER_PHOTO_ID)
SELECT DISTINCT ALBUM_ID, CAST(OWNER_ID AS NUMBER), ALBUM_NAME, ALBUM_CREATED_TIME, ALBUM_MODIFIED_TIME, ALBUM_LINK, ALBUM_VISIBILITY, COVER_PHOTO_ID
FROM keykholt.PUBLIC_PHOTO_INFORMATION;
--Insert data into PHOTOS
INSERT INTO PHOTOS(PHOTO_ID, ALBUM_ID, PHOTO_CAPTION, PHOTO_CREATED_TIME, PHOTO_MODIFIED_TIME, PHOTO_LINK)
SELECT DISTINCT PHOTO_ID, ALBUM_ID, PHOTO_CAPTION, PHOTO_CREATED_TIME, PHOTO_MODIFIED_TIME, PHOTO_LINK
FROM keykholt.PUBLIC_PHOTO_INFORMATION;
COMMIT
SET AUTOCOMMIT ON 

--Insert data into TAGS
INSERT INTO TAGS(TAG_PHOTO_ID, TAG_SUBJECT_ID, TAG_CREATED_TIME, TAG_X, TAG_Y)
SELECT DISTINCT PHOTO_ID, CAST(TAG_SUBJECT_ID AS NUMBER), TAG_CREATED_TIME, TAG_X_COORDINATE, TAG_Y_COORDINATE
FROM keykholt.PUBLIC_TAG_INFORMATION;