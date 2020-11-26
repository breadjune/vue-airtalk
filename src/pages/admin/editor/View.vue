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
                        <editorForm @childs-event="parentsMethod"></editorForm>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import editorForm from './editorForm.vue'
import axios from 'axios'

export default {
    components : {
         'editorForm' : editorForm
    }, 
    data () {
      return {
            editorSeq: "",
            title: "",
            adminId: "",
            regDate: "",
            contents: "",
            createChk: false,
      form: {
             keyword: '',
             type: ''
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
        parentsMethod: function(title,html,adminId) {
                    this.formData.title=title;
                    this.formData.html=html;
                    this.formData.adminId=adminId;
                    console.log("받은 데이터 : " + this.formData.title);
                    console.log("받은 데이터2 : " + this.formData.html);
                    console.log("받은 데이터3 : " + this.formData.adminId);
                    this.save();
            },

        save() {
            console.log("저장 버튼  ");
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
                }
            },
         del() {
                let data ={
                editorSeq: this.editorSeq,
                    };
                if(confirm("삭제 하시겠습니까?") == true) {
                    console.log(this.id);
                    axios.post("/restapi/editor/remove", data)
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
    }
}
</script>