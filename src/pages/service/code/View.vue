<template>
  <div class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <card>
                  <template slot="header">
                    <h4 class="card-title">서비스 코드 관리</h4>
                      <p class="card-category">서비스 코드 관리 상세 화면입니다.</p>
                        <hr>
                        </template>
                        <b-form>
                            <div>
                                <label for="code">Code</label>
                                <b-input id="code" name="code" type="text" v-model="code" readonly></b-input>
                            </div>
                            <div>
                                <label for="codeName">Code 이름</label>
                                <b-input id="codeName" name="codeName" type="text" v-model="codeName" readonly></b-input>
                            </div>
                            <div>
                                <label for="regDate">등록일</label>
                                <b-input id="regDate" name="regDate" type="text" v-model="regDate" readonly></b-input>
                            </div>
                            <br>
                            <div class="text-center">
                                <b-button id="deleteBtn" variant="danger" class="btn btn-fill mb-2 mr-sm-2 mb-sm-0" @click="del()">삭제</b-button>
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

                code: "",
                codeName: "",
                regDate: "",
                modalData: "",
                title:"서비스 코드 관리",
                resultS: "",
                msg:{
                    success: "정상 처리되었습니다.",
                    fail: "실패 하였습니다. ",
                 },
            }
        },

        watch: {
            visible(){  //모달이 닫히면 false 체크
                if(this.visible==false && this.resultS=="S"){
                    this.$emit("rename", "Content");
                    this.$router.push("/service/codeManage");
                }
             }
        },
         mounted() {
            this.code = this.$route.params.code;
            this.codeName = this.$route.params.codeName;
            this.regDate= this.$route.params.regDate;
        },

        created() {
        },

        methods: {
            del() {
                let data ={
                    code: this.code,
                    };
                if(confirm("삭제 하시겠습니까?") == true) {
                    console.log(this.code);
                    axios.post("/restapi/svcCode/remove", data)
                            .then((result) => {
                        if(result.data.result == "SUCCESS") {
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
                else {
                    return false;
                }
            },

            list() {
                this.$emit('rename', 'Content');
                this.$router.push("/service/codeManage");
            }
        }
    }
</script>