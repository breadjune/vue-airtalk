<template>
    <div>
        <h4>Menu_func</h4>
        <v-simple-table>
            <thead>
                <tr>
                <th class="text-left">
                    Name
                </th>
                <th class="text-left">
                    Calories
                </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="ids in id" v-bind:key="ids">
                    {{ ids }}
                </tr>
            </tbody>
        </v-simple-table>
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
          id : this.id,
          title : this.title,
          points : this.points,
          user : this.user,
          time : this.time,
          time_ago : this.tim_age,
          comments_count : this.comments_count,
          type : this.type,
          url : this.url,
          domain : this.domain
      }
    },
    methods : {
        chk(){
            console.log("func api - chk()")
            console.log("this.props.funcSeq : " +this.props.id);
            console.log("this.props.map(x=>x.funcSeq : " + this.props.map(x=>x.id));
        }
    },
    // created(){
    //     console.log('func api');
    //     console.log('this : ' + this.id);
    //     console.log('length : ' + this.id.length);
    //     for(var i = 0; i<this.id.length; i++){
    //         this.items.push({ NAME: this.id[i], URL: this.type[i], AUTH: this.url[i], aa:''});
    //     }

    // }
}
</script>