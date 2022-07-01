import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const pillSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  dosage: {
    type: Number,
    required: true
  },
  taking: {
    type: String,
    required: true
  },
  parsedTaking: String,
  time: {
    type: Number,
    required: true,
  },
  eating: [
    {
      type: String,
      required: true
    }
  ]
});

export default model('Pill', pillSchema);