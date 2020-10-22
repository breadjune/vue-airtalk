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
        funcSeq : Array,
        menuSeq : Array,
        name : Array,
        url : Array,
        auth : Array,
        description : Array,
        regDate : Array,
        modDate : Array
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
        console.log('length : ' + this.funcSeq.length);
        for(var i = 0; i<this.funcSeq.length; i++){
            this.items.push({ NAME: this.funcSeq[i], URL: this.funcSeq[i], AUTH: this.funcSeq[i], aa:''});
        }

    }
}
</script>