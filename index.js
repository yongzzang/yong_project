const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const {User} = require("./Model/User");
const config = require("./config/key");

//application/x-www-forim-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
//DB연결
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: false
}).then(()=> console.log('MongoDb Connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!, 텍스트 바꾸기 ㅋㅋㄹㅃㅃ')
})

app.post('/register', (req,res)=> {
  //회원 가입 할때 필요한 정보들을 client에서 가져오면
  //그것들을 DB에 넣어준다.
 
  const user = new User(req.body)

  user.save((err,userInfo)=> {
    if(err) return res.json({success: false, error})
    return res.status(200).json({
      success:true
    })
  })


})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})