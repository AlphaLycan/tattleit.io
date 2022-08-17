const express = require('express');
const User = require('../model/userSchema');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate')
const Chat123 = require('../model/postSchema')
const clgN = require('../model/clgSchema')
const { db } = require('../model/userSchema');
const path = require('path');

require('../db/conn');
require('../model/userSchema');
require("../model/postSchema");

router.use(express.static(path.join(__dirname, '../tattle/build')));
router.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../tattle/public/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })


router.post('/login', async(req,res)=>{
    
    try {
        let token;
        const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({error: "please enter properly"})
};

    const userLogin = await User.findOne({email:email});

    if(userLogin){
        const isMatch = await bcrypt.compare(password, userLogin.password);

        token = await userLogin.generateAuthToken();

        res.cookie("jwtoken",token,{
            expires: new Date(Date.now() + 25892000000),
            httpOnly:true
        });

        if(!isMatch){
            return res.status(400).json({error: "Invalid credentials."})}
        else 
        {
            return res.status(200).json({message: "login successful"})};
    }else{
        return res.status(400).json({error: "Invalid credentials."})
    }
        
    } catch (error) {
    }

    
});


router.post('/register',async (req,res) => {

    const{name,
        email,
        collegename,
        password,
        cpassword}= req.body;

    if(!name ||
        !email ||
        !collegename ||
        !password ||
        !cpassword){return res.status(422).json({error: "please enter properly"})}
    
    try {
        const UserExists = await User.findOne({email:email});
        
        if(UserExists){
            return res.status(422).json({error: "email already exists."})
        }
        else if(password!=cpassword){
            return res.status(422).json({error: "Wrong password"})
        }
        else{
            const user = new User({name,email,collegename,password,cpassword});
            await user.save();
            res.status(201).json({message: "user registered."});

            // var flag = false;
            
            // var https = require("https");
            // var api_key = process.env.API_KEY;
            // var Admin_email = email;
            // var ip_address = "";

            // var options = {
            //     hostname: 'api.zerobounce.net',
            //     port: 443,
            //     path: "/v2/validate?api_key="+api_key+"&email="+Admin_email+"&ip_address='"+ip_address+"'",
            //     method: 'GET',
            //     secureProtocol: "TLSv1_2_method"
            // }

            // https.request(options, res => {
            //     let body = '';
            //     res.on('data', d => body += d)
            //     res.on('end', () => {
            //         var result = JSON.parse(body);
            //     // DO SOMETHING WITH result JSON
            //     if(result.status === 'valid'){
            //         flag = true
            //     }

            //     })
            // }).on('error', err => {

            //     //DO SOMETHING FOR ERRORS
            //     window.alert('invalid email')
            //     return;

            // }).end()
            
        }
        
    } catch (error) {
        
    }

});

router.get('/myprofile',authenticate, (req,res) =>{
    res.send(req.verifyuser)
    
});

router.post('/chatlog',authenticate, async (req,res) =>{
    const{chatt}= req.body;
    var{userEmail} = req.body;
    var {clgN} = req.body;
    userEmail = req.verifyuser.email
    clgN = req.verifyuser.collegename
    const chat = new Chat123({chatt, userEmail, clgN});

    if (!chatt){
        return res.status(422).json({error: "Write something"})
    }
    else{
        await chat.save();
        return res.status(200).json({message: "messege posted"})
       
    }
    
});

router.get('/chatting',authenticate, async (req,res) =>{
    const collegename = req.verifyuser.collegename;
    const verifypost = await Chat123.find({clgN:collegename})
    res.send(verifypost)
   
});

router.get('/get_posts',authenticate, async(req,res)=>{
    var{userEmail} = req.body;
    userEmail = req.verifyuser.email
    const verifypost = await Chat123.find({userEmail:userEmail})    
        res.send(verifypost)
     
});


router.get('/logout', (req,res) =>{
    res.clearCookie('jwtoken', {path:'/'})
    res.status(200).send("User logged out")
    
});

router.get('/findingClg', async (req,res) =>{
    const verifyclg = await clgN.find()
    res.send(verifyclg) 
});

router.post('/delete_post', async(req,res)=>{
    const {chatid}= req.body;
    const deletePost = await Chat123.deleteOne({_id:chatid})
    res.send(deletePost)
})


module.exports = router;