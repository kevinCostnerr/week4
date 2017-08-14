import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
  movieTitle: { type: 'String', required: true },
  releaseDate: { type: 'String', required: true },
  duration: { type: 'String', required: true },
  genre: { type: 'String', required: true },
  synopsis: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
});

export default mongoose.model('Post', postSchema);
