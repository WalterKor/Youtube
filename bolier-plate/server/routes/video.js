const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");
const multer = require('multer');
const { auth } = require("../middleware/auth");
var ffmpeg = require('fluent-ffmpeg');


//==================================
//     Storege Multer Config
//==================================
let storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "uploads/");
    },
    filename: (req, file, cb)=>{
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb)=>{
        const ext = path.extname(file.originalname)
        if(ext !== '.mp4'){
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false)
        }
        cb(null, true)
    }
});

const upload = multer({ storage: storage}).single("file");

//=================================
//             Video
//=================================
router.post('/uploadfiles', (req, res)=>{

    //비디오를 서버에 저장한다. 
    upload(req, res, err=>{
        if(err){
            return res.json({success: false, err})
        }
        return res.json({success: true, url: res.req.file.path, fileName: res.req.file.filename})
    })

});

router.post('/thumbnail', (req, res)=>{

    let filePath = "";
    let fileDuration = "";


    //비디오 정보 가져오기 
    ffmpeg.ffprobe(req.body.url, function (err, metadata) {
        console.dir(metadata);
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration
    })


    //썸네일 생성
    ffmpeg(req.body.url)
    .on('filenames', function (filenames) {
        filePath = "uploads/thumbnails/" + filenames[0]
    })
    .on('end', function () {
        return res.json({ success: true, url: filePath, fileDuration: fileDuration})
    })
    .on('error', function (err) {
        return res.json({ success: false, err})
    })
    .screenshots({
        count:1,
        folder: 'uploads/thumbnails',
        size: '320x240',
        filename: 'thumbnail-%b.png'
    })
    
});

//========================================
//           서버에 저장하기
//========================================
router.post('/uploadVideo', (req, res)=>{

    //비디오를 정보들을 저장한다.
    const video = new Video(req.body)
    video.save((err, doc)=>{
        if(err) return res.json({success: false, err})
        res.status(200).json({success: true})
    })
});

//========================================
//           비디오 가져오기
//========================================
router.get('/getVideos', (req, res)=>{
    //비디오를 DB에서 가져와서 클라이언트에 보낸다.
    Video.find()
        .populate('writer')
        .exec((err, videos)=>{
            if(err) return res.status(400).send(err);
            res.status(200).json({success: true, videos})
        })
});



module.exports = router;
