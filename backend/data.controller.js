const devData = require('./data.model.js');

// 새로운 커피 추가하기
exports.create = (req, res) => {
  const sample = new devData({ 
    coffeeId: req.body.coffeeId,
    price: req.body.price,
    feature: req.body.feature,
    period: req.body.period
  });
  
  //데이터베이스에 새로운 커피 저장하기 
  sample.save()
  .then(data => { res.send(data); })
  .catch(err => { 
    res.status(500).send({ message: err.message}); 
  });
};


//모든 커피 검색
exports.findAll = (req, res) => {
  devData.find()
  .then( samples => { 
	res.send(samples);
	console.log(samples)	//test log
	  })
  .catch(err => { 
    res.status(500).send({ message: err.message }); 
  });
};

//특정한 커피 검색
exports.findOne = (req, res) => {
    devData.find({coffeeId : req.params.coffeeId})
  .then( samples => {
    if(!samples){
      return res.status(404).send({
        message: req.params.coffeeId + "에 해당하는 커피가 없습니다." }); 
    }
    res.send(samples);
  }).catch(err => { 
    return res.status(500).send({ message: req.params.coffeeId +" 로 검색 중 에러 발생" });
  });  
};

