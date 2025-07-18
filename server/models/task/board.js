const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    isImage: {
      type: Boolean,
      default: true,
    },
    backgroundImageLink: {
      type: String,
      required: true,
    },
    activity: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        name: {
          type: String,
        },
        action: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        edited: {
          type: Boolean,
          default: false,
        },
        cardTitle: {
          type: String,
          default: "",
        },
        actionType: {
          type: String,
          default: "action",
        },
        color: {
          type: String,
        },
      },
    ],
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        name: {
          type: String,
        },
        surname: {
          type: String,
        },
        email: {
          type: String,
        },
        role: {
          type: String,
          default: "member",
        },
        color: {
          type: String,
        },
      },
    ],
    lists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "list",
      },
    ],
  },
  { timestamps: true }
);

const Board = mongoose.model("Board", BoardSchema);

module.exports = Board;
