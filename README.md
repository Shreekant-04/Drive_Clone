# Drive

## Description
The **Drive** app is a file storage and management system that allows users to upload, manage, share, and organize their files efficiently. It is designed to be user-friendly with features that ensure the safety and accessibility of user data. The app offers secure login with OTP and provides free storage to users.

### Slogan:
**"Is Your Data Secure?"**

---
Demo Link -[Drive](https://drive-clone-frontend.vercel.app/) 

## Pages

- **Landing Page**: The main entry point, introducing the app's features.
- **Home (Your Items & Shared)**: Displays files and folders that belong to the user and those shared with the user.
- **Shared with me**: Lists all items that others have shared with the user.
- **Trash Page**: Shows files and folders deleted by the user that are still recoverable.
- **My Drive (Items Yours)**: Central hub for user’s files and folders.
- **Preview Page**: Allows users to preview files before downloading or sharing.

---

## Features

- **File Management**:
  - Upload Files
  - Create Folders and organize files
  - Upload files into specific folders
  - Update file and folder names
  - Move files to Trash, Delete files permanently, or restore them from Trash
  - Restore all deleted files or delete all permanently
  
- **Sharing**:
  - Share files with other users for collaboration.

- **File Preview**: Preview files before sharing or downloading.
  
- **Search and Organization**:
  - Category-wise items count
  - Search feature to find files or folders easily.

- **Storage**:
  - Provides 500MB of free storage for every user.
  
- **Security**:
  - OTP-based Login and Signup for secure access.

---


# Project Structure and Technologies Used

## Folder Structure

### Backend
```bash
backend/
├── config/
│   ├── connection.js
│   ├── multer.js
├── controllers/
│   ├── authController.js
│   ├── deleteFolderController.js
│   ├── downloadController.js
│   ├── fileController.js
│   ├── folderController.js
│   ├── jwtVerifyController.js
│   ├── previewController.js
│   ├── restoreController.js
│   ├── trashController.js
├── models/
│   ├── file.js
│   ├── folder.js
│   ├── limitation.js
│   ├── user.js
├── routes/
│   ├── authRoutes.js
│   ├── deleteRoutes.js
│   ├── downloadRoutes.js
│   ├── fileRoutes.js
│   ├── folderRoutes.js
│   ├── previewRoutes.js
│   ├── trashRoutes.js
│   ├── restoreRoutes.js
```

### Frontend
```bash
frontend/
├── public/
│   ├── Logo/
├── src/
│   ├── pages/
│   ├── routes/
│   ├── utils/
├── App.jsx
├── app.css
├── main.jsx
├── index.html
├── tailwind.config.js
├── vite.config.js
```

### Environment Variables (.env)
```bash
MONGO_URL=<your-mongo-url>
EMAIL_USER=<your-email-user>
EMAIL_PASS=<your-email-password>
JWT_SECRET=<your-jwt-secret>
PORT=<your-port-number>
```

## Technologies Used

### Frontend:
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Vite**: A fast build tool and development server for modern web projects.

### Backend:
- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web framework for Node.js to build APIs and web applications.
- **MongoDB**: NoSQL database for storing user data and file metadata.

### Storage:
- **Multer**: Middleware for handling `multipart/form-data`, used for file uploads.
- **MongoDB**: For storing metadata related to files and users.

### Security:
- **JWT (JSON Web Token)**: For handling user authentication and session management.

### File Preview & Management:
- **Custom Controllers**: Built with Express.js for handling file uploads, downloads, and sharing.

