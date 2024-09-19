const File = require('../models/File');
const { upload } = require('../config/multer');
const Limit = require('../models/Limitation');

exports.uploadFile = (req, res) => {
  upload.single('file')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

   
    const { filename: storedName, mimetype: type, size } = req.file;
    const { fileName } = req.body;
    const userId = req.user.id;

    try {
      const file = new File({
        storedName,
        fileName,
        type,
        size,
        userId,
      });

      await file.save();
      res.status(200).json({ message: 'File uploaded successfully', file });
    } catch (error) {
      console.error('Error saving file metadata:', error);
      res.status(500).json({ error: 'Failed to save file metadata' });
    }
  });
};

exports.getFile = async (req,res)=>{
    
    const files = await File.find({userId : req.user.id})
    if(files){
        res.status(200).json(files)
    } else {
        res.status(404).json({error : "No Files Exists"})
    }
    
    

}

exports.getLimit = async (req,res)=>{
    const limit = await Limit.findOne()
    if(limit){
        res.status(200).json(limit)
    } else {
        res.status(404).json({error : "Something Went Wrong"})
    }
    
    

}