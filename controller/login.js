const mongo  = require('../model/mongo')

async function ValidateUser(user){
    const collection = mongo.get().collection('User')

    const query = {username : user.username,password : user.password}
    const findReslut = await collection.find(query).count()
    if( findReslut > 0 ){
        return true
    }else {
        return false
    }
}

module.exports={
    ValidateUser
}