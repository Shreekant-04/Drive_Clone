const Folder = require("../models/Folder");
const File = require("../models/File");

exports.trashFolder = async (req, res) => {
  try {
    const { folderId } = req.params;

    const folder = await Folder.findById(folderId);
    if (!folder) {
      return res.status(404).json({ message: "Folder not found!" });
    }

    await Folder.findByIdAndUpdate(folderId, { isTrashed: true });

    await File.updateMany({ folderId }, { isTrashed: true });

    return res
      .status(200)
      .json({ message: "Folder and files trashed successfully!" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Could not trash folder." });
  }
};
exports.restoreFolder = async (req, res) => {
  try {
    const { folderId } = req.params;

    const folder = await Folder.findById(folderId);
    if (!folder) {
      return res.status(404).json({ message: "Folder not found!" });
    }
    if (!folder.isTrashed) {
      return res.status(400).json({ message: "Folder is not trashed!" });
    }

    await Folder.findByIdAndUpdate(folderId, { isTrashed: false });

    await File.updateMany({ folderId }, { isTrashed: false });

    return res
      .status(200)
      .json({ message: "Folder and files restored successfully!" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Could not restore folder." });
  }
};

exports.getTrashedFolder = async (req, res) => {
  try {
    const trashedFolders = await Folder.find({
      userId: req.user.id,
      isTrashed: true,
    });
    if (!trashedFolders || trashedFolders.length === 0) {
      return res.status(200).json({ message: "No trashed folders found" });
    }
    res.status(200).json(trashedFolders);
  } catch (error) {
    console.error("Error retrieving trashed folders:", error);
    res
      .status(500)
      .json({ message: "Failed to retrieve trashed folders", error });
  }
};

exports.getTrashFile = async (req, res) => {
  const files = await File.find({ userId: req.user.id, isTrashed: true });
  if (files) {
    res.status(200).json(files);
  } else {
    res.status(404).json({ error: "No Files Exists" });
  }
};

exports.trashFile = async (req, res) => {
  try {
    const { filename } = req.params;
    console.log(filename)

    const file = await File.findOneAndUpdate(
      { storedName: filename },
      { isTrashed: true },
      { new: true }
    );

    if (!file) {
      console.log("File not found!");
      return res.status(404).json({ message: "File not found!" });
    }
    return res
      .status(200)
      .json({ message: "File trashed successfully!", file });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Could not trash file." });
  }
};

exports.restoreFile = async (req, res) => {
  try {
    const { filename } = req.params;

    const file = await File.findOneAndUpdate(
      {
        storedName: filename,
      },
      { isTrashed: false },
      { new: true }
    );

    if (file.folderId) {
      await Folder.findOneAndUpdate(
        {
          _id: file.folderId,
        },
        { isTrashed: false },
        { new: true }
      );
    }

    if (!file) {
      return res.status(404).json({ message: "File not found!" });
    }

    return res
      .status(200)
      .json({ message: "File restored successfully!", file });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Could not restore file." });
  }
};
