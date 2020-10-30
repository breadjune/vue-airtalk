<template>
    <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
            <card>
                <template slot="header">
                <h3 class="card-title">메뉴 관리</h3>
                </template>
                
                <div class="row">
                    <menu-tree v-on:reSearchId="reSearch"></menu-tree>
                    <div class="col">
                        <menu-info v-bind="detailList"></menu-info>
                        <hr>
                        <button v-on:click="check">chk</button>
                        <menu-func v-bind="funclist"></menu-func>
                        
                    </div>
                </div>
            </card>
        </div>
      </div>
    </div>
    </div>
</template>
<script>
import axios from 'axios'
import menufunc from './MenuFunc.vue'
import menuinfo from './MenuInfo.vue'
import menutree from './MenuTree.vue'
import Card from "src/components/Cards/Card.vue";

export default {
    data() {
        return {
            detailList : {
                seq : '1',
                title : '2',
                type : '3',
                url : '4',
                auth : '5',
                description : '6',
                
                regdate : '7',
                moddate : '8'
            },
            funclist: {
                id : [],
                title : [],
                points : [],
                user : [],
                time : [],
                time_ago : [],
                comments_count : [],
                type : [],
                url : [],
                domain : []
                // funcSeq : [],
                // menuSeq : [],
                // name : [],
                // url : [],
                // auth : [],
                // description : [],
                // regDate : [],
                // modDate : []
            },
            id : '1'
        }
    },
    created() {
        this.detail();
        this.func();
    },
    methods : {
        check(){
            console.log("funclist check : " + this.funclist.id);
            console.log("funclist check : " + this.funclist.title);
            console.log("funclist check : " + this.funclist.points);
        },
        detail(){
            const res = axios.get('/rest/menu/detail', {params: { id : this.id }}).then((result) => {
                this.detailList.seq=result.data.menuSeq;
                this.detailList.title=result.data.title;
                this.detailList.type=result.data.type;
                this.detailList.url=result.data.url;
                this.detailList.icon=result.data.icon;
                this.detailList.description=result.data.description;
                this.detailList.regdate=result.data.regDate;
                this.detailList.moddate=result.data.modDate;
            }).catch(function(res){
                console.log(res);
            });
        },
        func(){
            console.log("api func")
            const re = axios.get('https://api.hnpwa.com/v0/news/1.json').then((res) => {
                this.funclist.id = res.data.map(x=>x.id);
                this.funclist.title = res.data.map(x=>x.title);
                this.funclist.points = res.data.map(x=>x.points);
                this.funclist.user = res.data.map(x=>x.user);
                this.funclist.time = res.data.map(x=>x.time);
                this.funclist.time_ago = res.data.map(x=>x.time_ago);
                this.funclist.comments_count = res.data.map(x=>x.comments_count);
                this.funclist.type = res.data.map(x=>x.type);
                this.funclist.url = res.data.map(x=>x.url);
                this.funclist.domain = res.data.map(x=>x.domain);

                console.log("api : result = : " + this,this.funclist.id);
                
            }).catch(function(res){
                    console.log(res);
            });

            console.log('api fin');

            // const re = axios.get('/rest/menu/function',{params: {
            //     id : this.id
            // }}).then(res => {
            //     this.funclist.funcSeq = res.data.map(x=>x.funcSeq);
            //     this.funclist.menuSeq = res.data.map(x=>x.menuSeq);
            //     this.funclist.name = res.data.map(x=>x.name);
            //     this.funclist.url = res.data.map(x=>x.url);
            //     this.funclist.auth = res.data.map(x=>x.auth);
            //     this.funclist.description = res.data.map(x=>x.description);
            //     this.funclist.regDate = res.data.map(x=>x.regDate);
            //     this.funclist.modDate = res.data.map(x=>x.modDate);
            //     console.log("complete : " + this.funclist.funcSeq);
            // }).catch(function(res){
            //         console.log(res);
            // });
        },
        reSearch(id){
            console.log("reSearchId : " + id);
            this.id=id;
        }
    },
    components : {
        'menu-tree' : menutree,
        'menu-info' : menuinfo,
        'menu-func' : menufunc,
        Card
    },
    watch:{
        id : function(){
            this.detail();
            console.log('watch_id');
            this.func();
        },
        funclist : function(){
            console.log('watch_func');
            this.func();
        }
    }
}
</script>
<style scoped>
.rowMenu{
    display: flex;
}
.colMenu{
    flex: 1;
}
</style>