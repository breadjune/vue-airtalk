<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <card>
                        <template slot="header">
                            <h4 class="card-title">글쓰기 게시판 추가</h4>
                            <p class="card-category">여기는 글쓰기 게시판 상세화면 입니다.</p>
                            <hr>
                        </template>
                        <editorForm @childs-event="save"
                                    @childs-eventDel="del"
                        ></editorForm>
                    </card>
                     <app-my-modal
                        :title="title"
                        :visible.sync="visible">
                        <div>
                            {{modalData}}
                        </div> 
                    </app-my-modal>      
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import editorForm from './editorForm.vue'
import axios from 'axios'
import Modal from '@/layout/Modal.vue'

export default {
    components : {
         'editorForm' : editorForm,
          appMyModal: Modal,
    }, 
    data () {
      return {
          visible: false,

        formData:{ 
                adminId:'',
                title: "",
                html: "",
          },
            editorSeq: "",
            regDate: "",
            contents: "",
            createChk: false,
            modalData: "",
            title:"글쓰기 게시판",
            resultS: "",
            msg:{
                success: "정상 처리되었습니다.",
                fail: "실패 하였습니다. ",
             },
      form: {
             keyword: '',
             type: ''
          }
      }
    },
    watch: {
            visible(){  //모달이 닫히면 false 체크
                if(this.visible==false && this.resultS=="S"){
                    this.$emit("rename", "Content");
                    this.$router.push("/admin/editorMain");
                }
             }
        },
    mounted() {
            this.editorSeq = this.$route.params.editorSeq;
            this.title = this.$route.params.title;
            this.adminId = this.$route.params.adminId;
            this.regDate= this.$route.params.regDate;
            this.contents= this.$route.params.contents;
            this.init();
        },
    methods :{
        init(){
            this.$router.push({
            name: "EditorInfo",
            params: {
                editorSeq: this.editorSeq,
                title: this.title,
                adminId: this.adminId,
                regDate: this.regDate,
                contents: this.contents,
                createChk: this.createChk, 
                },
            });
        },
        save: function(editorSeq,title,html,adminId) {
                //  if (this.hpNo == null || this.hpNo == "" || this.hpNo.length < 10) {
                //       this.modalData = this.msg.phone;
                //       this.visible = !this.visible;
                // }
                // else if (this.password.length < 10) {
                //    this.modalData = this.msg.passMax;
                //    this.visible = !this.visible;
                // }
                // else if (this.password != this.passwordCheck) {
                //     this.modalData = this.msg.passCheck;
                //     this.visible = !this.visible;
                // }
                // else {
                   let data ={
                        editorSeq: editorSeq,
                        adminId: adminId,
                        title: title,
                        content: html,
                   };
                
                    axios.post("/restapi/editor/modify", data).then((result) =>  {
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
                // }
            },
         del: function(editorSeq) {
                let data ={
                        editorSeq: editorSeq,
                    };
                if(confirm("삭제 하시겠습니까?") == true) {
                    console.log(this.editorSeq);
                    axios.post("/restapi/editor/remove", data)
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
    }
}
</script>