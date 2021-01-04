<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <card>
            <h3 slot="header" class="card-title">권한 관리 상세</h3>
            <p class="card-category">
              권한 관리 그룹을 확인 및 업데이트해 주십시오.
            </p>
            <hr>
            <b-form id="form">
              <b-row>
                <div class="col-md-3"></div>
                <div class="col-md-6 ml-sm-3">
                  <label> 사용자 그룹 <span class="required">*</span></label>
                  <b-form-input
                    name="userGroup"
                    type="text"
                    placeholder="내용을 입력하세요"
                    v-model="$route.params.authName"
                  >
                  </b-form-input>
                </div>
              </b-row>

              <b-row>
                <div class="col-md-3"></div>
                <div class="col-md-6 ml-sm-3">
                  <label> 설명 <span class="required">*</span> </label>
                  <b-form-input
                    name="gname"
                    type="text"
                    placeholder="내용을 입력하세요"
                    v-model="$route.params.desc"
                  >
                  </b-form-input>
                </div>
              </b-row>
              <b-row>
                <div class="col-md-3"></div>
                <div class="col-md-6 ml-sm-3">
                  <label> 메뉴별 권한 <span class="required">*</span></label>
                    <table class="table table-bordered">
                     <template v-for="item in this.resultL">
                      <tr v-bind:key="item">
                        <td style="width: 20%">
                          {{ resultD[item - 1].title }}
                        </td>
                        <td style="width: 50%">
                          <b-form-select
                            v-bind:key="item"
                            v-model="resultA[item-1].auth"
                            :options="options"
                          ></b-form-select>
                        </td>
                      </tr>
                    </template>
                 </table>
                </div>
              </b-row>
              <b-row>
                <div class="col-md-3"></div>
                <div class="col-md-6 ml-sm-3">
                  <label> 등록일 </label>
                  <b-input
                    name="regDate"
                    type="text"
                    disabled="true"
                    placeholder="2020-10-20"
                    v-model="$route.params.regDate"
                  >
                  </b-input>
                </div>
              </b-row>
              <div class="col-md-4"></div>
              <div class="text-center">
                <b-button
                  variant="success"
                  class="btn btn-fill mb-2 mr-sm-2 mb-sm-0"
                  @click="update()"
                >
                  수정
                </b-button>

                <b-button
                  variant="primary"
                  class="btn btn-fill mb-2 mr-sm-2 mb-sm-0"
                  @click.prevent="movePage"
                >
                  목록
                </b-button>

                <b-button
                  variant="danger"
                  class="btn btn-fill mb-2 mr-sm-2 mb-sm-0"
                  @click="del()"
                >
                  삭제
                </b-button>
              </div>
                <app-my-modal
                  :title="title"
                  :visible.sync="visible">
                    <div>
                      {{modalData}}
                  </div>
                </app-my-modal>

                <confirm
                  :status="modal.status"
                  :header="modal.header"
                  :body="modal.body"
                  @isCancel="toggle"
                  @isOk="remove">
                  <div>
                    {{modalData}}
                  </div> 
                </confirm> 

              <div class="clearfix"></div>
            </b-form>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import Modal from '@/layout/Modal.vue'
import Confirm from '@/layout/Confirm.vue'
const groupStore = "groupStore";

export default {
  name: "GroupInfo",
   components: {
    appMyModal: Modal,
    Confirm
    },
  data() {
    return {
      visible: false,

      user: {
        authGroupSeq: "",
        authName: "",
        desc: "",
        regDate: "",
      },
      msg:{
          success: "정상 처리되었습니다.",
          fail: "저장 실패 하였습니다. 정보를 확인해주세요.",
          groupName: "사용자 그룹을 입력해 주세요.",
          desc: "설명을 입력해 주세요",

      },
      fields: ["Menu_name", "show_details"],
      items: [
        { Menu_name: "회원관리" },
        { Menu_name: "계정관리" },
        { Menu_name: "메뉴관리" },
      ],
      selected: [],
      resultL: "",
      resultS: "" ,
      resultD: [],
      resultA: [],
      menuSeq: [],
      modalData: "",
      title:"권한 관리 게시판",
      options: [
        { value: "X", text: "권한없음" },
        { value: "R", text: "읽기" },
        { value: "RA", text: "읽기/승인" },
        { value: "RC", text: "읽기/생성" },
        { value: "RUA", text: "읽기/수정/승인" },
        { value: "RCU", text: "읽기/생성/수정" },
        { value: "RCUD", text: "읽기/생성/수정/삭제" },
        { value: "RCUDA", text: "읽기/생성/수정/삭제/승인" },
      ],
      modal: {
        status: false,
        header: "",
        body: "",
        headerMsg: {
          alert: "확인",
          create: "등록",
          modify: "수정",
          delete: "삭제"
        },
        bodyMsg:{
          delete: "정말 삭제 하시겠습니까?",
          fail: "저장 실패 하였습니다. 정보를 확인해주세요.",
          title: "제목을 입력해 주세요.",
          content: "내용을 입력해 주세요."
        }
      }
    };
  },  
  watch:{
    visible(){  //모달이 닫히면 false 체크
        if(this.visible==false && this.resultS=="S"){
          this.$emit("rename", "Content");
          this.$router.push("/admin/group-list");
        }
    }
  },

  mounted() {
    this.init(); 
    this.user.authGroupSeq = this.$route.params.authGroupSeq;
    this.user.authName = this.$route.params.authName;
    this.user.desc = this.$route.params.desc;
    this.user.regDate = this.$route.params.regDate;
   
    console.log("authGroupSeq: " + this.user.authGroupSeq);
    console.log("authName: " + this.user.authName);
    console.log("desc: " + this.user.desc);
    console.log("regDate: " + this.user.regDate); 
     this.init2();
  },
  methods: {
    movePage: function (event) {
      this.$emit('rename', 'Content');
      this.$router.push("/admin/group-list");
    },
    init: function () {
      axios
        .get("/rest/group/menuList.json")
        .then((result) => {
          console.log("result.data1 : " + JSON.stringify(result.data));
          this.result = result.data;
          this.resultL = this.result.length;
          console.log(this.result.length);

          this.$store.dispatch( "groupStore/selectGroupListBySearchWord",result.data );
          this.resultD = this.$store.getters["groupStore/memberList"];
          console.log(JSON.stringify(this.resultD));
        
          //셀렉트 박스 디폴트 값 입력
          for (var i = 0; i <this.result.length ; i++ ){
           this.menuSeq[i]= this.resultD[i].menuSeq;
          }
        })
        .catch((e) => {
          console.log("error : " + e);
        });
    },
    init2: function () {
      axios
        .get("/rest/group/view.json",{
          params: {
             adminGroupSeq: this.user.authGroupSeq,
          }
        })
        .then((result) => {
          console.log("result.data2 : " + JSON.stringify(result.data));
          this.result = result.data;
          this.resultL = this.result.length;
          console.log(this.result.length);

          this.$store.dispatch( "groupStore/selectGroupListBySearchWord",result.data );
          this.resultA = this.$store.getters["groupStore/adminGroupAuth"];
          console.log(JSON.stringify(this.resultA));
        })
        .catch((e) => {
          console.log("error : " + e);
        });
    },
    update() {
        // 셀렉트 박스 값 저장
          for (var i = 0; i <this.resultL ; i++ ){
           this.selected[i] = this.resultA[i].auth;
          }

      let data = {
        authGroupSeq: this.$route.params.authGroupSeq,
        gname: this.$route.params.authName,
        userGroup: this.$route.params.desc,
        auth: this.selected,
        menuSeq: this.menuSeq,
      };

      if(data.gname!="" && data.userGroup!=""){
        axios
          .post("/rest/group/update.json", data)
          .then((result) => {
           console.log("result.data : " + result.data);
           this.result = result.data;
            if (result.data == "SUCCESS"){
            this.title= result.data;
            this.modalData= this.msg.success;
            this.visible = !this.visible;
            this.resultS= "S";
          }
          else{
            this.title= result.data;
            this.modalData= this.msg.fail;
            this.visible = !this.visible;
            this.resultS= "F";
          }
           })
          .catch((e) => {
            console.log("error : " + e);
          });
      }
      else if(data.gname==""){
        this.modalData = this.msg.groupName;
        this.visible = !this.visible;
      }
      else if(data.userGroup==""){
        this.modalData = this.msg.desc;
        this.visible = !this.visible;
      }
    },
    toggle(){
      this.modal.status = !this.modal.status; 
    },
    del(){
      this.modal.header = this.modal.headerMsg.delete;
      this.modal.body = this.modal.bodyMsg.delete;
      this.toggle();
    },
    remove(){
      let data = {
        authGroupSeq: this.user.authGroupSeq,
      };
      if(confirm("삭제 하시겠습니까?") == true) {
      console.log(data);
      axios
        .post("/rest/group/delete.json", data)
        .then((result) => {
          console.log("result.data : " + result.data);
          this.result = result.data;
           if (result.data == "SUCCESS"){
            this.title= result.data;
            this.modalData= this.msg.success;
            this.visible = !this.visible;
            this.resultS= "S";
          }
          else{
            this.title= result.data;
            this.modalData= this.msg.fail;
            this.visible = !this.visible;
            this.resultS= "F";
          }
        })
        .catch((e) => {
          console.log("error : " + e);
        });
      }
    },
  },
};
</script>
<style>
</style>
