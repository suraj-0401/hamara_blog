import Comment from '../models/model.comment.js';

export const addComment = async (req, res) => {
    try {
        const blogId = req.params.id;
        const { content } = req.body;

        // Validate content
        if (!content || content.trim().length === 0) {
            return res.status(400).json({ message: "Content is required" });
        }

        const comment = new Comment({
            blogId,
            content,
            createdAt: new Date()
        });

        await comment.save();

        res.status(201).json(comment);
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ message: "Error occurred while adding the comment" });
    }
};

export const getComment = async (req, res) => {
    const blogId = req.params.id;

    try {
        // Validate blogId
        if (!blogId) {
            return res.status(400).json({ message: "Blog ID is required" });
        }

        const comments = await Comment.find({ blogId });

        if (comments.length === 0) {
            return res.status(404).json({ message: "No comments found for this blog." });
        }

        res.json(comments);
    } catch (error) {
        console.error("Error retrieving comments:", error);
        res.status(500).json({ message: "Error occurred while retrieving comments" });
    }
};
