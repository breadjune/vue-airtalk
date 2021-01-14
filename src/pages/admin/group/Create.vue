<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <card>
            <h3 slot="header" class="card-title">권한 관리 추가</h3>
            <p class="card-category">권한 관리 그룹을 추가해 주십시오.</p>
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
                    v-model="user.userGroup"
                    :state="groupState"
                    aria-describedby="input-live-help input-live-feedback"
                  >
                  </b-form-input>
                </div>
              </b-row>

              <b-row>
                <div class="col-md-3"></div>
                <div class="col-md-6 ml-sm-3">
                  <label> 설명 <span class="required">*</span></label>
                  <b-form-input
                    name="gname"
                    type="text"
                    placeholder="내용을 입력하세요"
                    v-model="user.gname"
                    :state="nameState"
                    aria-describedby="input-live-help input-live-feedback"
                  >
                  </b-form-input>
                </div>
              </b-row>
              <b-row>
                <div class="col-md-3"></div>
                <div class="col-md-6 ml-sm-3">
                  <label> 메뉴별 권한 </label>
                  <table class="table table-bordered">
                    <template v-for="item in this.resultL">
                      <tr v-bind:key="item">
                        <td style="width: 20%">
                          {{ resultD[item - 1].title }}
                        </td>
                        <td style="width: 50%">
                          <b-form-select
                            v-bind:key="item"
                            v-model="selected[item-1]"
                            :options="options"
                          ></b-form-select>
                        </td>
                      </tr>
                    </template>
                  </table>
                </div>
              </b-row>
              <div class="col-md-4"></div>
              <div class="text-center">
                <b-button
                  variant="success"
                  class="btn-fill mb-2 mr-sm-2 mb-sm-0"
                  @click="create()"
                >
                  저장
                </b-button>

                <b-button
                  variant="primary"
                  class="btn btn-fill mb-2 mr-sm-2 mb-sm-0"
                  v-b-modal.modal-1
                  @click.prevent="movePage"
                >
                  목록
                </b-button>
                <!-- <app-my-modal
                   :title="title"
                   :visible.sync="visible">
                    <div>
                      {{modalData}}
                   </div>
                </app-my-modal> -->
                <confirm
                  :status="modal.status"
                  :header="modal.header"
                  :body="modal.body"
                  :redirect="modal.redirect"
                  @isCancel="toggle"
                  @isOk="remove">
                  <div>
                  {{modalData}}
                  </div> 
                </confirm>
              </div>
              <div class="clearfix"></div>
            </b-form>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
const groupStore = "groupStore";

import axios from "axios";
// import Modal from '@/layout/Modal.vue'
import Confirm from '@/layout/Confirm.vue'
export default {
  name: "GroupCreate",
  components: {
    // appMyModal: Modal,
    Confirm
    },
   computed: {
      groupState() {
        return this.user.userGroup.length >= 1 ? true : false
      },
      nameState() {
        return this.user.gname.length >= 1 ? true : false
      }
    },
  data() {
    return {
      visible: false,

      user: {
        userGroup: "",
        gname: "",
        regDate: "",
      },
      msg:{
          success: "정상 처리되었습니다.",
          fail: "저장 실패 하였습니다. 정보를 확인해주세요.",
          groupName: "사용자 그룹을 입력해 주세요.",
          desc: "설명을 입력해 주세요",

      },
      selected: [],
      resultS: "",
      resultL: "",
      resultD: [],
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
        redirect: false
      }
    };
  },
  mounted() {
    this.init();
  },
  watch:{
    // visible(){  //모달이 닫히면 false 체크
    //   if(this.visible==false && this.resultS=="S"){
    //     this.$emit("rename", "Content");
    //     this.$router.push("/admin/group-list");
    //   }
    // }
  },
  methods: {
    movePage: function (event) {
      this.$emit("rename", "Content");
      this.$router.push("/admin/group-list");
    },
    init: function () {
      axios
        .get("/rest/group/menuList.json")
        .then((result) => {
          console.log("result.data : " + JSON.stringify(result.data));
          this.result = result.data;
          this.resultL = this.result.length;
          console.log(this.result.length);

          this.$store.dispatch(
            "groupStore/selectGroupListBySearchWord",
            result.data
          );
          this.resultD = this.$store.getters["groupStore/memberList"];
          console.log(JSON.stringify(this.resultD));
       
       //셀렉트 박스 디폴트 값 입력
       for (var i = 0; i <this.result.length ; i++ ){
         this.selected[i]= "X";
         this.menuSeq[i]= this.resultD[i].menuSeq;
        }

        })
        .catch((e) => {
          console.log("error : " + e);
        });
    },
    toggle(value) {
      this.modal.status = !this.modal.status; 
      if(value) {
        this.$emit("rename", "Content");
        this.$router.push("/admin/group-list");
      }
    },
    async create() {
      let data = {
        gname: this.user.gname,
        userGroup: this.user.userGroup,
        auth: this.selected,
        menuSeq: this.menuSeq,
      };
      console.log(data);
      if (this.groupState==true && this.nameState==true) {
        axios
        .post("/rest/group/create.json", data)
        .then((result) => {
          console.log("result.data : " + result.data);
          this.result = result.data;
          if (result.data == "SUCCESS"){
            // this.title= result.data;
            // this.modalData= this.msg.success;
            // this.visible = !this.visible;
            // this.resultS= "S";
            this.modal.header = "확인";
            this.modal.body = "그룹이 생성 되었습니다.";
            this.modal.redirect = true
            this.toggle();
          }
          else{
            // this.title= result.data;
            // this.modalData= this.msg.fail;
            // this.visible = !this.visible;
            // this.resultS= "F";
            this.modal.header = "확인";
            this.modal.body = "생성 실패 되었습니다.";
            this.modal.redirect = true
            this.toggle();
          }
        })
        .catch((e) => {
          console.log("error : " + e);
        });
  
      }
      else if(this.groupState==false){
        this.modal.header = "확인";
        this.modal.body = "사용자 그룹을 입력해 주세요.";
        this.toggle();
      }
      else if(this.nameState==false){
        this.modal.header = "확인";
        this.modal.body = "설명을 입력해 주세요";
        this.toggle();
      }

    },
  },
};
</script>
<style>
</style>
