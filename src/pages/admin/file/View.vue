<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <card>
                        <template slot="header">
                            <h4 class="card-title">파일 게시판</h4>
                            <p class="card-category">파일 게시판 수정</p>
                            <hr>
                        </template>
    
                        <b-form>
                            <div>
                                <label for="seq">No:</label>
                                <b-input id="seq" name="seq" type="text" v-model="seq" readonly></b-input>
                            </div>
                            <div>
                                <label for="title">제목</label>
                                <b-input id="title" name="title" type="text" v-model="title" maxlength="100"></b-input>
                            </div>
                            <div>
                                <label for="writer">작성자</label>
                                <b-input id="writer" name="writer" type="text" v-model="writer" maxlength="20"></b-input>
                            </div>
                            <div>
                                <label for="contents">내용</label>
                                <b-form-textarea id="contents" name="contents" type="text" v-model="contents"></b-form-textarea>
                            </div>
                            <div>
                                <label for="phone">파일 다운로드</label>
                                <b-input id="fileName" name="fileName" type="text" v-model="fileName"></b-input>
                            </div>

                        </b-form>
                        <b-button class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="primary" style="float:left" v-on:click="list">목록</b-button>
                        <b-button class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="primary" style="float:left" v-on:click="update">수정</b-button>
                        <b-button class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="primary" style="float:left" v-on:click="remove">삭제</b-button>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            seq : '',
            title : '',
            writer : '',
            contents : 'none',
            file : ''
        }
    },
    mounted() {
        this.seq = this.$route.params.seq;
        this.title = this.$route.params.title;
        this.writer = this.$route.params.writer;
        this.contents = this.$route.params.contents;
        this.file = this.$route.params.file;
    },
    // computed : {
    //     notice_seq : function(){
    //         axios.get('/rest/notice/getnotice',{params: {
    //           seq : this.$route.params.seq
    //         }}).then((res) => {
    //             console.log('rest_api_getnotice');
    //             this.seq = res.data.boardSeq;
    //             this.title = res.data.title;
    //             this.contents = res.data.contents;
    //             this.id = res.data.adminId;
    //             this.file = res.data.flagFile;

    //             console.log("api : result = : " + this,this.id);
    //         }).catch(function(res){
    //                 console.log('error_notice_detail_rest_getnotice');
    //                 console.log(res);
    //         });

    //         return this.$route.params.seq;
    //     }
    // },
    methods : {
        list(){
            this.$emit('rename','Content');
            this.$router.push({
                name: "File"
            });
        },
        update(){
            console.log('Update API invoked.');
            this.$emit('rename','Content');
            var res = this.request("/rest/file/update.json", this.form);


        },
        remove(){
            console.log('Delete API invoked.');
            var res = this.request("/rest/file/delete.json", this.form);


        },

    }
}
</script>