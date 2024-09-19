const checkFile = async (files) => {
  const MIME_TYPES = {
    documents: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.oasis.opendocument.text",
      "text/rtf",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.oasis.opendocument.spreadsheet",
      "text/csv",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.oasis.opendocument.presentation",
      "text/markdown",
      "application/epub+zip",
      "application/x-xps-document",
      "application/postscript"
    ],
    videos: [
      "video/mp4",
      "video/x-matroska",
      "video/webm",
      "video/avi",
      "video/mpeg",
      "video/quicktime"
    ],
    images: [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/svg+xml",
      "image/webp",
      "image/bmp",
      "image/tiff"
    ]
  };

  const categories = {
    image: { count: 0, size: 0 },
    video: { count: 0, size: 0 },
    document: { count: 0, size: 0 },
    other: { count: 0, size: 0 }
  };

  files.forEach(({ fileType, size }) => {
    if (MIME_TYPES.documents.includes(fileType)) {
      categories.document.count++;
      categories.document.size += size;
    } else if (MIME_TYPES.videos.includes(fileType)) {
      categories.video.count++;
      categories.video.size += size;
    } else if (MIME_TYPES.images.includes(fileType)) {
      categories.image.count++;
      categories.image.size += size;
    } else {
      categories.other.count++;
      categories.other.size += size;
    }
  });

  return Object.keys(categories).map(type => ({
    type,
    quantity: categories[type].count,
    totalSize: categories[type].size
  }));
};
  
  const checkType = async (fileType) => {
    const MIME_TYPES = {
      documents: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.oasis.opendocument.text",
        "text/rtf",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.oasis.opendocument.spreadsheet",
        "text/csv",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.oasis.opendocument.presentation",
        "text/markdown",
        "application/epub+zip",
        "application/x-xps-document",
        "application/postscript"
      ],
      videos: [
        "video/mp4",
        "video/x-matroska",
        "video/webm",
        "video/avi",
        "video/mpeg",
        "video/quicktime"
      ],
      images: [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/svg+xml",
        "image/webp",
        "image/bmp",
        "image/tiff"
      ]
    };

    if (MIME_TYPES.documents.includes(fileType)) return 'Document';
    if (MIME_TYPES.videos.includes(fileType)) return 'Video';
    if (MIME_TYPES.images.includes(fileType)) return 'Image';
    return 'Other';
  };

  export { checkFile, checkType }
  