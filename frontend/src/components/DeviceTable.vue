<template>
  <div id="app">
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{dialogTitle}}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="번호" v-model="coffeeInfo.coffeeId" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="커피"  v-model="coffeeInfo.name" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="가격"  v-model="coffeeInfo.price" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="특징"  v-model="coffeeInfo.feature" required></v-text-field>
                </v-flex>                
                <v-flex xs12>
                  <v-text-field label="등록일"  v-model="coffeeInfo.register_date" required></v-text-field>
                </v-flex> 
              </v-layout>
            </v-container>
          </v-card-text>

          <!-- 이미지 업로드 -->
<v-file-input class="input" type="file" counter show-size label="이미지 제출(여러개 가능)"
              outlined dense multiple prepend-icon="mdi-camera" style="width: 400px; margin-left: 100px;"
              @change="onImageChange"/>
<v-img v-for="(item,i) in uploadimageurl" :key="i" :src="item.url"
            contain height="150px" width="200px" style="border: 2px solid black; margin-left:100px;"/>

            <!-- 이미지 불러오기 
            <v-img v-for="(item, i) in imagelist" :key="i" :src="require(`../../../back/uploads/${item}`)"
       contain height="150px" width="200px" style="border: 2px solid black; margin-left:100px;"/>
-->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="btnClick($event)">취소</v-btn>
            <v-btn color="blue darken-1" text @click="btnClick($event)">확인</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
	<v-btn color="primary" v-on:click.native="addContact()">추가</v-btn>
	<v-data-table :headers="headers" :items="items" class="elevation-1">
		<template v-slot:item="row">
		<tr>
			<td>{{row.item.coffeeId}}</td>
			<td>{{row.item.name}}</td>
			<td>{{row.item.price}}</td>
			<td>{{row.item.feature}}</td>			
			<td>{{row.item.register_date}}</td>
			<td class="text-xs-right">
				<v-btn color="primary" v-on:click.native="updateContact(row.item)">수정</v-btn>
				<v-btn color="primary" v-on:click.native="deleteContact(row.item)">삭제</v-btn>
				<v-btn color="primary" v-on:click.native="sendEvent(row.item)">보기</v-btn>
			</td>
		</tr>
      </template>
	</v-data-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      urlinfo:'http://localhost:8000/coffees',
      coffeeInfo:{
        _id: null,
        coffeeId: null,
        name:null,
        price:null,
        feature:null,        
        register_date: null
      },
      dialog: false,
      dialogTitle:null,

      headers: [
        { text: '번호', align: 'left', value: 'coffeeId'},
        { text: '커피', align: 'left', value: 'name'},
        { text: '가격', align: 'left',value: 'price'},
        { text: '특징', align: 'left',value: 'feature'},        
		{ text: '등록일', align: 'left', value: 'register_date'},
		{ text: '관리', align: 'left', value: '' },
      ],
      items:[]
    }
  },
  created(){
    axios.get(this.urlinfo) //서버에 요청하기
    .then((res) => {
      console.log(res.data); //성공시
      this.items = res.data;
    })
    .catch((err) => {
      alert('에러 발생: ' + err); //에러 발생
    });
  },
  methods:{
    addContact(){
      this.dialog = true;
      this.dialogTitle = "추가";
      this.coffeeInfo.register_date = Date.now();
    },
    updateContact(data){
      this.dialog = true;
      this.dialogTitle = "수정";
      this.coffeeInfo.coffeeId = data.coffeeId;
      this.coffeeInfo.name = data.name;
      this.coffeeInfo.price = data.price;
      this.coffeeInfo.feature = data.feature;      
      this.coffeeInfo.register_date = data.register_date;
    },
    deleteContact(data){
      this.dialog = true;
      this.dialogTitle = "삭제";
      this.coffeeInfo.coffeeId = data.coffeeId;
      console.log('deleteContact : ' + data);
    },
    sendEvent(data){
      this.$bus.$emit('coffeeSelected',data);
    //  console.log('deleteContact : ' + data);
    },

    btnClick($event){
      this.dialog = false;
      if($event.target.innerHTML == "확인"){
        if(this.dialogTitle =="추가"){ 
          axios.post(this.urlinfo,{ 
            coffeeId: this.coffeeInfo.coffeeId, name: this.coffeeInfo.name, price:  this.coffeeInfo.price,
            feature: this.coffeeInfo.feature,register_date:this.coffeeInfo.register_date
          })
          .then(() => {
            axios.get(this.urlinfo) //서버에 요청하기
            .then((res) => {
              //console.log(res.data); //성공시
              this.items = res.data;
              alert("연락처 추가 성공");
            })
            .catch((err) => {
              alert('에러 발생: ' + err); //에러 발생
            });
            
          })
          .catch((err) => {
            alert('에러 발생: ' + err); //에러 발생
          });          
        }
        else if(this.dialogTitle=="수정"){
          //alert("입력된 정보 : " + "이메일 : " + this.contactInfo.email + " 패스워드 : " + this.contactInfo.password);
          axios.put(this.urlinfo + '/'+ this.coffeeInfo.coffeeId, { 
            coffeeId: this.coffeeInfo.coffeeId, name: this.coffeeInfo.name, price:  this.coffeeInfo.price,
            feature: this.coffeeInfo.feature, register_date:this.coffeeInfo.register_date
          })
          .then(() => {          
            axios.get(this.urlinfo) //서버에 요청하기
            .then((res) => {
              //console.log(res.data); //성공시
              this.items = res.data;
              alert("업데이트 성공");
            })
            .catch((err) => {
              alert('에러 발생: ' + err); //에러 발생
            });
          })
          .catch((err) => {
            alert('에러 발생: ' + err); //에러 발생
          }); 

        }
        else {
          axios.delete(this.urlinfo + '/'+ this.coffeeInfo.coffeeId, { data: { coffeeId: this.coffeeInfo.coffeeId } })
          .then((result) => { 
            console.log("삭제 후" + result); //성공시
            axios.get(this.urlinfo) //서버에 요청하기
            .then((res) => {
              this.items = res.data;
              alert("삭제 성공");
            })
            .catch((err) => {
              alert(' 삭제 후 데이터 가져오는 중 에러 발생: ' + err); //에러 발생
            });            
          })
          .catch((err) => { alert('에러 발생: ' + err); });          

        }
      }
      this.coffeeInfo.coffeeId = null;
      this.coffeeInfo.name = null;
      this.coffeeInfo.price = null;
      this.coffeeInfo.feature = null;      
      this.coffeeInfo.register_date = null;
    }

  },
// 이미지 method
onImageChange(file) {	// v-file-input 변경시
      if (!file) {
        return;
      }
      const formData = new FormData();	// 파일을 전송할때는 FormData 형식으로 전송
      this.uploadimageurl = [];		// uploadimageurl은 미리보기용으로 사용
      file.forEach((item) => {
        formData.append('filelist', item)	// formData의 key: 'filelist', value: 이미지
        const reader = new FileReader();
        reader.onload = (e) => {
          this.uploadimageurl.push({url: e.target.result});
          // e.target.result를 통해 이미지 url을 가져와서 uploadimageurl에 저장
        };
        reader.readAsDataURL(item);
      });
      axios({
        url: "http://localhost:8000/image/imagesave/",	// 이미지 저장을 위해 back서버와 통신
        method: "POST",
        headers: {'Image-Type': 'multipart/form-data'},	// 이걸 써줘야 formdata 형식 전송가능
        data: formData,
      }).then(res => {
        console.log(res.data.message);
        this.imagecnt = file.length;	// 이미지 개수 저장
      }).catch(err => {
        alert(err);
      });
    },

    // 이미지 불러오기
    // data속성에서 추가되는 변수들
imagelist: [],		// 불러온 이미지들의 url을 저장하는 객체
imagecnt: 0,		// 불러올 이미지 개수 (db에서 받아옴)
// 이미지 수정, 삭제 기능은 없어서 처음에 불러오는 부분만 수정
mounted() {
    axios({
      url: "http://localhost:8000/image/image/",
      method: "POST",
      data: {
        id: this.$route.query.id
      },
    }).then(res => {
      this.writer = res.data.writer;
      this.title = res.data.title;
      this.createdAt = res.data.createdAt.split('T')[0] ;
      this.updatedAt = res.data.updatedAt.split('T')[0];
      this.text = res.data.text;
      this.imagecnt = res.data.imagecnt;	// db에서 새로운 field인 imagecnt 값도 받아옴
      for(var i = 1; i <= res.data.imagecnt; i++){
        this.imagelist.push(this.$route.query.id + '-' + i + '.png');
	// 이미지를 저장할 때, '글id - 1.png', '글id - 2.png', ... 이런식으로 저장할 것임
      }
    }).catch(err => {
      alert(err);
    });
},
}



</script>
<style scoped>
  div{
    margin:0 5px 0 5px;
  }
</style>