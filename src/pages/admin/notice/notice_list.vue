<template>
<div>
    <b-table 
    striped 
    hover 
    :items="items" 
    @row-clicked="myRowClickHandler"></b-table>
    <router-link to="/admin/noticedetail/2">aa</router-link>
</div>
</template>
<script>
// import dashboard from 'src/layout/DashboardLayout.vue'
export default {
    props:{
        seq : Array,
        title : Array,
        contents : Array,
        id : Array,
        reg_date : Array,
        mod_date : Array,
        flag_file : Array
    },
    data() {
      return {
        items: []
      }
    },
    watch: {
        seq(){
            console.log('watch_seq[0] : ' + this.seq[0]);
            for(var i=0; i<this.seq.length; i++){
                var data = new Object();
            
                data.No=this.seq[i];
                data.제목=this.title[i];
                data.작성자=this.id[i];
                data.등록일=this.reg_date[i];
                this.items.push(data);
            }
        }
    },
    methods : {
        myRowClickHandler(record, index) {
            console.log('row click _ record : '+record); // This will be the item data for the row
            console.log('row click _ index : '+index); // This will be the item data for the row
            console.log('record.No : ' + record.No);
            // this.$emit('DetailInfo',record.No);
            
            console.log('move_detail..');
            // this.EventBus.$emit('rename','Content');
            this.$emit('rename','Content');
            this.$router.push("/admin/noticedetail/" + record.No);
        }
    }
}

</script>