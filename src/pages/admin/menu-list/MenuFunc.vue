<template>
    <div>
        <h4>Menu_func</h4>
        <b-table sticky-header :items="items" head-variant="light"></b-table>
        <button v-on:click="chk">func check</button>
    </div>
</template>
<script>
export default {
    props:{
        id : Array,
        title : Array,
        points : Array,
        user : Array,
        time : Array,
        time_ago : Array,
        comments_count : Array,
        type : Array,
        url : Array,
        domain : Array
        // funcSeq : Array,
        // menuSeq : Array,
        // name : Array,
        // url : Array,
        // auth : Array,
        // description : Array,
        // regDate : Array,
        // modDate : Array
    },
    data() {
      return {
        items: []
      }
    },
    methods : {
        chk(){
            console.log("this.props.funcSeq : " +this.props.funcSeq);
            console.log("this.props.map(x=>x.funcSeq : " + this.props.map(x=>x.funcSeq));
        }
    },
    created(){
        console.log('func page');
        console.log('length : ' + this.id.length);
        for(var i = 0; i<this.id.length; i++){
            this.items.push({ NAME: this.id[i], URL: this.type[i], AUTH: this.url[i], aa:''});
        }

    }
}
</script>