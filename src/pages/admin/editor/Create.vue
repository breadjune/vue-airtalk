<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <card>
                        <template slot="header">
                            <h3 class="card-title">글쓰기 게시판 추가</h3>
                            <p class="card-category">여기는 글쓰기 게시판 추가화면 입니다.</p>
                            <hr>
                        </template>
                        <editorForm @childs-event="parentsMethod"></editorForm>
                        <div style="display:inline;">
                            <b-button class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="primary" style="float:left" v-on:click="add">등록</b-button>
                            <b-button class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="primary" style="float:left" v-on:click="cancel">취소</b-button>
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
    data() {
      return {
          formData:{ 
                adminId: "",
                title: "",
                html: "",
          },
      }
    },
    methods :{
        parentsMethod: function(title,html,adminId) {
                    this.formData.title=title;
                    this.formData.html=html;
                    this.formData.adminId=adminId;
                    console.log("받은 데이터 : " + this.formData.title);
                    console.log("받은 데이터2 : " + this.formData.html);
                    console.log("받은 데이터3 : " + this.formData.adminId);
            },

        add(){
            console.log(this.formData.title);

            let data = {
                title: this.formData.title,
                content: this.formData.html,
                adminId: this.formData.adminId,
            };

            console.log(data);
         axios
         .post("/rest/editor/create.json", data)
         .then((result) => {
              console.log("result.data : " + result.data);
              this.result = result.data;
              this.$emit('rename','Content');
              this.$router.push('/admin/editorMain');
          })
         .catch((e) => {
           console.log("error : " + e);
         });

        },
        cancel(){
            this.$emit('rename','Content');
            this.$router.push('/admin/editorMain');
        }
    }
}
</script>