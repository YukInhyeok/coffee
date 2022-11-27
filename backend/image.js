var multer = require('multer');
var fs = require('fs');

// multer을 이용해 파일 업로드 기능 구현
var storage = multer.diskStorage({
    destination: function (req, file, cb) {	// 경로 => uploads 폴더
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {	// 파일명 => 이미지 업로드시 원본 이름 그대로
        cb(null, file.originalname);
    }
})
var upload = multer({ storage: storage });
// 글 작성 페이지에서 이미지를 올리면 실행되게 되는 부분
router.post('/imagesave', upload.array('filelist'), function(req, res) {
    // 전송된 formdata의 filelist에 해당하는 value 값들을 multer을 통해 저장
        var i, newname;
        db.content.findOne({	// 새 글 작성시 기존에 있던 가장 큰 id+1로 자동 저장됨으로 가장 큰 id를 찾아줌
            limit: 1,
            order: [['id', 'DESC']],
            raw:true,
        }).then(result => {
            newname = result.id;
            for(i=0;i<req.files.length;i++) {
                fs.renameSync(req.files[i].path, 'uploads/'+(newname+1)+'-'+(i+1)+'.png');
                // 위에서 이미지이름을 원본으로 저장해줬었는데 file system을 통해 이름을 바꿔주는 작업
            }
            return res.status(200).json({message:'이미지업로드완료!'});
        }).catch(err => {
            console.log(err);
            return res.status(404).json({message: '에러뜸'});
        })
    });