<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive">

            <template slot="header">
              <h4 class="card-title">Admin Manger</h4>
              <p class="card-category">계정 관리</p>
            </template>
            <b-table
                striped
                hover
                ref="selectableTable"
                selectable
                select-mode="single"
                :fields="fields"
                :list="list"
                @row-selected="onRowSelected">
              <!-- <tr v-for="(item, index) in items" :key="index">
                <td>{{item.adminId}}</td>
                <td>{{item.adminName}}</td>
                <td>{{item.adminGroupSeq}}</td>
                <td>{{item.regDate}}</td>
                <td><button name="test" value="test">test</button></td>
              </tr> -->
              </b-table>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      list: {
        adminId : '', 
        adminName : '', 
        adminGroupSeq : '', 
        regDate : ''
      },
      fields: ['사용자ID', '사용자이름', '사용자그룹', '등록일'],
      items: {
        adminId: Array, 
        adminName: Array, 
        adminGroup: Array, 
        regDate: Array
      }
    }
  },
  
  methods:{
    getBtn() {
        alert("Hello! Spring type get!")
        axios.get('/rest/admin-list/getTest?title=getTestTitle').then(result => {
            alert(result.data);
        })
        .catch(e => {
            console.log('error : ' + e);
        })
        .catch((e) => {
          console.log("error : " + e);
        });
    },

    postBtn() {
        let data = {
            id : this.id,
            pw : this.pw
        };
        alert("Hello! Spring type post!");

        console.log("id : " + this.id);
        console.log("pw : " + this.pw);

        axios.post('/rest/admin-list/postTest', data).then(result => {
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

