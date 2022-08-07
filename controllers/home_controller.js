const Post = require('../models/posts');

module.exports.home = function(req,res){

    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title:"Home Codial",
    //         posts:posts
    //     });
    // })

    Post.find({}).populate('user').exec(function(err, posts){
        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts
        });
    })
    
}