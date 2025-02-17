// This is your server file, and is the root of your project's back end. 


// This imports express from the express NPM package, readying it for use.
import express from "express"

// These type imports bring in definitions for both the Request and the Response objects,
// ensuring your routes only take in parameters that match these types.
import { Request, Response } from "express";

// This is specific to this project. Here, we're importing fs, or file system. The fs package is built into Node.js,
// which is why this doesn't appear in your package.json's dependencies. Here, this allows us to read and create files
// on your local machine. 
// In a regular server, this would be replaced with a connection to an SQL or other database. 
import fs from "fs"


// This defines the port your server will broadcast on. Think of ports as sort of like radio frequencies - 
// each one can only be used by one program. Your computer has thousands of ports, but most are used by
// your operating system for various background processes. When developing an express app, we tend to use 
// ports that are almost always unused, such as 3000, 3001, 5000, or 8080. 
const PORT = 8080


// This creates the express server, and initializes it in your code. From here on out, you can set middleware options on it, 
// and, when you're ready, start the server.
const app = express();


// This is one of two pieces of server middleware that is almost always enabled. It ensures your server 
// only accepts URLS that have had their special characters, such as spaces, encoded.
app.use(express.urlencoded({extended: true}))

// This is the second of two pieces of server middleware that are almost always enabled. It directs your server to
// send and receive information in JSON format only.
app.use(express.json())


// An example of a GET route. GET routes are read-only, and do not create, modify, or delete data. 
app.get("/api/getMePizza", (req: Request, res: Response) => { // Like all routes, it has three pieces: the route, its 
    //request and response object parameters, and a function that runs when the route is triggered.
    res.json({ // < - Each route must have a response, such as this one that sends back JSON. If a route doesn't have 
        // a response, the request will hang. 
        message: "This route gets you pizza in 20 minutes or it's free."
    })
})

// An example of a POST request. POST routes create new data. 
app.post("/api/createOrder", (req: Request, res: Response) => {
    // This interface is a typescript feature - it tells our route what form 
    // we expect the inbound data to take. Typescript can use this to tell us
    // if we write code that doesn't abide by this format.
    interface pizzaOrder {
        size: string,
        number: number,
        toppings: string[]
    }
    // POST routes typically use data sent by the frontend in the body of the request, seen here
    // as req.body
    let data: pizzaOrder = req.body

    // In this example, we're using the data we received to create an entry in a text file. Most of the time, we'd 
    // use this data to create a new entry in a SQL or other kind of database.
    fs.writeFile("orders.txt", JSON.stringify(data), function() {
        res.status(200).json({
            message: `Pizza order received!`
        })
    })

})



// This function starts the server, and is always listed LAST. All routes, middleware, and other variables have to be
// set before this runs. Once the server is started, any changes will require a restart. 
app.listen( PORT, () => {
    console.log(`SERVER ONLINE. LISTENING AT PORT ${PORT}`)
})