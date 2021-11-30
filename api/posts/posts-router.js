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

// [GET] /api/posts/:id (returns an individual post)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const post = await Posts.findById(id)
    if (!post) {
      res.status(404).json({
        "message": "The post with the specified ID does not exist"
      })
    } else {
      res.status(200).json(post)
    }
  } catch (err) {
    res.status(500).json({
      "message": "The post information could not be retrieved"
    })
  }
})

// ===== POST-ROUTER EXPORT =====
module.exports = router
