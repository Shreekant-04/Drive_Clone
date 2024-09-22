const File = require("../models/File");
const { getBucket } = require("./downloadController");


exports.deleteFile = async (req, res) => {
  const { filename } = req.params;

  let bucket = getBucket();
  if (!bucket) {
    return res.status(500).send('MongoDB not connected yet!');
  }

  try {
    // Check if the file exists
    const fileExists = await bucket.find({ filename : filename }).toArray();

    if (fileExists.length === 0) {
      return res.status(404).send('File not found.');
    }

    // Delete the file from GridFS
    await bucket.delete(fileExists[0]._id);
    
    // // Delete the document from the File collection
    await File.deleteOne({ storedName: filename });
    
    res.status(200).send('File deleted successfully.');
  } catch (err) {
    console.error('Error deleting file:', err);
    res.status(500).send('Error deleting file.');
  }
};
