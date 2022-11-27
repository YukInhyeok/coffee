const Coffee = require('./device.model.js');

// 새로운 커피 등록하기
exports.create = (req, res) => {
  const contact = new Coffee({ 
    coffeeId: req.body.coffeeId,
    name: req.body.name,
    price: req.body.price,
    feature: req.body.feature
  });
  
  //데이터베이스에 새로운 커피 추가하기
  contact.save()
  .then(data => { res.send(data); })
  .catch(err => { 
    res.status(500).send({ message: err.message}); 
  });
};


//모든 커피 검색
exports.findAll = (req, res) => {
  Coffee.find()
  .then( contacts => { 
	res.send(contacts);
	console.log(contacts)	//test log
	  })
  .catch(err => { 
    res.status(500).send({ message: err.message }); 
  });
};

//특정한 커피 검색
exports.findOne = (req, res) => {
  Coffee.find({coffeeId : req.params.coffeeId})
  .then( contact => {
    if(!contact){
      return res.status(404).send({
        message: req.params.coffeeId + "에 해당하는 커피가 없습니다." }); 
    }
    res.send(contact);
  }).catch(err => { 
    return res.status(500).send({ message: req.params.coffeeId +" 로 검색 중 에러 발생" });
  });  
};

//업데이트
exports.update = (req, res) => { 
    $socket.emit('smart',{data:"1"});
  Coffee.findOneAndUpdate( {coffeeId:req.params.coffeeId}, 
    { coffeeId: req.body.coffeeId, name:req.body.name, price:req.body.price, feature:req.body.feature}, 
    {new:true}
  )
  .then(contact => { 
    if(!contact) {
      return res.status(404).send({ message: req.params.coffeeId +
        "에 해당하는 커피가 발견되지 않았습니다." })
    }
    res.send(contact);
  }).catch(err => { 
    return res.status(500).send({ message: err.message });
  });
};

//삭제
exports.delete = (req, res) => {
  Coffee.findOneAndDelete({coffeeId:req.params.coffeeId})
  .then(contact => {
    if(!contact) {
      return res.status(404).send({ message: req.params.coffeeId +"에 해당하는 커피가 없습니다." })
    }
    res.send({ message: "정상적으로 " + req.params.coffeeId + " 커피가 삭제되었습니다." })
  })
  .catch(err => {
    return res.status(500).send({ message: err.message }); 
  });
};








