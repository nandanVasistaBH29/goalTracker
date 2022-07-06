import mongoose from 'mongoose';
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please Enter Your Name'],
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please add your fake email at least'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter password as password'],
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model('User', userSchema);
