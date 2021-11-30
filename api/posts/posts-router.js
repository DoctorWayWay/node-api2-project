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

// [POST] /api/posts (posts a new post)
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.contents) {
      res.status(400).json({
        "message": "Please provide title and contents for the post"
      })
    } else {
      const insertedPost = await Posts.insert(req.body)
      const newPost = await Posts.findById(insertedPost.id)
      res.status(201).json(newPost)
    }
  } catch (err) {
    res.status(500).json({
      "message": "There was an error while saving the post to the database"
    })
  }
})

// [PUT] /api/posts/:id (updates a post by id)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { title, contents } = req.body
    const postToBeUpdated = await Posts.findById(id)
    if (!postToBeUpdated) {
      res.status(404).json({
        "message": "The post with the specified ID does not exist"
      })
    } else if (!title || !contents) {
      res.status(400).json({
        "message": "Please provide title and contents for the post"
      })
    } else {
      await Posts.update(id, req.body)
      const updatedPost = await Posts.findById(id)
      res.status(200).json(updatedPost)
    }
  } catch (err) {
    res.status(500).json({
      "message": "The post information could not be modified"
    })
  }
})

// [DELETE] /api/posts/:id (removes post by id)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const postToBeDeleted = await Posts.findById(id)
    if (!postToBeDeleted) {
      res.status(404).json({
        "message": "The post with the specified ID does not exist"
      })
    } else {
      await Posts.remove(id)
      res.status(200).json(postToBeDeleted)
    }
  } catch (err) {
    res.status(500).json({
      "message": "The post could not be removed"
    })
  }
})

// [GET] /api/posts/:id/comments (finds and returns a post's comments)
router.get("/:id/comments", async (req, res) => {
  try {
    const { id } = req.params
    const post = await Posts.findById(id)
    if (!post) {
      res.status(404).json({
        "message": "The post with the specified ID does not exist"
      })
    } else {
      const postComments = await Posts.findPostComments(id)
      res.status(200).json(postComments)
    }
  } catch (err) {
    res.status(500).json({
      "message": "The comments information could not be retrieved"
    })
  }
})

// ===== POST-ROUTER EXPORT =====
module.exports = router
