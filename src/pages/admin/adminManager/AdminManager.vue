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
  
  created() {
    this.getList()
  },
  methods: {
    getList() {
      axios
        .get("/admin/admin-list/adminSearch")
        .then((result) => {
          console.log(result.data);
          console.log("adminId : " +result.data.adminList.getAdminId);
          // this.adminId = result.data.amdinList.adminId;
          // this.adminName = result.data.amdinList.adminName;
          // this.adminGroupSeq = result.amdinList.data.adminGroupSeq;
          // this.regDate = result.data.amdinList.regDate;
          this.items.adminId.put(result.data.getAdminId);
          this.items.adminName.put(result.data.getAdminName);
          this.items.adminGroup.put(result.data.getAdminGroup);
          this.items.regDate.put(result.data.getRegDate);
        })
        .catch((e) => {
          console.log("error : " + e);
        });
    },
  }
};
</script>

