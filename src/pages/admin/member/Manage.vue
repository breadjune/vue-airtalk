<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h3 class="card-title">계정 관리</h3>
              <hr>
            </template>
            <search :options="options" @keywordSearch="searchData"></search>
            <b-table
                id="my-table"
                striped
                hover
                selectable
                select-mode="single"
                sort-icon-left
                :fields="fields"
                :items="row.data"
                :per-page="page.perPage"
                @row-selected="onRowSelected"
            ></b-table>
             <div id="noData" v-if="row.noData" style="text-align:center; height:100px">
              데이터가 없습니다.
            </div>
            <b-pagination
              v-show="row.default"
              v-model="page.currentPage"
              :total-rows="page.totalPage"
              :per-page="page.perPage"
              @change="handle"
              aria-controls="my-table"
              style="position:relative;justify-content:center;margin-bottom:0;"
            ></b-pagination>
              <div>
                <b-button
                  class="btn-fill mb-2 mr-sm-2 mb-sm-1"
                  variant="primary"
                  @click="create()">
                  추가
                </b-button>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import Search from '@/layout/Search.vue'
import axioMixin from "@/components/axioMixin";

 export default {
    components: {
      Search,
    },
  mixins: [axioMixin],
  data() {
    return {
       page: {
        currentPage: 1,
        perPage: 4,
        totalPage: 0,
      },
      row: {
        default: true,
        noData: false,
        data: [],
      },
      fields: [
        { key:'adminId', label:'사용자ID',sortable: true, }, 
        { key:'adminName', label:'사용자명' ,sortable: true,}, 
        { key:'adminGroupSeq', label:'사용자그룹' ,sortable: true,}, 
        { key:'regDate', label:'등록일' ,sortable: true,}
      ],
      form: {
        keyword: "",
        type: "all",
        start: "0",
        length: "",
      },
      options: [
        {value: "adminId", text: '사용자ID' },
        {value: 'adminName', text: '사용자명'}
      ],

    }
  },
  
  mounted() {
    this.init();
  },
  
  methods: {
    // list: function() {
    //   axios.get("/rest/admin/search.json").then((result) => {
    //     for (var i = 0; i < result.data.length; i++) {
    //       var data = new Object;
    //       data.adminId = JSON.stringify(result.data[i].adminId).substring(1, JSON.stringify(result.data[i].adminId).length - 1);
    //       data.adminName = JSON.stringify(result.data[i].adminName).substring(1, JSON.stringify(result.data[i].adminName).length - 1);
    //       data.adminGroupSeq = JSON.stringify(result.data[i].adminGroup.name).substring(1, JSON.stringify(result.data[i].adminGroup.name).length - 1);
    //       data.regDate = JSON.stringify(result.data[i].regDate).substring(1, 11);
    //       this.items.push(data);
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    // },
      init: async function () {
      this.page.totalPage = await this.request("/rest/admin/count",this.form);
      console.log("카운트" + this.page.totalPage);
      this.form.length = String(this.page.perPage);
      var res = await this.request("/rest/admin/search", this.form);
      console.log("admin data : " + JSON.stringify(res));
      this.row.data = res;
    },
     async handle(page) {
      console.log("page : " + page);
      console.log("current Page : " + this.page.currentPage);
      this.form.start = String(page - 1);
      var response = await this.request("/rest/admin/search", this.form);
      this.row.data = response;
    },
    async searchData(form) {

        this.form.keyword = form.searchWord;
        if (form.searchType == "default") {
          console.log(form.searchType);
          this.form.type = "adminId";
        } else {
          this.form.type = form.searchType;
        }
        this.form.start = "0";
        this.form.length = String(this.page.perPage);
        this.page.totalPage = await this.request("/rest/admin/count",this.form);
        
        //데이터 없음 화면 및 페이징 UI 변경
        if (this.page.totalPage !== 0) {
          this.row.default = true;
          this.row.noData = false;
        } else {
          this.row.default = false;
          this.row.noData = true;
        }
         var response = await this.request("/rest/admin/search", this.form);
          console.log("admin Data : " + JSON.stringify(response));
         this.row.data = response;
    },
  
    onRowSelected(param) {
      this.$emit('rename', 'Content');
      this.$router.push({
        name: "MemberView",
        params: { 
          adminId : param[0].adminId,
        },
      });
    },
    create() {
      this.$emit('rename', 'Content');
      this.$router.push("/admin/member-create");
    }
  }
};
</script>