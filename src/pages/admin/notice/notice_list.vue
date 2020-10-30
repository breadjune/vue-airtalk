<template>
    <b-table striped hover :items="items"></b-table>
</template>
<script>
export default {
    props:{
        // id : Array,
        // title : Array,
        // points : Array,
        // user : Array,
        // time : Array,
        // time_ago : Array,
        // comments_count : Array,
        // type : Array,
        // url : Array,
        // domain : Array
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
        // id(){
        //     console.log('watch _ id : ' + this.id[0]);
        //     for(var i=0; i<3; i++){
        //         var data = new Object();
            
        //         data.No=this.id[i];
        //         data.title=this.title[i];
        //         data.user=this.user[i];
        //         this.items.push(data);
        //     }
        // }
    }
}

</script>