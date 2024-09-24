const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  folderName: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Folder = mongoose.model("Folder", folderSchema);

module.exports = Folder;
