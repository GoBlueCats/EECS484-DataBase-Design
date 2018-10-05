//find the oldest friend for each user who has a friend. For simplicity, use only year of birth to determine age, if there is a tie, use the one with smallest user_id
//return a javascript object : key is the user_id and the value is the oldest_friend id
//You may find query 2 and query 3 helpful. You can create selections if you want. Do not modify users collection.
//
//You should return something like this:(order does not matter)
//{user1:userx1, user2:userx2, user3:userx3,...}

function oldest_friend(dbname){
  db = db.getSiblingDB(dbname)
  var OBJ = {};
  //unwind firiends and create a new collection called flatusers
  db.users.aggregate([
  		{$unwind:"$friends"},
  		{$project:{_id:0, user_id:1, friends:1}},
  		{$out:"flatusers"}
  	])

  var temp = [];
  var mycursor = db.flatusers.find();
  while(mycursor.hasNext())
  {
  	temp.push({user_id: mycursor.next().friends, friends: mycursor.next().user_id});
  }

  for(var i = 0; i < temp.length; i++)
  {
  	db.flatusers.insert(temp[i]);
  }
  
  //get final friends collection and group
  db.flatusers.aggregate(
     {$group:{_id:"$user_id", friends:{$push:"$friends"}}},
     {$out:"final_friends"}
  	)

  var cursor = final_friends.find();
  while(cursor.hasNext())
  {
  	var cursor1 = cursor.next();
  	//find the oldest friend for a specific user
  	//define the minimum age of a specific user's friend
  	
  	var minage = -999; 
  	var min_id = 0;

  	//find the minage and corresponding user_id
  	for(var i=0;i < cursor1.friends.length;i++)
  	{	
  		
  		var YEAR = db.users.find({user_id:cursor1.friends[i]});
  		
  		if(minage == -999)
  		{
  			minage = YEAR.next().YOB;
  			min_id = cursor1.friends[i];
  		}
  		else if(minage > YEAR.next().YOB)
  		{
  		 	minage = YEAR.next().YOB;
  		 	min_id = cursor1.friends[i];
  		}
  		else if(minage == YEAR.next().YOB)
  		{
  			if(min_id > cursor1.friends[i])
  			{
  				min_id = cursor1.friends[i];
  			}
  		}

  	}
  	OBJ[cursor1._id] = min_id
  }

  	return OBJ;
	

  //implementation goes here
  //return an javascript object described above

}
