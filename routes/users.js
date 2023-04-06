const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const {ensureToken} = require('../middleware/validate')
const {showAllContacts,showOneContacts,AddnewContacts,EditContacts,DeleteContacts} = require('../controller/controller')
const {ValidateUser} = require('../controller/login')
const secret = process.env.JWT_SECRET
// router.get('/', async (req, res, next) => {
//   try {
//     const collection = mongo.get().collection('students');
//     const documents = await collection.find().toArray();
//     res.json(documents);
//   } catch (err) {
//     next(err);
//   }
// });

// router.get('/showage/:age',(req,res)=>{
//     console.log("Show age :%s",req.params.age)
//     showAge(req.params.age).then((result) => {
//         console.log(result)
//         res.json(result)
//     })
//     .catch(console.error)
// })

// router.get('/showmajor/:major',(req,res)=>{
//     console.log("Show major :%s",req.params.major)
//     showMajor(req.params.major).then((result) => {
//         console.log(result)
//         res.json(result)
//     })
//     .catch(console.error)
// })
// router.get('/contacts',ensureToken,(req,res)=>{
//     jwt.verify(req.token,secret,(err,data) => {
//         if(err){
//                 res.send(403);
//         }else {
            
//             showAllContacts().then((result)=>{
//                 res.json(result)
//                 console.log(result)
//             })
//         }
//     })
// })
router.get('/',(req,res)=>{
   res.send('Hello Assignement EGCO')

})

router.get('/contacts',ensureToken,(req,res)=>{
   
            showAllContacts().then((result)=>{
                res.json(result)
            })
  
})

router.get('/contacts/:id',ensureToken,(req,res)=>{
    console.log("Show id :%s",req.params.id)
    showOneContacts(req.params.id).then((result)=>{
        res.json(result)
    })
})

router.post('/contacts',ensureToken,(req,res)=>{
    
    const newContacts = req.body
    
    AddnewContacts(newContacts).then((result)=>{
        console.log(result)
        res.json(result)
    })
})
router.put('/contacts/:id',ensureToken,(req,res)=>{

    const editContacts = req.body;
    console.log("update Contacts",editContacts) 
    EditContacts(editContacts,req.params.id).then((result)=>{
        res.json(result)
    })

})

router.delete('/contacts/:id',ensureToken,(req,res)=>{
    DeleteContacts(req.params.id).then((result)=>{
        res.json(result)
    })
})

router.post('/login',(req,res) => {
    const user = req.body
    console.log(req.body)
    ValidateUser(user).then((result)=>{
            

        if(result){
            // const secret = process.env.JWT_SECRET
            // console.log('value is %s',secret)
            const token = jwt.sign({ user : user.username},secret,{ expiresIn: '1800s' })
            res.json({
                message: 'Authenticated! Use this token in the "Authorization" header',
                token: token
                   });
        }else {
            res.json({
                message : 'Authenticaiton failed invalided username or password' ,
                user: {
                username: user.username,
                password: user.password
                      }
                    })
        }
            // res.json("congrate you're login in this")
    })
})


module.exports = router;
