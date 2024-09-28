const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  storedName: { type: String, required: true },
  fileName: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: Number, required: true },
  lAccess: { type: Date, default: Date.now },
  lName: { type: String, required: false },
  folderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    default: null,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  anyone: { type: Boolean, default: false },
  shared: [
    {
      userId: { type: String },
      email: { type: String },
    },
  ],
  isTrashed: { type: Boolean, default: false },
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
