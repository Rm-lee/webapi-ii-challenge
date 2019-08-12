const express = require("express");
const dbs = require("./db");
const router = express.Router();

router.get("/", (req, res) => {
  dbs
    .find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({
        error: "The posts information could not be retrieved"
      });
    });
});

router.get("/:id", (req,res) => {
 const id = req.params.id
 dbs.findById(id)
 
 .then(post => {
  if(post){
  res.status(200).json(post)
  }
  else{
   res.status(404).json({
    message: "The post with the specified ID does not exist"
   })
  }
})
 .catch(error => {
  res.status(500).json({
   error: "The post information could not be retrieved."
  })
 })

})
router.post("/", (req, res) => {
  const newBlog = req.body;
  if (newBlog.title && newBlog.contents) {
    dbs
      .insert(newBlog)
      .then(id => {
        dbs.findById(id.id).then(blog => {
          res.status(201);
          res.json(blog);
        });
      })
      .catch(error => {
        res.status(500);
        res.json({
          error: "There was an error while saving the post to the database"
        });
      });
  } else {
    res.status(400);
    res.json({
      errorMessage: "Please provide title and contents for the post"
    });
  }
});

router.post("/:id/comments", (req, res) => {
  const comment = req.body;
  if (comment.text) {
    dbs.insertComment(comment)
     .then(id => {
      dbs.findCommentById(id.id)
        .then(postedComment => {
          res.status(201).json(comment);
        })
        .catch(error => {
          res.status(404).json({
            message: "The post with the specified ID does not exist"
          });
        });
    })
    .catch(error =>{
     res.status(500).json({
      error: "There was an error while saving the comment to the database"
     })
    })
  } else {
    res.status(400).json({
      errorMessage: "Please provide text for the comment."
    });
  }
});

module.exports = router;
