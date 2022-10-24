const Player = require('../player');

//returns all players within the db
function GetAllPlayers() {
    try {
        return Player.find();
    } catch (e) {
        console.log('error adding player --->', e.message);
    }
}

//AddPlayer adds a new player to the db
async function AddPlayer(playerObj) {
    try {
        const user = await Player.create(playerObj);
       return user
    } catch (e) {
        console.log('error adding player --->', e.message);
    }
}




//Check if player exists
async function CheckIfExists(name){
    const findObj = await Player.find({name:{$exists:true, $in:[name]}}).exec()

    if(findObj.length == 0){
        return false
        
    }
    return true

        
}







module.exports = { AddPlayer, GetAllPlayers, CheckIfExists };
