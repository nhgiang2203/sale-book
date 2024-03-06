import mongoose from "mongoose";
import slug from "mongoose-slug-updater";
mongoose.plugin(slug);

const topicSchema = new mongoose.Schema({
  title: String,
  thumbnail: String,
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

const Topic = mongoose.model('Topic', topicSchema, 'topics');
export default Topic;
