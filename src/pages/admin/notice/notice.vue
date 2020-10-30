<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <card>
                        <template slot="header">
                            <h4 class="card-title">공지사항</h4>
                        </template>
                        
                        <notice-search></notice-search>
                        <notice-list v-bind="noticeList"></notice-list>
                        <div style="display:inline;">
                            <button class="btn-info btn-fill" variant="primary" style="float:left" v-on:click="add">추가</button>
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
            }
        }
    },
    created : function() {
        // this.list();
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
            console.log('add');
            this.$router.push('/admin/noticeadd');
        }
    }
}
</script>