// implement your server here
// require your posts router and connect it here

// ===== IMPORTS =====
const express = require("express")
const postsRouter = require("./posts/posts-router")

// ===== INSTANCE OF EXPRESS =====
const server = express()

// ===== GLOBAL MIDDLEWARE =====
server.use(express.json())
server.use("/api/posts", postsRouter)

// ===== ENDPOINTS =====
server.get("/", (req, res) => {
  res.status(200).send(`<h2>Welcome to my Blog Post API Module Project</h2>`)
})

// ===== SERVER EXPORT =====
module.exports = server
