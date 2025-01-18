import Comment from '../models/model.comment.js'

export const addComment = async (req, res) => {
    try {
        const blogId = req.params.id;
        
        const { content } = req.body;
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
        const comments = await Comment.find({ blogId });
        if (comments.length === 0) {
            return res.status(404).json({ message: "No comments found for this blog." });
        }
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}





