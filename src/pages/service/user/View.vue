<template>
  <div class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <card>
                  <template slot="header">
                    <h4 class="card-title">사용자 관리</h4>
                      <p class="card-category">*비밀번호 변경을 원하지 않을 경우 기존 비밀번호 입력 하십시오.</p>
                        <hr>
                        </template>
                        <b-form>
                            <div>
                                <label for="adminId">사용자ID</label>
                                <b-input id="amdinId" name="adminId" type="text" v-model="id" readonly></b-input>
                            </div>
                            <div>
                                <label for="adminName">사용자명</label>
                                <b-input id="adminName" name="adminName" type="text" v-model="name" :disabled="pwPhoneEmail ? '' : disabled"></b-input>
                            </div>
                            <div>
                                <label for="password">비밀번호</label>
                                <b-input id="password" name="password" type="password" v-model="password" :disabled="pwPhoneEmail ? '' : disabled" maxlength="20"></b-input>
                            </div>
                            <div v-show="inputAdminGroupSelect">
                                <label for="passwordCheck">비밀번호 확인</label>
                                <b-input id="passwordCheck" name="passwordCheck" type="password" v-model="passwordCheck" :disabled="pwPhoneEmail ? '' : disabled" maxlength="20"></b-input>
                            </div>
                            <div>
                                <label for="phone">H.P</label>
                                <b-input id="phone" name="phone" type="text" v-model="hpNo" :disabled="pwPhoneEmail ? '' : disabled" maxlength="11"></b-input>
                            </div>
                            <div>
                                <label for="regDate">등록일</label>
                                <b-input id="regDate" name="regDate" type="text" v-model="regDate" readonly></b-input>
                            </div>
                            <br>
                            <div class="text-center">
                                <b-button id="modifyBtn" variant="primary" class="btn btn-fill mb-2 mr-sm-2 mb-sm-0" @click="modify()" v-show="btnModify">수정</b-button>
                                <b-button id="saveBtn" variant="success" class="btn btn-fill mb-2 mr-sm-2 mb-sm-0" @click="save()" v-show="btnSave">저장</b-button>
                                <b-button id="deleteBtn" variant="danger" class="btn btn-fill mb-2 mr-sm-2 mb-sm-0" @click="del()" v-show="btnModify">삭제</b-button>
                                <b-button id="listBtn" variant="info" class="btn btn-fill mb-2 mr-sm-2 mb-sm-0" @click="list()">목록</b-button>
                            </div>
                                <app-my-modal
                                     :title="title"
                                      :visible.sync="visible">
                                     <div>
                                      {{modalData}}
                                     </div> 
                               </app-my-modal>      
                        </b-form>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import Modal from '@/layout/Modal.vue'

    export default {
         components: {
          appMyModal: Modal,

         },
        data() {
            return {
                visible: false,

                id: "",
                name: "",
                password: "",
                hpNo: "",
                regDate: "",
                passwordCheck: "",
                btnModify: true,                // 수정 버튼 표시 or 숨김
                btnSave: false,                 // 저장, 삭제 버튼 표시 or 숨김
                pwPhoneEmail: true,             // phone, e-mail disable, undisable
                inputAdminGroup: true,          // adminGroup disable, undisable
                inputAdminGroupSelect: false,   // adminGroupSelect disable, undisable
                modalData: "",
                title:"사용자 관리",
                resultS: "",
                msg:{
                    success: "정상 처리되었습니다.",
                    fail: "실패 하였습니다. ",
                    phone: "핸드폰 번호를 확인 하세요.",
                    passMax: "비밀번호는 최소 10자리 이상 입력하세요.",
                    passCheck: "입력하신 비밀번호가 서로 일치하지 않습니다.",
                 },
            }
        },

        watch: {
            // phone에 숫자가 아닌 다른 문자가 들어올 경우 삭제 처리
            hpNo: function(){
                return this.hpNo = this.hpNo.replace(/[^0-9]/g, '');
            },
            visible(){  //모달이 닫히면 false 체크
                if(this.visible==false && this.resultS=="S"){
                    this.$emit("rename", "Content");
                    this.$router.push("/service/userManage");
                }
             }
        },
         mounted() {
            this.id = this.$route.params.id;
            this.name = this.$route.params.name;
            this.password = this.$route.params.password;
            this.hpNo = this.$route.params.hpNo;
            this.regDate= this.$route.params.regDate;
        },

        created() {
        },

        methods: {
            modify() {
                this.password = "";
                this.btnModify = false;
                this.btnSave = true;
                this.pwPhoneEmail = false;
                this.inputAdminGroup = false;
                this.inputAdminGroupSelect = true;
            },

            save() {
                 if (this.hpNo == null || this.hpNo == "" || this.hpNo.length < 10) {
                      this.modalData = this.msg.phone;
                      this.visible = !this.visible;
                }
                else if (this.password.length < 10) {
                   this.modalData = this.msg.passMax;
                   this.visible = !this.visible;
                }
                else if (this.password != this.passwordCheck) {
                    this.modalData = this.msg.passCheck;
                    this.visible = !this.visible;
                }
                else {
                   let data ={
                    id: this.id,
                    name: this.name,
                    password: this.password,
                    hpNo: this.hpNo,
                   };
                
                    axios.post("/restapi/user/modify", data).then((result) =>  {
                        // 정상 처리 될 경우 리스트 화면으로 이동
                        if(result.data.result == 'SUCCESS') {
                            this.title= result.data.result;
                            this.modalData= this.msg.success;
                            this.visible = !this.visible;
                            this.resultS= "S";
                        }
                        else {
                            this.title= result.data.result;
                            this.modalData= this.msg.fail;
                            this.visible = !this.visible;
                            this.resultS= "F";
                        }
                    });
                }
            },

            del() {
                let data ={
                    id: this.id,
                    };
                if(confirm("삭제 하시겠습니까?") == true) {
                    console.log(this.id);
                    axios.post("/restapi/user/remove", data)
                            .then((result) => {
                        if(result.data.result == "SUCCESS") {
                            this.title= result.data;
                            this.modalData= this.msg.success;
                            this.visible = !this.visible;
                            this.resultS= "S";
                        }
                        else {
                            this.title= result.data;
                            this.modalData= this.msg.fail;
                            this.visible = !this.visible;
                            this.resultS= "F";
                        }
                    });
                }
                else {
                    return false;
                }
            },

            list() {
                this.$emit('rename', 'Content');
                this.$router.push("/service/userManage");
            }
        }
    }
</script>