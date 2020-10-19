<template>
<div class="content">
    <div class="container-fluid">
      <div class="row">

        <div class="col-12">
          
          <card>
            <template slot="header">
              <h4 class="card-title">Admin Manger</h4>
              <p class="card-category">계정 관리</p>
            </template>

            ID     : <input type="text" v-model="id" value=""><br>
            PW     : <input type="text" v-model="pw" value=""><br>
            RESULT : <input type="text" v-model="inputTest" value="" :disabled="validated ? disabled : ''"><br>
            {{ result }} <br>
            <b-button name="btn" class="btn-info btn-fill" variant="primary" id="getBtn" @click="getBtn">getBtn</b-button> &nbsp;
            <b-button name="btn" class="btn-info btn-fill" variant="primary" id="postBtn" @click="postBtn">postBtn</b-button><br>

          </card>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
      return {
          result : "",
          inputTest : "",
          id : "",
          validated : "",
          pw : ""
      }
  },
  
  methods:{
    getBtn() {
        alert("Hello! Spring type get!")
        axios.get('/admin/admin-list/getTest?title=getTestTitle').then(result => {
            alert(result.data);
        })
        .catch(e => {
            console.log('error : ' + e);
        })
    },

    postBtn() {
        let data = {
            id : this.id,
            pw : this.pw
        };
        alert("Hello! Spring type post!");

        console.log("id : " + this.id);
        console.log("pw : " + this.pw);

        axios.post('/admin/admin-list/postTest', data).then(result => {
            console.log("result.data : " + result.data);
            this.result = result.data;
            this.inputTest = result.data;
            alert(result.data);
        })
        .catch(e => {
            console.log('error : ' + e);
           })
        }
    }
}

</script>

