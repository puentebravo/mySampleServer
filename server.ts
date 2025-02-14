import express from "express"
import { Request, Response } from "express";
import fs from "fs"

const PORT = 8080

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("/api/getMePizza", (req: Request, res: Response) => {
    res.json({
        message: "This route gets you pizza in 20 minutes or it's free."
    })
})

app.post("/api/createOrder", (req: Request, res: Response) => {

    interface pizzaOrder {
        size: string,
        number: number,
        toppings: string[]
    }

    let data: pizzaOrder = req.body

    fs.writeFile("orders.txt", JSON.stringify(data), function() {
        res.status(200).json({
            message: `Pizza order received!`
        })
    })

})




app.listen( PORT, () => {
    console.log(`SERVER ONLINE. LISTENING AT PORT ${PORT}`)
})