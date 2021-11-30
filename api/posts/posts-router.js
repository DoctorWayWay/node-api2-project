// implement your posts router here

// ===== IMPORTS =====
const express = require("express")
const Posts = require("./posts-model")

// ===== INSTANCE OF EXPRESS =====
const router = express.Router()

// ===== ENDPOINTS =====
// [GET] /api/posts (returns all posts)
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find()
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json({
      "message": "The posts information could not be retrieved"
    })
  }
})

// ===== POST-ROUTER EXPORT =====
module.exports = router
