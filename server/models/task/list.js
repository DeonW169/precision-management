const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "card",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "board",
  },
});

const List = mongoose.model("List", ListSchema);

module.exports = List;
