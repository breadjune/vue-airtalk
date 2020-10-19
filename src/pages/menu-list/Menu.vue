
<template>
    <div id='vuetest'>
      
       vuetest
       <button @click="testclick" style="width=50px ; height=50px" id='btn' name='btn'> get</button><br>
       <form name="loginform">
          ID  : <input type="text" v-model="id"><br>
          PWD : <input type="text" v-model="pwd"><br>
          {{ result }}
       </form>
       <button v-on:click="postclick" style="width=50px ; height=50px" id='postbtn' name='postbtn'> post</button>
       <button v-on:click="movePage"  style="width=50px ; height=50px">movePage</button><br>
       <router-link to="/admin/movePage">link</router-link>
       <component-child v-bind:propsdata="str"></component-child>
       <component-child2 v-on:renew="renewStr"></component-child2>
    </div>
</template>

<script>
import axios from 'axios'
import child from './child'
import child2 from './child2'

export default {
  name: 'vuetest',
  components : {
    'component-child' : child,
    'component-child2' : child2
  },
  data() {
    return {
      result :"abc",
      id : "",
      pwd : "",
      str : "hello world!",
    }
  },
  created(){
    this.create();
  },
  methods: {
    create(){
        console.log('created!');
    },
    movePage : function(event){
        this.$router.push('/admin/movePage')
    },
    renewStr(param){
        console.log(param)
        this.str="renewStr - child2"
    },
    testclick() {
        console.log('getclick()');
        try {
            var id = this.id;
            var pwd = this.pwd;

            //방법 1
            //var url = '/gettest?test1='+id+'&test2='+pwd;

            //const res = axios.get(url).then((result) => {
            //방법 2 
            const res = axios.get('/admin/menu/gettest', {params: {
              test1 : id,
              test2 : pwd
            }}).then((result) => {
              console.log(result.data);
                // var res = result.data;

                // this.$router.push({
                //     name: res
                // });
            });
        } catch (error) {
                console.log(error);
        }
    },
    postclick(){
      console.log('postclick()');

      let data = {
        id : this.id,
        pwd : this.pwd
      }

      try {
            const res = axios.post('/admin/menu/posttest',data).then((result) => {
                var res = result.data;
                console.log('result : ' + res)
                this.result = (res==1) ? 'SUCC' : 'fail'
            });
        } catch (error) {
                console.log(error);
        }
    }
  },
}


</script>

<style>
</style>