//import express from node_modules
const { response } = require('express')
let express = require('express')
let mongoose = require('mongoose')
let song = require('./song')

//create express app
let app = express()

//configure express app to parse incoming request payload
//in JSON format
app.use(express.json())

//use mongoose to connect to database
let connectionString = "mongodb+srv://usermongo:passwordmongo@cluster0.ubu6loq.mongodb.net/youtube"
mongoose.connect(connectionString)
let db = mongoose.connection

db.once('open', ()=>{
    console.log("Connection to mongodb in cloud is success!!!!")
})


/*
create root endpoint -> /
http://localhost:8080/
app.get(endpoint, callback)
endpoint -> /,  /todos/ get/friends/all
callback -> (incoming request, outgoing response)=>{}
*/

app.get("/", (request, response)=>{
    console.log("Request received....GET")
    console.log(request.url)
    response.send("<h1>Hello from server!</h1>")
})

app.get("/welcome", (request, response)=>{
    console.log("Request received....GET")
    console.log(request.url)
    response.send("<h1>Welcome to Express API on Cyclic!</h1>")
})

/*
create endpoint -> /help
http://localhost:8080/help
GET Request
*/
app.get("/help", (request, response)=>{
    console.log("Request received....GET")
    console.log(request.url)
    // response.send("<h1>HELP from server!</h1>")
    response.json({
        status:"Success",
        request_type:"GET",
        message:"Send email to prafful@airasia.com",
        meaning:"I will retrieve the single/list of data from the server",
        progress:"API is deployed on cyclic!"
    })
})


/*
create endpoint -> /showrequest
http://localhost:8080/showrequest
*/
app.get("/showrequest", (request, response)=>{
    console.log("Request received....GET")
    console.log("*************Request start***************")
    console.log(request)
    console.log("*************Request ends****************");
    response.send("<h1>See Request object in JSON format in server console!</h1>")
})

/*
create endpoint -> /help
http://localhost:8080/help
POST request
*/
app.post("/help", (request, response)=>{
    console.log("Request received....POST")
    //console.log(request)
    console.log(request.body)
    console.log(request.body.name)
    console.log(request.body.location)
    console.log(request.url)
    response.json({
        status:"Success",
        request_type:"POST",
        message:"Send email to prafful@airasia.com",
        meaning:"I will add a new data to the server"
    })
})

/*
create endpoint -> /help
http://localhost:8080/help
PUT request
*/
app.put("/help", (request, response)=>{
    console.log("Request received....PUT")
    console.log(request.url)
    response.json({
        status:"Success",
        request_type:"PUT",
        message:"Send email to prafful@airasia.com",
        meaning:"I will update a data on the server"
    })
})

/*
create endpoint -> /help
http://localhost:8080/help
DELETE request
*/
app.delete("/help", (request, response)=>{
    console.log("Request received....DELETE")
    console.log(request.url)
    response.json({
        status:"Success",
        request_type:"DELETE",
        message:"Send email to prafful@airasia.com",
        meaning:"I will delete a data from the server",
        progress:"API is deployed on cyclic!"
    })
})


//get data from mongodb database

/*
http://localhost:8080/get/all/songs
*/
app.get("/get/all/songs",(request, response)=>{
    //use song reference/model in line 4 to interact 
    //with song collection in mogodb database
    song.find({})
        .then((data)=>{
            response.json(data)
        })
        .catch((error)=>{
            response.json(error)
        })
})

/*
http://localhost:8080/add/song
*/
app.post("/add/song",(req, res)=>{
    console.log("Request body received from frontend")
    console.log(req.body)
    let newSong = new song()
    console.log(newSong)
    newSong.videoid = req.body.videoid
    newSong.likes = req.body.likes
    newSong.dislikes = req.body.dislikes
    newSong.views = req.body.views
    console.log(newSong)
    //insert newSong to mongoDB database
    newSong.save()
            .then((data)=>{
                res.json({
                    "message":"success",
                    "status":data
                })
            })
            .catch((error)=>{
                response.json(error)
            })
})

/*
http://localhost:8080/remove/song/64009ea4ba7529e203a0e766
*/
app.delete("/remove/song/:myid", (request, response)=>{
    console.log("Remove one document from song collection....")
    console.log("id: " + request.params.myid )
    //use myid to find and remove song from mongodb
    song.findByIdAndDelete(request.params.myid)
        .then((data)=>{
            response.json(data)
        })
        .catch(error=>{
            response.json(error)
        })
})

/*
http://localhost:8080/update/song/63a00f5c6a7efa8bf6cf9a7f
*/
app.put('/update/song/:id', (request, response)=>{
    //Received path variable
    //console.log("id: " + request.params.id )
    console.log(`id received: ${request.params.id}`)
    console.log("Request body received....")
    console.log(request.body)
    // let songUpdate = new song()
    // songUpdate.videoid = request.body.videoid
    // songUpdate.likes = request.body.likes
    // songUpdate.dislikes = request.body.dislikes
    // songUpdate.views = request.body.views
    // songUpdate.isNew = false
    //update song collection with songUpdate in mongodb database
    song.updateOne({_id: request.params.id}, 
                        {
                            $set:{
                                    videoid:request.body.videoid,
                                    likes:request.body.likes,
                                    dislikes: request.body.dislikes,
                                    views: request.body.views
                                }
                        } )
                .then(data=>{
                    response.json(data)
                })
                .catch(error=>{
                    response.json(error)
                })
})





//define port for the API
let PORT = 8080
//listen on port
app.listen(PORT, ()=>{
    console.log("Listening on port " + PORT)
})

