// implement your posts router here
const Posts = require('./posts-model')
const express = require('express')
const router = express.Router()


router.get('/', (req,res) => {
    Posts.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({
            message: 'The posts information could not be retrieved'
        })
    })
})
router.get('/:id', (req,res) => {
    Posts.findById(req.params.id)
    .then(posts => {
        if(posts) {
            res.status(200).json(posts)
        }else{
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        }
        
    })
    .catch(err => {
        res.status(500).json({
            message: 'The post information could not be retrieved'
        })
    })
})
router.get('/:id/posts', (req,res) => {
    Posts.findPostComments(req.params.id)
    .then(posts => {
        if(posts){
        res.status(201).json(posts)
    } else{
        res.status(404).json({
             message: "The post with the specified ID does not exist" 
            } )
    }
    })
    .catch(err => {
        res.status(500).json({
            message: 'The comments information could not be retrieved'
        })
    })
})
router.post('/', (req,res) => {
    Posts.insert(req.body)
    .then(posts => {
        if(!posts.title || !posts.contents){
            res.status(404).json({
                message: 'Please provide title and contents for the post'
            })
        }else{

        
        res.status(201).json(posts)
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'There was an error while saving the post to the database'
        })
    })
})
router.patch('/', (req,res) => {
    Posts.update(req.params.id, req.body)
    .then(posts => {
        if(!posts.title || !posts.contents){
            res.status(400).json({
                message: 'Please provide title and contents for the post'
            })
        }else if(!posts){
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        }else{
        res.status(201).json(posts)
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'The post information could not be modified'
        })
    })
})
router.delete('/', (req,res) => {
    Posts.remove(req.params.id)
    .then(posts => {
        if(posts) {
        res.status(200).json(posts)
        }else{
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'The post could not be removed'
        })
    })
})

module.exports = router