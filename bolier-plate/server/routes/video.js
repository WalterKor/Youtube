const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");
const multer = require('multer');
const { auth } = require("../middleware/auth");
var ffmpeg = require('fluent-ffmpeg');
const { Subscriber } = require('../models/Subscriber');


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
//    랜딩화면에 보여질 비디오 가져오기
//========================================
router.get('/getVideos', (req, res)=>{
    //비디오를 DB에서 가져와서 클라이언트에 보낸다.
    Video.find()
        .populate('writer')
        .sort({ "_id": -1 })
        .exec((err, videos)=>{
            if(err) return res.status(400).send(err);
            res.status(200).json({success: true, videos})
        })
});

//========================================
//     디테일페이지 비디오정보 가져오기
//========================================
router.post("/getVideo", (req, res) => {
    console.log
    Video.findOne({ "_id" : req.body.videoId })
    .populate('writer')
    .exec((err, video) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, video })
    })
});

//========================================
//     구독페이지 동영상 가져오기
//========================================

router.post("/getSubscriptionVideos", (req, res) => {

    Subscriber.find({ 'userFrom': req.body.userFrom })
    .exec((err, subscribers)=> {
        if(err) return res.status(400).send(err);

        let subscribedUser = [];

        subscribers.map((subscriber, i)=> {
            subscribedUser.push(subscriber.userTo)
        })


        //Need to Fetch all of the Videos that belong to the Users that I found in previous step. 
        Video.find({ writer: { $in: subscribedUser }})
            .populate('writer')
            .exec((err, videos) => {
                if(err) return res.status(400).send(err);
                res.status(200).json({ success: true, videos })
            })
    })

});




module.exports = router;
