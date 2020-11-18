<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-responsive"
          >
            <template slot="header">
              <h3 class="card-title">사용자 관리</h3>
              <p class="card-category">이곳은 사용자 관리 페이지 입니다.</p>
              <hr>
            </template>
            <search v-bind="search" @btnClick="searchData"></search>
            <l-table class="table-hover table-striped"
                     id="my-table"
                     :headers="row.headers"
                     :columns="row.columns"
                     :data="row.data"
                     :per-page="perPage"
                     :current-page="currentPage"
                     @rowSelected="onRowSelected"
            >
            </l-table>

             <b-pagination
                v-model="page.currentPage"
                :total-rows="page.totalPage"
                :per-page="page.perPage"
                @change="handle"
                aria-controls="my-table"
              ></b-pagination>
            
              <div>
                <b-button
                  class="btn-fill mb-2 mr-sm-2 mb-sm-1"
                  variant="primary"
                  @click="movePage()"
                  >추가
                </b-button>
              </div>

          </card>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import LTable from '@/layout/Table.vue'
  import Card from 'src/components/Cards/Card.vue'
  import Search from '../../../layout/Search.vue'
  import axios from 'axios'
  import axioMixin from "@/components/axioMixin"
  const tableHeaders = [ 'NO','사용자 ID', '이름', '핸드폰 번호' ,'등록일']
  const tableColumns = [ 'seq','id', 'name', 'hpNo' ,'regDate']
  export default {
    components: {
      LTable,
      Card,
      Search,
    },
    mixins: [axioMixin],
    data () {
      return {
      page: {
          currentPage: 1,
          perPage: 2,
          totalPage: 0
        },
        row: {
          headers: [...tableHeaders],
          columns: [...tableColumns],
          data: [],
        },
      form: {
          keyword: '',
          type: '',
          start: '0',
          length: ''
          },
      search: {
        options: [
            {value: "default", text: tableHeaders[1]},
            {value: tableColumns[2], text: tableHeaders[2]}
          ]
        }
      }
    },
     computed: {
      rows() {
        return this.row.data.length
      }
    },
    mounted () {
      this.init();
    },
    methods: {
        init: async function () {
        var res = await this.request("/restapi/user/list", this.form);
        console.log("User data : " + JSON.stringify(res));
       
        //seq 추가
        for (var i = 0; i <res.length ; i++ ){
          res[i]['seq'] = i+1; 
          console.log("User data : " + JSON.stringify(res[i]));
        } 
        this.row.data = res;
      },
      async handle(page) {
        console.log("page : " + page);
        console.log("current Page : " + this.page.currentPage);
        this.form.start = String(page-1);
        var response = await this.request("/restapi/user/search", this.form);
        this.row.data = response;
      },
      async searchData(form) {
        if(form.searchWord === null || form.searchWord === "") {
          alert("검색어를 입력하세요.")
        } else {
          this.form.keyword = form.searchWord;
          if(form.searchType == "default") {this.form.type = "id";}
          else {this.form.type = form.searchType;}
          this.form.start = "0";
          this.form.length = String(this.page.perPage);

          console.log("search : " + this.form.keyword);
          console.log("type : " + this.form.type);
          console.log("start : " + this.form.start);
          console.log("length : " + this.form.length);

          this.page.totalPage = await this.request("/restapi/user/count", this.form);

          var response = await this.request("/restapi/user/search", this.form);
          console.log("alarm Data : " + JSON.stringify(response));
         //seq 추가
         for (var i = 0; i <response.length ; i++ ){
            response[i]['seq'] = i+1; 
            console.log("Code data : " + JSON.stringify(response[i]));
         } 
          this.row.data = response;

        } 
      },
      onRowSelected(items) {
        console.log("items "+JSON.stringify(items));
        this.$emit('rename', 'Content');
        this.$router.push({
        name: "UserView",
        params: { 
            id : items.id,
            name: items.name,
            password: items.password,
            hpNo: items.hpNo,
            regDate: items.regDate,
        },
      });
      },
      movePage() {
        this.$emit('rename', 'Content');
        this.$router.push("/service/userCreate");
      }
    },
  }
</script>
<style>
</style>