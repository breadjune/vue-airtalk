<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title">계정 관리</h4>
            </template>
            <div>
              <b-button
                class="btn-fill mb-2 mr-sm-2 mb-sm-1"
                variant="primary"
                @click="movePage()">
                추가
              </b-button>
            </div>
            <b-table
                striped
                hover
                outlined
                ref="selectableTable"
                selectable
                select-mode="single"
                :fields="fields"
                :items="items"
                @row-selected="onRowSelected">
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
      fields: [
        { key:'adminId', label:'사용자ID' }, 
        { key:'adminName', label:'사용자명' }, 
        { key:'adminGroupSeq', label:'사용자그룹' }, 
        { key:'regDate', label:'등록일' }
      ],
      items: []
    }
  },
  
  mounted() {
    this.list()
  },
  
  methods: {
    list: function() {
      axios.get("/rest/admin-list/adminList").then((result) => {
        
        for (var i = 0; i < result.data.length; i++) {
          var data = new Object;
          data.adminId = JSON.stringify(result.data[i].adminId).substring(1, JSON.stringify(result.data[i].adminId).length - 1);
          data.adminName = JSON.stringify(result.data[i].adminName).substring(1, JSON.stringify(result.data[i].adminName).length - 1);
          data.adminGroupSeq = JSON.stringify(result.data[i].adminGroup.name).substring(1, JSON.stringify(result.data[i].adminGroup.name).length - 1);
          data.regDate = JSON.stringify(result.data[i].regDate).substring(1, 11);
          this.items.push(data);
        }

      })
      .catch((e) => {
        console.log(e);
      });
    },
    
    onRowSelected(param) {

      this.$emit('rename', 'Content');
      this.$router.push({
        name: "AdminInfo",
        params: { 
          adminId : param[0].adminId,
        },
      });
    },
  }
};
</script>