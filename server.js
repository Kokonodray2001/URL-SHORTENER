require('dotenv').config()
const { urlencoded } = require('express');
const express = require('express');
const mongoos =  require('mongoose');
const app =  express();
const ShortUrl =  require('./models/shortUrls');

//MIDDLEWARE
app.set('view engine','ejs');

app.use(urlencoded({extended :false}));
app.use(express.json());

mongoos.connect(process.env.Uri,{useNewUrlParser :  true},mongoos.set('strictQuery',true)).
then(()=>console.log("MongoDB Connected")).catch(err=> console.log(err));


app.get('/',async (req,res)=>{
    
    try {
        const shortUrls = await ShortUrl.find();
        res.render('index',{shortUrls :shortUrls});
    } catch (error) {
        res.json({message: error.message});
    }
    
});

app.post('/shortUrls',async (req,res)=>{
    const fullUrl = req.body.fullUrl;
    const ShortU = new ShortUrl({
        full : fullUrl
    });
    try {
        const newShortUrl = await ShortU.save()
            console.log(newShortUrl);
            res.json(newShortUrl.short);
    } catch (error) {
        res.json({message :  error.message});
    }
});
 app.get('/:short', async (req,res)=>{
    try {
        const fullURL =  await ShortUrl.findOne({short:req.params.short});
        fullURL.clicks++;
        fullURL.save();

        res.redirect(fullURL.full);
        
    } catch (error) {
        res.json({message : error.message})
    }
 })
app.listen(process.env.PORT ||  5000);
