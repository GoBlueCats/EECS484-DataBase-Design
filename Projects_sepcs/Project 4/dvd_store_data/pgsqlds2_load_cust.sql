-- ALTER TABLE CUSTOMERS DISABLE TRIGGER ALL;
\COPY CUSTOMERS FROM  './data/cust/us_cust.csv' WITH DELIMITER   ',' 
\COPY CUSTOMERS FROM  './data/cust/row_cust.csv' WITH DELIMITER  ',' 

-- ALTER TABLE CUSTOMERS ENABLE TRIGGER ALL;
