const express = require("express");
const router = express.Router();
const Utils = require("./data/db.js");

router.post("/api/posts", async (req, res) => {
  try {
    const post = await Utils.insert(req.body);

    if (req.body.title && req.body.contents) {
      res.status(201).json(post);
    } else {
      res.status(400).json({
        message: "Please provide title and contents for the post."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "There was an error while saving the post to the database."
    });
  }
});

router.post("/api/posts/:id/comments", async (req, res) => {
  try {
    const post = await Utils.findById(req.params.id);
    if (post[0].id) {
      const newComment = { ...req.body, post_id: req.params.id };
      const comment = await Utils.insertComment(newComment);

      if (req.body.text) {
        res.status(201).json(comment);
      } else {
        res.status(400).json({
          message: "Please provide text for the comment."
        });
      }
    } else {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "There was an error while saving the comment to the database."
    });
  }
});

router.get("/api/posts", async (req, res) => {
  try {
    const posts = await Utils.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      error: "The posts information could not be retrieved."
    });
  }
});

router.get("/api/posts/:id", async (req, res) => {
  try {
    const post = await Utils.findById(req.params.id);

    if (post[0].id) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "The post information could not be retrieved."
    });
  }
});

router.get("/api/posts/:id/comments", async (req, res) => {
  try {
    const post = await Utils.findById(req.params.id);

    if (post[0].id) {
      const comments = await Utils.findPostComments(req.params.id);
      res.status(200).json(comments);
    } else {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "The comments information could not be retrieved."
    });
  }
});

router.put("/api/posts/:id", async (req, res) => {
  try {
    // const post = await Utils.update(req.params.id, req.params.body);
    const post = await Utils.findById(req.params.id);

    if (post[0].id) {
      if (req.body.title && req.body.contents) {
        const updatedPost = await Utils.update(req.params.id, req.body);
        res.status(200).json({ updatedPost });
      } else {
        res.status(400).json({
          message: "Please provide title and contents for the post."
        });
      }
    } else {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "The post information could not be modified."
    });
  }
});

router.delete("/api/posts/:id", async (req, res) => {
  try {
    const post = await Utils.findById(req.params.id);

    if (post[0].id) {
      await Utils.remove(req.params.id);
      res.json(post[0]);
    } else {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "The post could not be removed."
    });
  }
});

module.exports = router;
