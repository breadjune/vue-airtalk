<template>
  <div class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <card>
                  <template slot="header">
                    <h4 class="card-title">서비스 코드 관리</h4>
                      <p class="card-category">* 서비스 코드를 추가하십시오.</p>
                        <hr>
                        </template>
                        <b-form>
                            <div>
                                <label for="code">Code</label>
                                <b-input id="code" name="code" type="text" v-model="code" ></b-input>
                            </div>
                            <div>
                                <label for="codeName">Code 이름</label>
                                <b-input id="codeName" name="codeName" type="text" v-model="codeName" ></b-input>
                            </div>
                            <br>
                            <div class="text-center">
                                <b-button id="saveBtn" variant="success" class="btn btn-fill mb-2 mr-sm-2 mb-sm-0" @click="save()">등록</b-button>
                                <b-button id="listBtn" variant="info" class="btn btn-fill mb-2 mr-sm-2 mb-sm-0" @click="list()">목록</b-button>
                                 <!-- <app-my-modal
                                     :title="title"
                                      :visible.sync="visible">
                                     <div>
                                      {{modalData}}
                                     </div> 
                               </app-my-modal>       -->
                               <confirm
                                :status="modal.status"
                                :header="modal.header"
                                :body="modal.body"
                                :redirect="modal.redirect"
                                @isCancel="toggle"
                                >
                                    <div>
                                        {{modalData}}
                                    </div> 
                                </confirm>
                            </div>        
                        </b-form>                         
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import Confirm from '@/layout/Confirm.vue'
    // import Modal from '@/layout/Modal.vue'

    export default {
        components: {
        //   appMyModal: Modal,
            Confirm
        },
        data() {
            return {
                visible: false,
                
                code: "", 
                codeName: "",
                regDate: "",
                // modalData: "",
                // title:"서비스 코드 관리",
                // resultS: "",
                // msg:{
                //     success: "정상 처리되었습니다.",
                //     fail: "저장 실패 하였습니다. 정보를 확인해주세요.",
                //     code: "code 를 확인 하세요.",
                //     codeName: "code 이름을 입력하세요.",
                //  },
                modal: {
                    status: false,
                    header: "",
                    body: "",
                    redirect: false
                }
            }
        },

        watch: {
            // visible(){  //모달이 닫히면 false 체크
            //     if(this.visible==false && this.resultS=="S"){
            //         this.$emit("rename", "Content");
            //         this.$router.push("/service/codeManage");
            //     }
            //  }
        },
        methods: {
            save() {
                if (this.code == null || this.code == "") {
                    //   this.modalData = this.msg.code;
                    //   this.visible = !this.visible;
                    this.modal.header = "확인";
                    this.modal.body = "추가할 코드를 입력해 주세요.";
                    this.toggle();
                }
                else if (this.codeName == null || this.codeName == "") {
                //    this.modalData = this.msg.codeName;
                //    this.visible = !this.visible;
                    this.modal.header = "확인";
                    this.modal.body = "추가할 코드 명을 입력해 주세요.";
                    this.toggle();
                }
                else {
                   let data ={
                    code: this.code,
                    codeName: this.codeName,
                   };
                
                    axios.post("/restapi/svcCode/create", data).then((result) =>  {
                        // 정상 처리 될 경우 리스트 화면으로 이동
                        if(result.data.result == 'SUCCESS') {
                            // this.title= result.data.result;
                            // this.modalData= this.msg.success;
                            // this.visible = !this.visible;
                            // this.resultS= "S";
                            this.modal.header = "확인";
                            this.modal.body = "정상 처리 되었습니다.";
                            this.modal.redirect = true
                            this.toggle();
                        }
                        else {
                            // this.title= result.data.result;
                            // this.modalData= this.msg.fail;
                            // this.visible = !this.visible;
                            // this.resultS= "F";
                            this.modal.header = "확인";
                            this.modal.body = "생성 실패 되었습니다.";
                            this.modal.redirect = true
                            this.toggle();
                        }
                    });
                }
            },
            toggle(value) {
                this.modal.status = !this.modal.status; 
                if(value) this.list();
            },
            list() {
                this.$emit('rename', 'Content');
                this.$router.push("/service/codeManage");
            }
        }
    }
</script>