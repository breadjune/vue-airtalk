<template>
    <div>
        <h1>메뉴 관리</h1>
        <div style="float:left">
            <menu-tree v-on:reSearchId="reSearch"></menu-tree>
            <menu-info v-bind="detailList"></menu-info>
            <menu-func v-bind="funclist"></menu-func>
            <button v-on:click="check">check</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import menutree from './MenuTree';
import menuinfo from './MenuInfo';
import menufunc from './MenuFunc';

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
                // id : [],
                // title : [],
                // points : [],
                // user : [],
                // time : [],
                // time_ago : [],
                // comments_count : [],
                // type : [],
                // url : [],
                // domain : []
                funcSeq : [],
                menuSeq : [],
                name : [],
                url : [],
                auth : [],
                description : [],
                regDate : [],
                modDate : []
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
            console.log("funclist check : " + this.funclist.funcSeq);
            console.log("funclist check : " + this.funclist.menuSeq);
            console.log("funclist check : " + this.funclist.name);
        },
        detail(){
            // const res = axios.get('/admin/menu/detail', {params: { id : this.id }}).then((result) => {
            //     this.detailList.seq=result.data.menuSeq;
            //     this.detailList.title=result.data.title;
            //     this.detailList.type=result.data.type;
            //     this.detailList.url=result.data.url;
            //     this.detailList.icon=result.data.icon;
            //     this.detailList.description=result.data.description;
            //     this.detailList.regdate=result.data.regDate;
            //     this.detailList.moddate=result.data.modDate;
            // }).catch(function(res){
            //     console.log(res);
            // });
        },
        func(){
            // console.log("api func")
            // const re = axios.get('https://api.hnpwa.com/v0/news/1.json').then((res) => {
            //     this.funclist.id = res.data.map(x=>x.id);
            //     this.funclist.title = res.data.map(x=>x.title);
            //     this.funclist.points = res.data.map(x=>x.points);
            //     this.funclist.user = res.data.map(x=>x.user);
            //     this.funclist.time = res.data.map(x=>x.time);
            //     this.funclist.time_ago = res.data.map(x=>x.time_ago);
            //     this.funclist.comments_count = res.data.map(x=>x.comments_count);
            //     this.funclist.type = res.data.map(x=>x.type);
            //     this.funclist.url = res.data.map(x=>x.url);
            //     this.funclist.domain = res.data.map(x=>x.domain);

            //     console.log("api : result = : " + this,this.funclist.id);
                
            // }).catch(function(res){
            //         console.log(res);
            // });

            const re = axios.get('/admin/menu/function',{params: {
                id : this.id
            }}).then(res => {
                this.funclist.funcSeq = res.data.map(x=>x.funcSeq);
                this.funclist.menuSeq = res.data.map(x=>x.menuSeq);
                this.funclist.name = res.data.map(x=>x.name);
                this.funclist.url = res.data.map(x=>x.url);
                this.funclist.auth = res.data.map(x=>x.auth);
                this.funclist.description = res.data.map(x=>x.description);
                this.funclist.regDate = res.data.map(x=>x.regDate);
                this.funclist.modDate = res.data.map(x=>x.modDate);
                console.log("complete : " + this.funclist.funcSeq);
            }).catch(function(res){
                    console.log(res);
            });
        },
        reSearch(id){
            console.log("reSearchId : " + id);
            this.id=id;
        }
    },
    components : {
        'menu-tree' : menutree,
        'menu-info' : menuinfo,
        'menu-func' : menufunc
    },
    watch:{
        id : function(){
            this.detail();
            this.func();
        }
    }
}
</script>