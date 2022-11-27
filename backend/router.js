module.exports = (app) => {
  const coffees = require('./device.controller.js');  //contact.controller.js를 로딩
  const datas = require('./data.controller.js');  //contact.controller.js를 로딩

  app.get('/coffees', coffees.findAll);             //모든 장치 검색
  app.get('/coffees/:coffeeId', coffees.findOne);  //특정 장치 검색
  app.post('/coffees',coffees.create);             //새로운 장치 추가
  app.put('/coffees/:coffeeId', coffees.update);   //특정 장치 업데이트
  app.delete('/coffees/:coffeeId', coffees.delete); //특정 장치 삭제
  app.post('/datas', datas.create);  //장치 데이터 업로드
  app.get('/datas/:coffeeId', datas.findOne ); //특정 장치의 데이터 검색
}
