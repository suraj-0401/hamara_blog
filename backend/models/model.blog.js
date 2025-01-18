import mongoose from 'mongoose';
const blogSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  blogImage: {
    public_id:{
        type:String,
        required:true,
    },
    url:{
        type:String,
        required:true,
    }
  },
  about: {
    type: String,
    required: true,
  },
  adminName:{
    type:String,
    required:false,
  },
  adminImage:{
    type:String,
    required:false,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref:"User",
    required:true,
  },
});

const Blog = mongoose.model('Blog', blogSchema);

// Export the User model
export { Blog };
