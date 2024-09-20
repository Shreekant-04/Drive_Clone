const { MongoClient, GridFSBucket } = require('mongodb');
const mongoURI = process.env.MongoUrl;
let db,bucket
MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
     db = client.db();
     bucket = new GridFSBucket(db, {
      bucketName: 'uploads' 
    });


    console.log('Connected to database and created GridFSBucket');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });

  exports.downloadFile = (req, res) => {
    const { filename } = req.params;
    if (!bucket) {
      return res.status(500).send('MongoDB not connected yet!');
    }
  
    const downloadStream = bucket.openDownloadStreamByName(filename);
    downloadStream.on('error', (err) => {
      console.error('Error downloading file:', err);
      res.status(404).send('File not found or download error.');
    });
  
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    downloadStream.pipe(res);
  }