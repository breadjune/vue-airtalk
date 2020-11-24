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
                        <editorForm></editorForm>
                        <div style="display:inline;">
                                <b-button id="modifyBtn" variant="primary" class="btn btn-fill mb-2 mr-sm-2 mb-sm-0" @click="modify()" v-show="btnModify">수정</b-button>
                                <b-button id="saveBtn" variant="success" class="btn btn-fill mb-2 mr-sm-2 mb-sm-0" @click="save()" v-show="btnSave">저장</b-button>
                                <b-button id="deleteBtn" variant="danger" class="btn btn-fill mb-2 mr-sm-2 mb-sm-0" @click="del()" v-show="btnModify">삭제</b-button>
                                <b-button id="listBtn" variant="info" class="btn btn-fill mb-2 mr-sm-2 mb-sm-0" @click="cancel()">목록</b-button>
                        </div>
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
            btnModify: false,                // 수정 버튼 표시 or 숨김
            btnSave: false,                 // 저장, 삭제 버튼 표시 or 숨김
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
                readOn: this.btnModify,
                },
            });
        },
        modify() {
            this.btnModify = false;
            this.btnSave = true;

         },

        save(){
            console.log('notice_add.vue - add()');

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
        cancel(){
            console.log('notice_add.vue - cancel()');
            this.$emit('rename','Content');
            this.$router.push('/admin/editorMain');
        },
    }
}
</script>