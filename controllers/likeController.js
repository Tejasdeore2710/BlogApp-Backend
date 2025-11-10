// import models
const Post = require("../models/postModel");
const Like = require("../models/likeModel");

// like a post
exports.likePost = async (req, res) => {
  try {
    const { post, user } = req.body; // NO brackets ()

    const like = new Like({
      post,
      user,
    });

    const savedLike = await like.save();

    // update the post collections basis on this
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { likes: savedLike._id } },
      { new: true }
    ).populate("likes");

    res.json({
      post: updatedPost,
    });
  } catch (error) {
    return res.status(400).json({
      error: "Error while liking post",
    //   message: error.message,
    });
  }
};

exports.unlikePost = async(req,res) => {
    try{
        const {post,like} = req.body;
        // find and delete the like collection me se
        const deletedLike = await Like.findOneAndDelete({post:post, _id:like});

        // update the post collection
        const updatedPost = await Post.findByIdAndUpdate(post, {$pull: {likes: deletedLike._id} }, {new: true});

        res.json({
            post:updatedPost,
        })
    }
    catch{
        return res.status(400).json({
          error: "Error while unliking post",
        //   message: error.message,
        });
    }
}


exports.dummyLink = (req, res) => {
  res.send("This is your Dummy Page");
};
