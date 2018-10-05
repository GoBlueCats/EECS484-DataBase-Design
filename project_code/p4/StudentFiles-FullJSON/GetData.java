import java.io.FileWriter;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.TreeSet;
import java.util.Vector;



//json.simple 1.1
// import org.json.simple.JSONObject;
// import org.json.simple.JSONArray;

// Alternate implementation of JSON modules.
import org.json.JSONObject;
import org.json.JSONArray;

public class GetData{
	
    static String prefix = "tajik.";
	
    // You must use the following variable as the JDBC connection
    Connection oracleConnection = null;
	
    // You must refer to the following variables for the corresponding 
    // tables in your database

    String cityTableName = null;
    String userTableName = null;
    String friendsTableName = null;
    String currentCityTableName = null;
    String hometownCityTableName = null;
    String programTableName = null;
    String educationTableName = null;
    String eventTableName = null;
    String participantTableName = null;
    String albumTableName = null;
    String photoTableName = null;
    String coverPhotoTableName = null;
    String tagTableName = null;

    // This is the data structure to store all users' information
    // DO NOT change the name
    JSONArray users_info = new JSONArray();		// declare a new JSONArray

	
    // DO NOT modify this constructor
    public GetData(String u, Connection c) {
	super();
	String dataType = u;
	oracleConnection = c;
	// You will use the following tables in your Java code
	cityTableName = prefix+dataType+"_CITIES";
	userTableName = prefix+dataType+"_USERS";
	friendsTableName = prefix+dataType+"_FRIENDS";
	currentCityTableName = prefix+dataType+"_USER_CURRENT_CITY";
	hometownCityTableName = prefix+dataType+"_USER_HOMETOWN_CITY";
	programTableName = prefix+dataType+"_PROGRAMS";
	educationTableName = prefix+dataType+"_EDUCATION";
	eventTableName = prefix+dataType+"_USER_EVENTS";
	albumTableName = prefix+dataType+"_ALBUMS";
	photoTableName = prefix+dataType+"_PHOTOS";
	tagTableName = prefix+dataType+"_TAGS";
    }
	
	
	
	
    //implement this function

    @SuppressWarnings("unchecked")
    public JSONArray toJSON() throws SQLException{ 
		
	// Your implementation goes here....
    	Statement stmt0 = oracleConnection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
	    Statement stmt1 = oracleConnection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

	    ResultSet rst0 = stmt0.executeQuery("SELECT USER_ID, FIRST_NAME, LAST_NAME, YEAR_OF_BIRTH, MONTH_OF_BIRTH, DAY_OF_BIRTH, GENDER FROM " + 
	    	userTableName);
	    //initial rst1 whose cotent is of no use
        ResultSet rst1 = stmt1.executeQuery("select distinct user1_id,user2_id from "+friendsTableName+" f1 ");

	    JSONArray users_info = new JSONArray();
        // for each user
	    while(rst0.next()){
	    	JSONObject user = new JSONObject();
	    	// add basic information into single user object
	    	user.put("user_id",rst0.getLong(1));
	    	user.put("first_name",rst0.getString(2));
	    	user.put("last_name",rst0.getString(3));
	    	user.put("gender",rst0.getString(7));
	    	user.put("YOB",rst0.getInt(4));
	    	user.put("MOB",rst0.getInt(5));
	    	user.put("DOB",rst0.getInt(6));
                Long userID=rst0.getLong(1);

            // query hometown information and add to single user object
	    	JSONObject hometown = new JSONObject();
	    	rst1 = stmt1.executeQuery("SELECT CITY_NAME, STATE_NAME, COUNTRY_NAME FROM " + 
	    		hometownCityTableName + " H, " + cityTableName + " C " + "WHERE H.USER_ID = " + userID + " AND H.HOMETOWN_CITY_ID=C.CITY_ID ");
                while(rst1.next()){
	    	hometown.put("city",rst1.getString(1));
	    	hometown.put("state",rst1.getString(2));
	    	hometown.put("country",rst1.getString(3));
	    	user.put("hometown",hometown);
                }
	    	// query friends information and add to single user object
	    	JSONArray friends = new JSONArray();
	    	rst1 = stmt1.executeQuery("SELECT DISTINCT USER2_ID FROM " + friendsTableName + " WHERE USER1_ID= " + userID);
	    	while(rst1.next()){
	    		friends.put(rst1.getLong(1));
	    	}
	    	user.put("friends",friends);

	    	// add single user object to users_info array
	    	users_info.put(user);
	    }

	    // Close statement and result set
		rst0.close();
		rst1.close();
		stmt0.close();
		stmt1.close();
		return users_info;
	}



    // This outputs to a file "output.json"
    public void writeJSON(JSONArray users_info) {
	// DO NOT MODIFY this function
	try {
	    FileWriter file = new FileWriter(System.getProperty("user.dir")+"/output.json");
	    file.write(users_info.toString());
	    file.flush();
	    file.close();

	} catch (IOException e) {
	    e.printStackTrace();
	}
		
    }
}

