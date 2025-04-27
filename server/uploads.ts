import path from 'path';
import fs from 'fs';
import multer from 'multer';
import sharp from 'sharp';
import { Request, Response, NextFunction } from 'express';

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), 'public/uploads/profile');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    // Create a unique filename with timestamp and original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `profile-${uniqueSuffix}${ext}`);
  }
});

// Filter for image files only
const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

// Create multer upload instance
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  }
});

// Process the uploaded image (resize, optimize)
export const processProfileImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return next();
    }

    const filePath = req.file.path;
    const processedFileName = path.basename(filePath, path.extname(filePath)) + '.webp';
    const processedFilePath = path.join(uploadDir, processedFileName);

    // Resize and convert to webp for optimization
    await sharp(filePath)
      .resize(256, 256, { fit: 'cover' })
      .webp({ quality: 90 })
      .toFile(processedFilePath);

    // Delete the original file
    fs.unlinkSync(filePath);

    // Update req.file with the new path
    req.file.path = processedFilePath;
    req.file.filename = processedFileName;
    
    // Add the URL to the processed image to the request
    const fileUrl = `/uploads/profile/${processedFileName}`;
    (req as any).fileUrl = fileUrl;

    next();
  } catch (error) {
    next(error);
  }
};