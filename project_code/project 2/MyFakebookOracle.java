package project2;
//jdbc connection
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class MyFakebookOracle extends FakebookOracle {

    static String prefix = "tajik.";

    // You must use the following variable as the JDBC connection
    Connection oracleConnection = null;

    // You must refer to the following variables for the corresponding tables in your database
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


    // DO NOT modify this constructor
    public MyFakebookOracle(String dataType, Connection c) {
        super();
        oracleConnection = c;
        // You will use the following tables in your Java code
        cityTableName = prefix + dataType + "_CITIES";
        userTableName = prefix + dataType + "_USERS";
        friendsTableName = prefix + dataType + "_FRIENDS";
        currentCityTableName = prefix + dataType + "_USER_CURRENT_CITY";
        hometownCityTableName = prefix + dataType + "_USER_HOMETOWN_CITY";
        programTableName = prefix + dataType + "_PROGRAMS";
        educationTableName = prefix + dataType + "_EDUCATION";
        eventTableName = prefix + dataType + "_USER_EVENTS";
        albumTableName = prefix + dataType + "_ALBUMS";
        photoTableName = prefix + dataType + "_PHOTOS";
        tagTableName = prefix + dataType + "_TAGS";
    }


    @Override
    // ***** Query 0 *****
    // This query is given to your for free;
    // You can use it as an example to help you write your own code
    //
    public void findMonthOfBirthInfo() {

        // Scrollable result set allows us to read forward (using next())
        // and also backward.
        // This is needed here to support the user of isFirst() and isLast() methods,
        // but in many cases you will not need it.
        // To create a "normal" (unscrollable) statement, you would simply call
        // Statement stmt = oracleConnection.createStatement();
        //
        try (Statement stmt =
                     oracleConnection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,
                             ResultSet.CONCUR_READ_ONLY)) {

            // For each month, find the number of users born that month
            // Sort them in descending order of count
            ResultSet rst = stmt.executeQuery("select count(*), month_of_birth from " +
                    userTableName +
                    " where month_of_birth is not null group by month_of_birth order by 1 desc");

            this.monthOfMostUsers = 0;
            this.monthOfLeastUsers = 0;
            this.totalUsersWithMonthOfBirth = 0;

            // Get the month with most users, and the month with least users.
            // (Notice that this only considers months for which the number of users is > 0)
            // Also, count how many total users have listed month of birth (i.e., month_of_birth not null)
            //
            while (rst.next()) {
                int count = rst.getInt(1);
                int month = rst.getInt(2);
                if (rst.isFirst())
                    this.monthOfMostUsers = month;
                if (rst.isLast())
                    this.monthOfLeastUsers = month;
                this.totalUsersWithMonthOfBirth += count;
            }

            // Get the names of users born in the "most" month
            rst = stmt.executeQuery("select user_id, first_name, last_name from " +
                    userTableName + " where month_of_birth=" + this.monthOfMostUsers);
            while (rst.next()) {
                Long uid = rst.getLong(1);
                String firstName = rst.getString(2);
                String lastName = rst.getString(3);
                this.usersInMonthOfMost.add(new UserInfo(uid, firstName, lastName));
            }

            // Get the names of users born in the "least" month
            rst = stmt.executeQuery("select first_name, last_name, user_id from " +
                    userTableName + " where month_of_birth=" + this.monthOfLeastUsers);
            while (rst.next()) {
                String firstName = rst.getString(1);
                String lastName = rst.getString(2);
                Long uid = rst.getLong(3);
                this.usersInMonthOfLeast.add(new UserInfo(uid, firstName, lastName));
            }

            // Close statement and result set
            rst.close();
            stmt.close();
        } catch (SQLException err) {
            System.err.println(err.getMessage());
        }
    }

    @Override
    // ***** Query 1 *****
    // Find information about users' names:
    // (1) The longest first name (if there is a tie, include all in result)
    // (2) The shortest first name (if there is a tie, include all in result)
    // (3) The most common first name, and the number of times it appears (if there
    //      is a tie, include all in result)
    //
    public void findNameInfo() { 
    	// To create a "normal" (unscrollable) statement, you would simply call
    	try (Statement stmt =
                     oracleConnection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,
                             ResultSet.CONCUR_READ_ONLY)) {
	// Get the longest first name and shortest first name
	ResultSet rst = stmt.executeQuery("select length(first_name) as length, first_name from " +
                    userTableName +
                    " order by 1 desc");
	// Get the longest first name
	
        int count2 = 0;
	while (rst.next()) {
		int count1 = 0;
		String firstName  = rst.getString(2); 
                if (rst.isFirst())
                    count1 = rst.getInt(1);
                if (rst.getInt(1) == count1)
		    this.longestFirstNames.add(firstName);
		if (rst.isLast())
		    count2 = rst.getInt(1);
            }
	// Get the shortest first name
	while (rst.previous()) {
		
          	String firstName  = rst.getString(2); 
	  	if(rst.getInt(1) == count2)	
		    this.shortestFirstNames.add(firstName);
	}
	
	//find mostCommonFirstNames
	rst = stmt.executeQuery("select COUNT (*), first_name from " + 
		userTableName +
			" group by first_name order by 1 desc");
	int count = 0;
	while (rst.next()) {
		String firstName = rst.getString(2);
		if (rst.isFirst())
                    count = rst.getInt(1);
		if (rst.getInt(1) == count)
		 this.mostCommonFirstNames.add(firstName);
		 this.mostCommonFirstNamesCount = count;
            }	

	 // Close statement and result set
            rst.close();
            stmt.close();
        } catch (SQLException err) {
            System.err.println(err.getMessage());
	}
    }

    @Override
    // ***** Query 2 *****
    // Find the user(s) who have no friends in the network
    //
    // Be careful on this query!
    // Remember that if two users are friends, the friends table
    // only contains the pair of user ids once, subject to
    // the constraint that user1_id < user2_id
    //
    public void lonelyUsers() throws SQLException{
	// To create a "normal" (unscrollable) statement, you would simply call
    	try (Statement stmt =
                     oracleConnection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,
                             ResultSet.CONCUR_READ_ONLY)) {
	// Find the users who have no friends in the network
	ResultSet rst = stmt.executeQuery("select distinct user_id, first_name, last_name from " +
		userTableName + " where user_id not in (select user1_id from " + friendsTableName + 
			" union select user2_id from " + friendsTableName + " )order by 1 asc" );
	while (rst.next()) {
		Long uid = rst.getLong(1);
                String firstName = rst.getString(2);
                String lastName = rst.getString(3);
                this.lonelyUsers.add(new UserInfo(uid, firstName, lastName));
            }
	// Close statement and result set
            rst.close();
            stmt.close();
        } catch (SQLException err) {
            System.err.println(err.getMessage());
	}
    }

	
    @Override
    // ***** Query 3 *****
    // Find the users who do not live in their hometowns
    // (I.e., current_city != hometown_city)
    //
    public void liveAwayFromHome() throws SQLException {
	// To create a "normal" (unscrollable) statement, you would simply call
    	try (Statement stmt =
                     oracleConnection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,
                             ResultSet.CONCUR_READ_ONLY)) {
		        
	// Find the users who do not live in their hometowns
	ResultSet rst = stmt.executeQuery("select distinct u.user_id,u.first_name,u.last_name from " +
		userTableName +" u, " + currentCityTableName+ " c, " + hometownCityTableName + " h where u.user_id = c.user_id and h.hometown_city_id <> c.current_city_id and u.user_id = h.user_id order by 1 asc");

	while (rst.next()) {
		Long uid = rst.getLong(1);
                String firstName = rst.getString(2);
                String lastName = rst.getString(3);
                this.liveAwayFromHome.add(new UserInfo(uid, firstName, lastName));
            }
	// Close statement and result set
            rst.close();
            stmt.close();
        } catch (SQLException err) {
            System.err.println(err.getMessage());
	}
    }


    @Override
    // **** Query 4 ****
    // Find the top-n photos based on the number of tagged users
    // If there are ties, choose the photo with the smaller numeric PhotoID first
    //
        public void findPhotosWithMostTags(int n) throws SQLException{
	// To create a "normal" (unscrollable) statement, you would simply call
    	     Statement stmt =
                     oracleConnection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,
                             ResultSet.CONCUR_READ_ONLY);
	     Statement stmt2 = 
		     oracleConnection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,
		             ResultSet.CONCUR_READ_ONLY);
		

	// Find the top photos based on the number of tagged users, If there are ties, choose the photo with the smaller numeric PhotoID first
	// Initial rst2
	ResultSet rst2 = stmt2.executeQuery("select distinct count(*) from "+friendsTableName+" group by user1_id ");
	ResultSet rst = stmt.executeQuery("select pt.photo_id, p.album_id, a.album_name, p.photo_caption, p.photo_link from " + 
		albumTableName +" a, " + photoTableName + " p, (select count (*) as nc, p.photo_id from " +
			photoTableName + " p, " + tagTableName + " t where t.tag_photo_id=p.photo_id group by p.photo_id) pt where pt.photo_id=p.photo_id and p.album_id=a.album_id order by pt.nc desc, pt.photo_id asc");
	
	while (rst.next() & n > 0) {
		String photoId = rst.getString(1);
		String albumId = rst.getString(2);
		String albumName = rst.getString(3);
		String photoCaption = rst.getString(4);
		String photoLink =  rst.getString(5);
		PhotoInfo p = new PhotoInfo(photoId, albumId, albumName, photoCaption, photoLink);
		TaggedPhotoInfo tp = new TaggedPhotoInfo(p);
		this.photosWithMostTags.add(tp);
		rst2 = stmt2.executeQuery("select user_id,first_name,last_name from "+userTableName+" where user_id in ( select tag_subject_id from "+tagTableName+" where tag_photo_id = "+photoId+")");
		while(rst2.next()){
				Long uid = rst2.getLong(1);
				String firstname = rst2.getString(2);
				String lastname = rst2.getString(3);
				tp.addTaggedUser(new UserInfo(uid,firstname,lastname));
			} 
		n = n - 1;
            }
	// Close statement and result set
                rst.close();
		rst2.close();
		stmt.close();
		stmt2.close();	
	
    }
   
    @Override
    // **** Query 5 ****
    // Find suggested "match pairs" of users, using the following criteria:
    // (1) One of the users is female, and the other is male
    // (2) Their age difference is within "yearDiff"
    // (3) They are not friends with one another
    // (4) They should be tagged together in at least one photo
    //
    // You should return up to n "match pairs"
    // If there are more than n match pairs, you should break ties as follows:
    // (i) First choose the pairs with the largest number of shared photos
    // (ii) If there are still ties, choose the pair with the smaller user_id for the female
    // (iii) If there are still ties, choose the pair with the smaller user_id for the male
    //
    public void matchMaker(int n, int yearDiff) throws SQLException{
	// To create a "normal" (unscrollable) statement, you would simply call
    	Statement stmt = oracleConnection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
	Statement stmt2 = oracleConnection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);        
	// select match pairs and rank them in order;
	
	ResultSet rst = stmt.executeQuery(" select g1.user_id, g1.first_name, g1.last_name, g1.year_of_birth, g2.user_id, g2.first_name, g2.last_name, g2.year_of_birth" +
				" from "+userTableName+" g1, "+userTableName+" g2, "+tagTableName+" t1, "+tagTableName+" t2 "+
					"where (g1.user_id,g2.user_id) not in (select user1_id,user2_id from "+friendsTableName+" f1 union select user2_id, user1_id from "+friendsTableName+" f1) "+
						"and g1.gender = 'female' and g2.gender = 'male' and abs(g1.year_of_birth - g2.year_of_birth) < "+yearDiff+" and g1.user_id = t1. tag_subject_id and g2.user_id = t2.tag_subject_id and t1.tag_photo_id = t2.tag_photo_id "+
									"group by g1.user_id, g1.first_name, g1.last_name, g1.year_of_birth, g2.user_id, g2.first_name, g2.last_name, g2.year_of_birth "+
												"order by count(*) desc, 1 asc, 5 asc");
	//initial rst2 	
	ResultSet rst2 = stmt2.executeQuery("select distinct user1_id,user2_id from "+friendsTableName+" f1 ");


	
	//load information from database to java as follows
	while(rst.next() & n>0){
			//get the girls' basic information
			Long girlUserId = rst.getLong(1);
			String girlFirstName = rst.getString(2);
			String girlLastName = rst.getString(3);
			int girlYear = rst.getInt(4);
			//get the boys' basic information
			Long boyUserId = rst.getLong(5);
			String boyFirstName = rst.getString(6);
			String boyLastName = rst.getString(7);
			int boyYear = rst.getInt(8);
			MatchPair mp = new MatchPair(girlUserId, girlFirstName, girlLastName, 
					girlYear, boyUserId, boyFirstName, boyLastName, boyYear);
			// using new statement to find public photos
			rst2 = stmt2.executeQuery("select p.photo_id,p.album_id,a.album_name,p.photo_caption,p.photo_link from "+photoTableName+" p, "+ albumTableName+" a, "+tagTableName+" t1, "+tagTableName+" t2 where t1. tag_photo_id = t2.tag_photo_id"+
							" and t1.tag_subject_id = "+girlUserId+" and t2.tag_subject_id = "+boyUserId+" and p.photo_id = t2.tag_photo_id and p.album_id = a.album_id");

			while(rst2.next()){
				String sharedPhotoId = rst2.getString(1);
				String sharedPhotoAlbumId = rst2.getString(2);
				String sharedPhotoAlbumName = rst2.getString(3);
				String sharedPhotoCaption = rst2.getString(4);
				String sharedPhotoLink = rst2.getString(5);
				mp.addSharedPhoto(new PhotoInfo(sharedPhotoId, sharedPhotoAlbumId, 
						sharedPhotoAlbumName, sharedPhotoCaption, sharedPhotoLink));
			}
			this.bestMatches.add(mp);
			n = n-1;
		}
		// Close statement and result set
		rst.close();
		rst2.close();
		stmt.close();
		stmt2.close();
	}

    

    // **** Query 6 ****
    // Suggest users based on mutual friends
    //
    // Find the top n pairs of users in the database who have the most
    // common friends, but are not friends themselves.
    //
    // Your output will consist of a set of pairs (user1_id, user2_id)
    // No pair should appear in the result twice; you should always order the pairs so that
    // user1_id < user2_id
    //
    // If there are ties, you should give priority to the pair with the smaller user1_id.
    // If there are still ties, give priority to the pair with the smaller user2_id.
    //
    @Override
    
    public void suggestFriendsByMutualFriends(int n) throws SQLException {
	/*	
	//test function: using for close views manually
	Statement stmt = oracleConnection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
	Statement stmt2 = oracleConnection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
	ResultSet rst = stmt.executeQuery("drop view n_f_pairs");
	ResultSet rst2 = stmt2.executeQuery("drop view mfriends");
	rst.close();
	stmt.close();
	rst2.close();
	stmt2.close();
	*/
	
	// To create a "normal" (unscrollable) statement, you would simply call
    	Statement stmt = oracleConnection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
	Statement stmt2 = oracleConnection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
	
	// To create a view to find the user pairs who are not friends
	ResultSet rst = stmt.executeQuery("create view n_f_pairs(user1_id,user2_id) as select u1.user_id, u2.user_id from "+userTableName+" u1, "+userTableName+" u2 where u1.user_id < u2.user_id" +
                          " minus (select f.user1_id,f.user2_id from "+friendsTableName+" f)");
	
	ResultSet rst2 = stmt2.executeQuery("create view mfriends as select distinct user1_id,user2_id from ( SELECT user1_id, user2_id FROM "+friendsTableName+" UNION SELECT user2_id, user1_id FROM "+friendsTableName+")");
	
	// Find pairs of users who have the most common friends but are not friends themselves	
	rst = stmt.executeQuery("select u1.user_id, u1.first_name, u1.last_name, u2.user_id, u2.first_name, u2.last_name"+
		" from n_f_pairs n, "+userTableName+" u1, "+userTableName+" u2, mfriends f1, mfriends f2 "+
			"where  n.user1_id = u1.user_id and n.user2_id = u2.user_id and n.user1_id = f1.user1_id and n.user2_id = f2.user1_id and f1.user2_id = f2.user2_id "+
				"group by u1.user_id, u1.first_name, u1.last_name, u2.user_id, u2.first_name, u2.last_name "+
						"order by count(*) desc, 1 asc, 4 asc");

	        while(rst.next() & n>0){
			Long user1_id = rst.getLong(1);
			String user1FirstName = rst.getString(2);
			String user1LastName = rst.getString(3);
			Long user2_id = rst.getLong(4);
			String user2FirstName = rst.getString(5);
			String user2LastName = rst.getString(6);
			UsersPair p = new UsersPair(user1_id, user1FirstName, user1LastName, user2_id, user2FirstName, user2LastName);
			rst2 = stmt2.executeQuery("select user_id,first_name,last_name from "+userTableName+" where user_id in ( (select user2_id from mfriends where user1_id = "+user1_id+") intersect "+
						"(select user2_id from mfriends where user1_id = "+user2_id+"))");
			while(rst2.next()){
				Long uid = rst2.getLong(1);
				String firstname = rst2.getString(2);

				String lastname = rst2.getString(3);

				p.addSharedFriend(uid,firstname,lastname);

			}

			this.suggestedUsersPairs.add(p);

			n = n-1;

		}  
	
	rst = stmt.executeQuery("drop view n_f_pairs");
	rst2 = stmt2.executeQuery("drop view mfriends");
	rst.close();
	stmt.close();
	rst2.close();
	stmt2.close();		


    }
    
    


    @Override
    // ***** Query 7 *****
    //
    // Find the name of the state with the most events, as well as the number of
    // events in that state.  If there is a tie, return the names of all of the (tied) states.
    //
    public void findEventStates() throws SQLException{
	// To create a "normal" (unscrollable) statement, you would simply call
    	try (Statement stmt =
                     oracleConnection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,
                             ResultSet.CONCUR_READ_ONLY)) {
		
	// Find the name of the state with the most events, as well as the number of events in that state.
	ResultSet rst = stmt.executeQuery("select COUNT (*), C.state_name from " +
 			eventTableName + " UE, " + cityTableName + " C where UE.event_city_id=C.city_id group by C.state_name order by 1 desc");
	int count = 0;
	while (rst.next()) {
                int scount = rst.getInt(1);
                String state = rst.getString(2);
                if (rst.isFirst())
		    count = rst.getInt(1);
                if (rst.getInt(1) == count )
                    this.popularStateNames.add(state);
            }
	this.eventCount = count;
	// Close statement and result set
            rst.close();
            stmt.close();
	 } catch (SQLException err) {
            System.err.println(err.getMessage());
	}
        
    }

    //@Override
    // ***** Query 8 *****
    // Given the ID of a user, find information about that
    // user's oldest friend and youngest friend
    //
    // If two users have exactly the same age, meaning that they were born
    // on the same day, then assume that the one with the larger user_id is older
    //
    public void findAgeInfo(Long user_id) throws SQLException{
	// To create a "normal" (unscrollable) statement, you would simply call
    	try (Statement stmt =
                     oracleConnection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,
                             ResultSet.CONCUR_READ_ONLY)) {
		
	//Given the ID of a user, find information about that user's oldest friend and youngest friend
	ResultSet rst = stmt.executeQuery("select u.user_id, u.first_name, u.last_name from " +
							userTableName + " u, (select f.user1_id  from " +
								friendsTableName + " f where f.user2_id= "+user_id+" union select f.user2_id from " +
									friendsTableName + " f where f.user1_id= "+user_id+" ) fid where u.user_id=fid.user1_id order by u.year_of_birth asc, u.month_of_birth asc, u.day_of_birth asc, u.user_id desc");
	
	while (rst.next()) {
                Long uid = rst.getLong(1);
                String firstName = rst.getString(2);
                String lastName = rst.getString(3);
		if (rst.isFirst())
		this.oldestFriend = new UserInfo(uid, firstName,lastName);
		if (rst.isLast())
                this.youngestFriend = new UserInfo(uid, firstName,lastName);
            }

	// Close statement and result set
            rst.close();
            stmt.close();
	 } catch (SQLException err) {
            System.err.println(err.getMessage());
	}
        
    }


    @Override
    //	 ***** Query 9 *****
    //
    // Find pairs of potential siblings.
    //
    // A pair of users are potential siblings if they have the same last name and hometown, if they are friends, and
    // if they are less than 10 years apart in age.  Pairs of siblings are returned with the lower user_id user first
    // on the line.  They are ordered based on the first user_id and in the event of a tie, the second user_id.
    //
    //


public void findPotentialSiblings() throws SQLException{
	// To create a "normal" (unscrollable) statement, you would simply call
    	try (Statement stmt =
                     oracleConnection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,
                             ResultSet.CONCUR_READ_ONLY)) {	        
	
	ResultSet rst = stmt.executeQuery("select u1.user_id, u1.first_name, u1.last_name, u2.user_id, u2.first_name, u2.last_name from " +userTableName + " u1, " + userTableName + " u2, " + friendsTableName + " f, " + 
     			hometownCityTableName +" uhc1, "+ hometownCityTableName +" uhc2 where u1.user_id=f.user1_id and u2.user_id=f.user2_id and u1.last_name=u2.last_name and u1.user_id=uhc1.user_id and u2.user_id=uhc2.user_id and uhc1.hometown_city_id=uhc2.hometown_city_id and (u1.year_of_birth-u2.year_of_birth) < 10 and (u1.year_of_birth-u2.year_of_birth) > -10 order by 1 asc, 4 asc");
	
	while (rst.next()) {
                Long user1_id = rst.getLong(1);
                String user1FirstName = rst.getString(2);
                String user1LastName = rst.getString(3);
		Long user2_id = rst.getLong(4);
                String user2FirstName = rst.getString(5);
                String user2LastName = rst.getString(6);
		SiblingInfo s = new SiblingInfo(user1_id, user1FirstName, user1LastName, user2_id, user2FirstName, user2LastName);
		this.siblings.add(s);
            }
	 // Close statement and result set
            rst.close();
            stmt.close();
	 } catch (SQLException err) {
            System.err.println(err.getMessage());
	}
    }
}
	


	






