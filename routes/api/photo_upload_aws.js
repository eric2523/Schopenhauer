const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const keys = require("../../config/keys");
const BUCKET_NAME = keys.BUCKET_NAME;

const s3 = new AWS.S3({
  accessKeyId: keys.AWSaccessKeyId,
  secretAccessKey: keys.AWSsecretAccessKey,
  region: "us-west-2",
});

const fileFilter = (req, file, cb) => {
  console.log(file.mimetype);
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/gif" || file.mimetype === "image/png") cb(null, true);
  else cb(new Error("Invalid file type, only jpeg, gift, or png allowed!"), false);
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: "public-read",
    s3,
    bucket: BUCKET_NAME,
    content: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}` + "-" + file.originalname);
    },
  }),
});

module.exports = upload;
