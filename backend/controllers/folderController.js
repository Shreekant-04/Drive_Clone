const Folder = require("../models/Folder");

// Create a folder
exports.createFolder = async (req, res) => {
  const { folderName } = req.body;
  console.log(folderName);
  
  const userId = req.user.id; // Assuming you're getting the user ID from the token

  try {
    const folder = new Folder({ folderName, userId });
    await folder.save();
    res.status(201).json({ message: "Folder created successfully", folder });
  } catch (error) {
    console.error("Error creating folder:", error);
    res.status(500).json({ error: "Failed to create folder" });
  }
};

// Add file to a folder
exports.addFileToFolder = async (req, res) => {
  const { folderId, fileId } = req.body;

  try {
    const folder = await Folder.findById(folderId);
    if (!folder) {
      return res.status(404).json({ error: "Folder not found" });
    }

    if (!folder.fileIds.includes(fileId)) {
      folder.fileIds.push(fileId);
      await folder.save();
    }

    res
      .status(200)
      .json({ message: "File added to folder successfully", folder });
  } catch (error) {
    console.error("Error adding file to folder:", error);
    res.status(500).json({ error: "Failed to add file to folder" });
  }
};
