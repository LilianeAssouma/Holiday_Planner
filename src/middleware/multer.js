import multer from "multer";

 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(req);
        cb(null, 'tour_assets/');                             // where uploaded files will be stored
      },
      filename: function (req, file,cb){
        cb(null, file.originalname)
      }
})


 const upload = multer({ dest: "tour_assets", storage: storage });                // Create Multer instance with specified storage options
export const uploaded = upload.single('backdropImage')



