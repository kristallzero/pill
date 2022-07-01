import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  pills: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Pill'
    }
  ]
});

export default model('User', userSchema);