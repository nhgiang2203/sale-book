import mongoose from "mongoose";
import slug from "mongoose-slug-updater";
mongoose.plugin(slug)

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  thumbnail: String,
  topicId: String,
  purchase: {
    type: Number,
    default: 0
  },
  publisher: String,
  description: String,
  status: String,
  slug: {
    type: String,
    slug: "title",
    unique: true
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Book = mongoose.model('Book', bookSchema, 'books');
export default Book;