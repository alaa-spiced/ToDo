const knox = require("knox");
const fs = require("fs");
<<<<<<< HEAD

let secrets;
=======
const AWS = require('aws-sdk');

let secrets;
var s3 = new AWS.S3();
>>>>>>> 9815ea825ef8247ee5b5894d92eba2f74f299f0c

if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // secrets.json is in .gitignore
}

const client = knox.createClient({
    key: secrets.AWS_KEY,
    secret: secrets.AWS_SECRET,
    bucket: "spicedling"
});

exports.deleteUserImagesS3 = function (images) {
    client.deleteMultiple(images, (err , res)=>{

    });
};

exports.upload = function(req, res, next) {
    if (!req.file) {
        return res.json({
            error: true
        });
    }
    const s3Request = client.put(req.file.filename, {
        "Content-Type": req.file.mimetype,
        "Content-Length": req.file.size,
        "x-amz-acl": "public-read"
    });

    const readStream = fs.createReadStream(req.file.path);
    readStream.pipe(s3Request);
    s3Request.on("response", s3Response => {
        if (s3Response.statusCode == 200) {
            next();
            fs.unlink(req.file.path, () => {});
        } else {
            return res.json({
                error: true
            });
        }
    });
};
