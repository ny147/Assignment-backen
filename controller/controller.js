
const mongo = require('../model/mongo');
var ObjectId = require('mongodb').ObjectId;
const cName = "ContactList"


async function showAllContacts(){
    const collection = mongo.get().collection(cName)
    const findResult = await collection.find().toArray()
    return findResult
}

async function showOneContacts(findId){
    const collection = mongo.get().collection(cName)
    // const query = {cid : parseInt(findId)}
    const query = {_id : new ObjectId(findId)}
    const findResult = await collection.find(query).toArray();
    return findResult
}

async function AddnewContacts(Contacts){
    const collection = mongo.get().collection(cName)
    var newContacts = Contacts ;
    const Result = await collection.insertOne(newContacts)
    return newContacts;


}
async function EditContacts(Contacts,Contacts_id){
    const collection = mongo.get().collection(cName)
    // let query = {cid: parseInt(Contacts.cid)}
    // let query = {_id :  ObjectId(Contacts_id)}
    let query = {_id : new ObjectId(Contacts_id)}
    let newValue = {$set: { 
                            cid : parseInt(Contacts.cid),
                            firstname : Contacts.firstname,
                            lastname : Contacts.lastname,
                            email : Contacts.email,
                            mobile: Contacts.mobile,
                            facebook : Contacts.facebook,
                            imageUrl : Contacts.imageUrl}}

    const result = await collection.updateOne(query,newValue)
    return result;
}

async function DeleteContacts(findId){
    
    const collection = mongo.get().collection(cName)
    // const query = {cid : parseInt(findId)}
    const query = {_id : new ObjectId(findId)}
    console.log(findId)
    let deleteResult = await collection.deleteOne(query);
    return deleteResult;
}

module.exports= {
    showAllContacts,showOneContacts,AddnewContacts,EditContacts,DeleteContacts
}