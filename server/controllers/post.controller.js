import Post from '../models/post';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getPosts(req, res) {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ posts });
  });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export function addPost(req, res) {
  if (!req.body.post.movieTitle || !req.body.post.releaseDate || !req.body.post.duration || !req.body.post.genre || !req.body.post.synopsis) {
    res.status(403).end();
  }

  const newPost = new Post(req.body.post);

  // Let's sanitize inputs
  newPost.movieTitle = sanitizeHtml(newPost.movieTitle);
  newPost.releaseDate = sanitizeHtml(newPost.releaseDate);
  newPost.duration = sanitizeHtml(newPost.duration);
  newPost.genre = sanitizeHtml(newPost.genre);
  newPost.synopsis = sanitizeHtml(newPost.synopsis);

  newPost.slug = slug(newPost.movieTitle.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  newPost.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post: saved });
  });
}

export function editPost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    const newPost = new Post(req.body.post);

    post.movieTitle = newPost.movieTitle;
    post.releaseDate = newPost.releaseDate;
    post.duration = newPost.duration;
    post.genre = newPost.genre;
    post.synopsis = newPost.synopsis;

    post.save((err, saved) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ post: saved });
    });
  });
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function getPost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });
  });
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deletePost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(() => {
      res.status(200).end();
    });
  });
}
