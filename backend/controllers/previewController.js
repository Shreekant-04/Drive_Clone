const File = require("../models/File");
const { getBucket } = require("./downloadController");

exports.getPreview = async (req, res) => {
  const { filename } = req.params;
  const bucket = getBucket();
  const file = await File.findOne({ storedName: filename });
  if (!bucket) {
    return res.status(500).json({ error: "Bucket not initialized" });
  }
  if (!file) {
    return res.status(404).json({ error: "file not found" });
  }
  const downloadStream = bucket.openDownloadStreamByName(filename);

  res.setHeader("Content-Type", file.type); // You can set the correct MIME type based on the file type if known

  downloadStream.pipe(res).on("error", (error) => {
    res.status(500).send({ error: "Error while streaming file" });
  });
};
