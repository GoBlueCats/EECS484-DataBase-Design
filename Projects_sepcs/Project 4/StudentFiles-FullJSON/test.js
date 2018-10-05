load('query1.js')
load('query2.js')
load('query3.js')
load('query4.js')
load('query5.js')
load('query6.js')
load('query7.js')

//fill in your database name
// Your dbname is your uniqname
dbname = 'test';

//test query1

var test1 = find_user('Bucklebury',dbname);
if(test1.length === 51){
  print("test1 correct!")
}


//test query2
unwind_friends(dbname)
if(db.flat_users.find().count() === 21475){
  print("test2 correct!")
}

//test query3
cities_table(dbname)
if(db.cities.find({"_id" : "Bucklebury"}).next().users.length === 51){
  print("test3 correct!")
}


//test query4
var test4 = suggest_friends(5,dbname);
if (test4.length === 87){
 print("test4 correct!")
}

// test query5
var test5 = oldest_friend(dbname);
if(Object.keys(test5).length === 800){
 if(test5.hasOwnProperty(521)){
    if(test5[521] == 405){
      print("test5 correct!")
    }
 }
}

// test query6
var test6 = find_average_friendcount(dbname);
if (test6 < 30) {
  print("test6 correct!");
}

// test query 7
// run the mapreduce function with function objects
db.users.mapReduce(
  city_average_friendcount_mapper,
  city_average_friendcount_reducer,
  {
    out: "friend_city_population",
	finalize: city_average_friendcount_finalizer
  }
);
if (db.friend_city_population.find().count() == 16) {
  print("test7 correct!");
}
