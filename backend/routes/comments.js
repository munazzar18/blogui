const express = require('express')
const router = express.Router()
const Comments = require('../models/Comments')
const fetchUser = require('../middleware/fetchUser')
const Blogs = require('../models/Blogs')


//Route 1 : Get all Comments 
router.get('/:blogId/comments', async(req, res) => {
    try {
         const comments = await Comments.find(
           { blogId : req.params.blogId });
        res.json(comments)
    } catch(err){
        console.log(err.message)
        res.status(500).send("Internal Server Error")
    }
    
})

//Route 2 : Create a new comment
router.post('/:blogId/comments', fetchUser, async(req, res) => {
    try {
        const { content } = req.body 
        const comment = new Comments({
            content,
            blogId : req.params.blogId,
            user : req.user.id
            
        })
        const savedComment = await comment.save()
        res.json(savedComment)
    } catch(err){
        console.log(err.message)
        res.status(500).send("Internal Server Error")
    }
})

//Route 3 : Update a exisiting comment 
router.put('/:blogId/comments/:id', fetchUser, async(req, res) => {
    try {
        const { content } = req.body
        
        const newComment = {}

        if(content){
            newComment.content = content
        }

        let comment = await Comments.findById(req.params.id)

        if (!comment){
            return res.status(404).send("Not Found")
        }
        if (comment.user.toString() !== req.user.id){
            return res.status(401).send('Not Allowed')
        }

        if(!Blogs.blogId.toString() !== Blogs.blogId){
            return res.status(401).send("Not allowed in this blog")
        }

        comment = await Comments.findByIdAndUpdate(req.params.id, {$set : newComment}, {new : true} )
        res.json({comment})

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})

//Route 4: Delete an exsisting comment
router.delete('/:blogId/comments/:id', fetchUser, async(req, res) => {
    try {
        let comment = await Comments.findById(req.params.id)
        if(!comment){
            return res.status(404).send("Not Found")
        }
        if(comment.user.toString() !== req.user.id){
            return res.status(401).send("Not Permitted")
        } 
        if(!Blogs.blogId.toString() !== Blogs.blogId){
            return res.status(401).send("Not allowed in this blog")
        }
        comment = await Comments.findByIdAndDelete(req.params.id)
        res.json({"Success" : "Comment has been deleted successfully"})
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})
module.exports = router;
