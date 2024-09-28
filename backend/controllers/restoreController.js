const File = require("../models/File");
const User = require("../models/User");
const Folder = require("../models/Folder");
const { getBucket } = require("./downloadController");

exports.restoreAll = async (req, res) => {
  const { email } = req.query;
  console.log("Restore requested for:", email);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Folder.updateMany(
      { userId: user._id, isTrashed: true },
      { isTrashed: false }
    );
    await File.updateMany(
      { userId: user._id, isTrashed: true },
      { isTrashed: false }
    );

    return res.status(200).json({
      message: "Restore successful",
      email,
    });
  } catch (err) {
    console.error("Error restoring items:", err);
    return res
      .status(500)
      .json({ message: "Failed to restore items", error: err.message });
  }
};

exports.deleteAllTrashedItems = async (req, res) => {
  const { email } = req.query;

  let bucket = getBucket(); // Assume this function sets up GridFS bucket
  if (!bucket) {
    return res.status(500).send("MongoDB not connected yet!");
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const trashedFiles = await File.find({ userId: user._id, isTrashed: true });
    const trashedFolders = await Folder.find({
      userId: user._id,
      isTrashed: true,
    });

    if (trashedFiles.length === 0 && trashedFolders.length === 0) {
      return res
        .status(404)
        .json({ message: "No trashed files or folders found." });
    }

    for (const file of trashedFiles) {
      const fileExists = await bucket
        .find({ filename: file.storedName })
        .toArray();
      if (fileExists.length > 0) {
        await bucket.delete(fileExists[0]._id);
      }
      await File.deleteOne({ _id: file._id });
    }

    await Folder.deleteMany({
      userId: user._id,
      isTrashed: true,
    });

    return res.status(200).json({
      message: "All trashed files and folders deleted successfully.",
    });
  } catch (err) {
    console.error("Error deleting trashed files and folders:", err);
    return res
      .status(500)
      .json({ message: "Error deleting trashed items.", error: err.message });
  }
};
