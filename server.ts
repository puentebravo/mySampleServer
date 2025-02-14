import express from "express"
import { Request, Response } from "express";

const PORT = 8080

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("/api/getMePizza", (req: Request, res: Response) => {
    res.json({
        message: "This route gets you pizza in 20 minutes or it's free."
    })
})




app.listen( PORT, () => {
    console.log(`SERVER ONLINE. LISTENING AT PORT ${PORT}`)
})