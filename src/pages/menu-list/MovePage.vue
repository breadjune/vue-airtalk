<template>
    <div>
        <menu-tree></menu-tree>
        <detail-table v-bind="detailList"></detail-table>
    </div>
</template>
<script>
import axios from 'axios'
import detailVue from './detail.vue';
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
            id : '1'
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
        
    },
    components : {
        'menu-tree' : menutree,
        'detail-table' : detailVue
    },
    methods : {
        
    }
}
</script>