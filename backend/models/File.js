const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  storedName: { type: String, required: true },
  fileName: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: Number, required: true },
  lAccess: { type: Date, default: Date.now },
  lName: { type: String, required: false },
  folderId: { type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  anyone:{type:Boolean},
  shared:[
    {
      userId:{type:String},
      email: {type:String}

    }
    
  ]
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
