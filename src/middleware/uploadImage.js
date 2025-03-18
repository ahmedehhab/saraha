import multer from "multer";

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPG, PNG, and GIF are allowed."));
    }};


const upload=multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});


const uploadImage= upload.single('image');

export default uploadImage;