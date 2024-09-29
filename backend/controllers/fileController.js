const File = require("../models/File");
const { upload } = require("../config/multer");
const Limit = require("../models/Limitation");
const User = require("../models/User");

exports.uploadFile = (req, res) => {
  upload.single("file")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { filename: storedName, mimetype: type, size } = req.file;
    const { fileName, folderId } = req.body;
    const userId = req.user.id;
    const anyone = false;

    try {
      const file = new File({
        storedName,
        fileName,
        type,
        size,
        userId,
        anyone,
        folderId,
      });

      await file.save();
      res.status(200).json({ message: "File uploaded successfully", file });
    } catch (error) {
      console.error("Error saving file metadata:", error);
      res.status(500).json({ error: "Failed to save file metadata" });
    }
  });
};

exports.getFile = async (req, res) => {
  const files = await File.find({ userId: req.user.id, isTrashed: false });
  if (files) {
    res.status(200).json(files);
  } else {
    res.status(404).json({ error: "No Files Exists" });
  }
};

exports.getLimit = async (req, res) => {
  const limit = await Limit.findOne();
  if (limit) {
    res.status(200).json(limit);
  } else {
    res.status(404).json({ error: "Something Went Wrong" });
  }
};

exports.changeFileState = async (req, res) => {
  try {
    const userId = req.user.id;

    const { state } = req.body;

    const { filename } = req.params;

    const file = await File.findOneAndUpdate(
      { storedName: filename, userId },
      { anyone: state },
      { new: true }
    );

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    return res.status(200).json({ message: "Successfully updated", file });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

exports.secureFile = async (req, res) => {
  try {
    const { filename } = req.params;
    const userId = req.user.id; // Current user's ID
    const { users } = req.body; // Expecting 'users' to be a comma-separated string of emails

    // Split the users string by commas to get an array of emails
    const userEmails = users.split(",");

    // Find the user IDs based on the emails
    const userRecords = await User.find({ email: { $in: userEmails } }).select(
      "_id email"
    );

    if (userRecords.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found for the provided emails" });
    }

    // Prepare userId and email pairs
    const userIdEmailPairs = userRecords.map((user) => ({
      userId: user._id,
      email: user.email,
    }));

    // Replace the 'shared' array with new user ID and email pairs
    const file = await File.findOneAndUpdate(
      { storedName: filename, userId: userId }, // Verify ownership
      {
        shared: userIdEmailPairs, // Replace the shared array with the new one
      },
      { new: true } // Return the updated document
    );

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.status(200).json({ message: "File shared successfully!", file });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while sharing the file" });
  }
};

exports.sharedFile = async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const files = await File.find({ "shared.email": email });

    if (files.length === 0) {
      return res
        .status(200)
        .json({ message: "No files found for the provided email" });
    }

    return res.status(200).json({ message: "Files found", files });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Edit file name
exports.updateFileName = async (req, res) => {
  try {
    const { fileId } = req.params;
    const { newFileName } = req.body;

    const file = await File.findOneAndUpdate(
      { _id: fileId, userId: req.user.id },
      { fileName: newFileName, lAccess: Date.now(), lName: req.user.name },
      { new: true }
    );

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.status(200).json({
      message: "File name updated successfully",
      file: {
        _id: file._id,
        fileName: file.fileName,
        storedName: file.storedName,
        type: file.type,
        size: file.size,
        lAccess: file.lAccess,
        lName: file.lName,
        folderId: file.folderId,
        userId: file.userId,
        anyone: file.anyone,
        shared: file.shared,
      },
    });
  } catch (error) {
    console.error("Error updating file name:", error);
    res
      .status(500)
      .json({ message: "Failed to update file name", error: error.message });
  }
};
