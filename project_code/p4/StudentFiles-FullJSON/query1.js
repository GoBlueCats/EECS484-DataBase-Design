//query1 : find users who live in the specified city. 
// Returns an array of user_ids.

function find_user(city, dbname){
    db = db.getSiblingDB(dbname)
    //implementation goes here
    var tmp = db.users.find({"hometown.city":city});
    var result = [];
    while (tmp.hasNext()) {
        result.push(tmp.next().user_id);
    }
    // tmp.forEach(function(entry) {result.push(entry);});
    return result;
    // returns a Javascript array. See test.js for a partial correctness check.  
    // This will be  an array of integers. The order does not matter.           
}
