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
                        <editorForm></editorForm>
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

export default {
    components : {
        'editorForm' : editorForm
    },
    methods :{
        add(){
            console.log('notice_add.vue - add()');
        },
        cancel(){
            console.log('notice_add.vue - cancel()');
            this.$emit('rename','Content');
            this.$router.push('/admin/editorMain');
        }
    }
}
</script>