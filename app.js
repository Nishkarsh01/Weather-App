/**requiring various node and npm packages */
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');


/***initialising app */
const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended : true
}))

/**enabling app to listen for the port */
app.listen(3000,function(){
    console.log("server running on port 3000");
});

/***get request */
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

/****post request */
app.post("/",function(req,res){
    var city=req.body.city;
    var country=req.body.country;

    //console.log(city+"");
    //console.log(country+"");

    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+","+country+"&appid=xxxxxxxxxxxxxxx&units=metric";

    https.get(url,function(response){
        response.on("data",function(data){
            var weatherData=JSON.parse(data);
            
            var main=weatherData.weather[0].main;
            var description=weatherData.weather[0].description;
            var temp=weatherData.main.temp;
            var feels_like=weatherData.main.feels_like;
            var min=weatherData.main.temp_min;
            var max=weatherData.main.temp_max;
            var icon=weatherData.weather[0].icon;
            var iconURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            
            res.write("<h1>Description: "+description+"</h1>");
            res.write("<style> body{background-color:rgb(236, 211, 211)}</style>")
            res.write(" " + "<img src=" + iconURL + ">");
            res.write("<p>Temperature: "+temp+" Degree Celcius</p>");
            res.write("<p>Feels Like: "+feels_like+" Degree Celcius</p>");
            res.write("<p>Minimum Temperature "+min+" Degree Celcius</p>");
            res.write("<p>Maximum Temperature "+max+" Degree Celcius</p>");
    
           
            

            res.send();
            
        });
    });
});