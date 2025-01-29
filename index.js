const express = require('express');

const mongoose = require('mongoose');
//const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true}));

mongoose.connect("mongodb://localhost:27017/registrationform", )
.then(()=>{
    console.log('connected')
})
.catch(()=>{
    console.log('notconnected', err)
});
const userSchema = new mongoose.Schema({
    Username:String,
    Email:String,
    Password:String
    
});

const User = mongoose.model('user', userSchema);
 
app.get('/', (req, res) =>{
    res.sendFile((__dirname + '/reg.html'));
})
 
app.get('/demo.html', (req, res) =>{
    res.sendFile((__dirname + '/demo.html'));
})
app.post('/register',(req, res)=>{
    const {username, email, password} = req.body;

const newUser = new User({
    username ,
    email,
    password
    
});

newUser.save()
 .then(() => res.send('Form Successful'))
 .catch(err => res.status(500).send('error user:' + err.message));
});

app.post('/login', async (req, res)=>{
    const {email , password} = req.body;

    try{
        const user = await User.findOne({ email, password });

    if(user){
        res.send(`Welcome Back, ${user.Username} `)

    }else {
        res.status(401).send('invalid email or password');
    }
    }catch (err) {
        res.status(500).send('error login in:'+ err.message );
    }
})
app.listen(3000, ()=>{
    console.log("server started")
});