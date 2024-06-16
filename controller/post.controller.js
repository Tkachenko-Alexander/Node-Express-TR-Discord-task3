const db = require('../db');

class PostController {
    async createPost(req, res) {
        const { title, content, user_id } = req.body; 
        try {
            const newPost = await db.query(
                `INSERT INTO post (title, content, user_id) values ($1, $2, $3) RETURNING *`,
                [title, content, user_id]
            );
            res.json(newPost.rows[0]);
        } catch (error) {
            res.status(500).json({ message: 'Error creating post', error });
        }
    }

    async getPostByUser(req, res) {
        const id = req.query.id;
        try {
            const posts = await db.query(
                `SELECT * FROM post WHERE user_id = $1`, 
                [id]
            );
            res.json(posts.rows);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving posts', error });
        }
    }
}

module.exports = new PostController();
