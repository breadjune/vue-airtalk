<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <card>
                        <template slot="header">
                            <h3 class="card-title">공지사항</h3>
                            <p class="card-category">여기는 공지 게시판 입니다.</p>
                        <hr>
                        </template>
                        <notice-search></notice-search>
                        <notice-list v-bind="noticeList"></notice-list>
                        <div style="display:inline;">
                            <b-button class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="primary" style="float:left" v-on:click="add">추가</b-button>
                            <tr style="float:right">
                                paging
                            </tr>
                        </div>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import noticeSearch from './notice_search.vue'
import noticeList from './notice_list.vue'
import pagemove from '@/components/eventBus'
import axios from 'axios'

export default {
    components : {
        'notice-search' : noticeSearch,
        'notice-list' : noticeList
    },
    data() {
        return {
            noticeList: {
                seq : Array,
                title : Array,
                contents : Array,
                id : Array,
                reg_date : Array,
                mod_date : Array,
                flag_file : Array
            },
            detailInfo: {
                seq : '',
                title : '',
                contents : '',
                id : '',
                reg_date : '',
                mod_date : '',
                flag_file : ''
            }
        }
    },
    created : function() {
        this.list();
    },
    methods : {
        list(){
            axios.get('/rest/notice/list').then((res) => {
                console.log('rest_api_list');
                this.noticeList.seq = res.data.map(x=>x.boardSeq);
                this.noticeList.title = res.data.map(x=>x.title);
                this.noticeList.contents = res.data.map(x=>x.contents);
                this.noticeList.id = res.data.map(x=>x.adminId);
                this.noticeList.reg_date = res.data.map(x=>x.regDate);
                this.noticeList.mod_date = res.data.map(x=>x.modDate);
                this.noticeList.flag_file = res.data.map(x=>x.flagFile);

                console.log("api : result = : " + this,this.noticeList.id);
            }).catch(function(res){
                    console.log('errrrrrr');
                    console.log(res);
            });
        },
    
        add(){
            console.log('add!!');
            this.$emit('rename','Content');
            (this.$router.push('/admin/noticeadd'));
        }
    }
}
</script>