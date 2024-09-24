const jwt = require("jsonwebtoken");
const File = require("../models/File");
const { getBucket } = require("./downloadController");

exports.getPreview = async (req, res) => {
  const { filename } = req.params;
  const bucket = getBucket();

  // Check if the bucket is initialized
  if (!bucket) {
    return res.status(500).json({ error: "Bucket not initialized" });
  }

  // Find the file by its stored name
  const file = await File.findOne({ storedName: filename });
  if (!file) {
    return res.status(404).json({ error: "File not found" });
  }

  // If the file is not public (anyone: false), validate the user's access
  if (!file.anyone) {
    const authHeader = req.header("Authorization");

    // Check if the Authorization header is missing
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(" ")[1];


    // Check if the token is null, undefined, or an empty string
    if (!token || token.trim() === "" || token === null) {
      return res.status(401).json({ message: "Token is missing or empty" });
    }

    let verified;

    try {
      verified = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const userId = verified.id;

    // Check if the user is the owner or shared with them
    if (file.userId.toString() !== userId) {
      const isShared = file.shared.some(sharedUser => sharedUser.userId.toString() === userId);
      if (!isShared) {
        return res.status(403).json({ error: "You do not have permission to access this file" });
      }
    }
  }

  // Stream the file from the bucket
  const downloadStream = bucket.openDownloadStreamByName(filename);

  // Set the correct Content-Type header
  res.setHeader("Content-Type", file.type);

  // Pipe the download stream to the response
  downloadStream.pipe(res).on("error", (error) => {
    console.error("Error while streaming file:", error);
    res.status(500).send({ error: "Error while streaming file" });
  });
};
