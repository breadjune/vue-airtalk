<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <card>
                        <template slot="header">
                            <h4 class="card-title">공지사항</h4>
                        </template>
    
                        <form>
                            <table class="table table-striped">
                                <tbody>
                                    <b-tr>
                                        <td > No: </td>
                                        <td> {{ notice_seq }} </td>
                                    </b-tr>
                                    <b-tr>
                                        <td> 작성자 : </td>
                                        <td> {{ id }} </td>
                                    </b-tr>
                                    <tr>
                                        <td> 제목 : </td>
                                        <td> {{ title }} </td>
                                    </tr>
                                    <tr>
                                        <td> 내용 : </td>
                                        <td> {{ contents }} </td>
                                    </tr>

                                    <tr>
                                        <td> 파일 다운로드 : </td>
                                        <td> {{ file }} </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                        <b-button class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="primary" style="float:left" v-on:click="list">목록</b-button>
                        <b-button class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="primary" style="float:left" v-on:click="update">수정</b-button>
                        <b-button class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="primary" style="float:left" v-on:click="del">삭제</b-button>
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
            id : '',
            title : '',
            contents : '',
            file : ''
        }
    },
    computed : {
        notice_seq : function(){
            axios.get('/rest/notice/getnotice',{params: {
              seq : this.$route.params.seq
            }}).then((res) => {
                console.log('rest_api_getnotice');
                this.seq = res.data.boardSeq;
                this.title = res.data.title;
                this.contents = res.data.contents;
                this.id = res.data.adminId;
                this.file = res.data.flagFile;

                console.log("api : result = : " + this,this.id);
            }).catch(function(res){
                    console.log('error_notice_detail_rest_getnotice');
                    console.log(res);
            });

            return this.$route.params.seq;
        }
    },
    methods : {
        list(){
            console.log('deatil_list_click');
            this.$emit('rename','Content');
            this.$router.push('/admin/notice');
        },
        update(){
            console.log('deatil_update_click');
            this.$emit('rename','Content');
            this.$router.push('/admin/noticeupdate');
        },
        del(){
            console.log('deatil_del_click');  
        },

    }
}
</script>