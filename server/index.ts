import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import { Server, Socket } from "socket.io"
import { createServer } from "http"
import routes from "./routes"
dotenv.config()

//middleware
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan("dev"))
app.use(cookieParser())

// Socket.io
const http = createServer(app)
export const io = new Server(http)
import { SocketServer } from "./config/socket"

io.on("connection", (socket: Socket) => {
  SocketServer(socket)
})

//Routes
app.use("/api", routes)

//Database
import "./config/database"

//server listening
const PORT = process.env.PORT || 5000
http.listen(PORT, () => {
  console.log("Server is running on port", PORT)
})
