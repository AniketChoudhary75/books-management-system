import mongoose from "mongoose";


const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      requred: true
    },

    author: {
      type: String,
      required: true
    },
    publisherYear: {
      type: String,
      required: true,

    },

  },
  {
    timestamps: true,

  })

export const Book = mongoose.model('Book', bookSchema);