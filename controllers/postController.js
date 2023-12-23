const Post = require("../models/Post");

exports.getAllPosts = async (req, res) => {
	try {
		const posts = await Post.find().populate("author", "username");
		res.json({ success: true, posts });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};

exports.getPostById = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id).populate(
			"author",
			"username",
		);
		if (!post) {
			res.status(404).json({ success: false, message: "Post not found" });
			return;
		}
		res.json({ success: true, post });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};

exports.createPost = async (req, res) => {
	try {
		const { title, content } = req.body;
		const userId = req.user.userId;
		// console.log(userId) authors id

		const post = new Post({ title, content, author: userId });

		await post.save();

		res.json({ success: true, message: "Post created successfully", post });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};

exports.updatePost = async (req, res) => {
	try {
		const { title, content } = req.body;
		const postId = req.params.id;
		const userId = req.user.userId;

		const post = await Post.findById(postId);

		if (!post || post.author.toString() !== userId) {
			res.status(403).json({
				success: false,
				message:
					"Post not found or You do not have permission to update this post",
			});
			return;
		}

		post.title = title;
		post.content = content;

		await post.save();

		res.json({ success: true, message: "Post updated successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};

exports.deletePost = async (req, res) => {
	try {
		const postId = req.params.id;
		const userId = req.user.userId;

		const post = await Post.findById(postId);

		if (!post || post.author.toString() !== userId) {
			res.status(403).json({
				success: false,
				message: "You do not have permission to delete this post",
			});
			return;
		}

		await Post.deleteOne({ _id: postId });

		res.json({ success: true, message: "Post deleted successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};
