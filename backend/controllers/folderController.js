const Folder = require("../models/Folder");
const File = require("../models/File");

// Create a folder
exports.createFolder = async (req, res) => {
  const { folderName } = req.body;

  const userId = req.user.id;

  try {
    const folder = new Folder({ folderName, userId });
    await folder.save();
    res.status(201).json({ message: "Folder created successfully", folder });
  } catch (error) {
    console.error("Error creating folder:", error);
    res.status(500).json({ error: "Failed to create folder" });
  }
};

// Get all folders for the user
exports.getFolders = async (req, res) => {
  try {
    const folders = await Folder.find({ userId: req.user.id });
    if (!folders || folders.length === 0) {
      return res.status(200).json({ message: "No folders found" });
    }
    res.status(200).json(folders);
  } catch (error) {
    console.error("Error retrieving folders:", error);
    res.status(500).json({ message: "Failed to retrieve folders", error });
  }
};



// Get files in a selected folder
exports.getFilesInFolder = async (req, res) => {
  const folderId = req.params.folderId;
  const userId = req.user.id;

  try {
    // Check if the folder exists and belongs to the user
    const folder = await Folder.findOne({ _id: folderId, userId });

    if (!folder) {
      return res.json({ message: "Folder not found or access denied" });
    }

    // Find files associated with the given folder ID and user ID
    const files = await File.find({ folderId, userId });
    if (!files || files.length === 0) {
      return res
        .status(200)
        .json({ message: "No files found in this folder", files: [] });
    }

    res.status(200).json(files);
  } catch (error) {
    console.error("Error retrieving files in folder:", error);
    res.status(500).json({ message: "Failed to retrieve files", error });
  }
};

// Delete folder and its files
exports.deleteFolder = async (req, res) => {
  const { folderId } = req.params;

  try {
    // Delete all files in the folder
    await File.deleteMany({ folderId: folderId });

    // Delete the folder
    await Folder.findByIdAndDelete(folderId);

    res.status(200).json({ message: "Folder and files deleted successfully!" });
  } catch (error) {
    console.error("Error deleting folder:", error);
    res.status(500).json({ message: "Failed to delete folder and files." });
  }
};
