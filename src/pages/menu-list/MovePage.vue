<template>
    <div>
        <h1>메뉴 관리</h1>
        {{ funclist}}
        <menu-tree></menu-tree>
        <menu-info v-bind="detailList"></menu-info>
    </div>
</template>
<script>
import axios from 'axios'
import menuinfo from './menuInfo.vue';
import menutree from './menutree.vue';

export default {
    data() {
        return {
            detailList : {
                seq : '1',
                title : '2',
                type : '3',
                url : '4',
                icon : '5',
                description : '6',
                regdate : '7',
                moddate : '8'
            },
            funclist: [],
            id : '3'
        }
    },
    created() {
        const res = axios.get('/admin/menu/detail', {params: { id : this.id }}).then((result) => {
                this.detailList.seq=result.data.menuSeq;
                this.detailList.title=result.data.title;
                this.detailList.type=result.data.type;
                this.detailList.url=result.data.url;
                this.detailList.icon=result.data.icon;
                this.detailList.description=result.data.description;
                this.detailList.regdate=result.data.regDate;
                this.detailList.moddate=result.data.modDate;
            });
        const re = axios.get('/admin/menu/function', {params : { id : this.id}}).then(result =>{
            console.log("result1 - : " + result);
            console.log("result2 - : " + result.data);
            this.funclist = result.data;

                // this.menufunc.funcList = result.data.Item;
                // console.log('function - '+this.menufunc.funcList);
            });
        
    },
    components : {
        'menu-tree' : menutree,
        'menu-info' : menuinfo
    },
    methods : {
        
    }
}
</script>