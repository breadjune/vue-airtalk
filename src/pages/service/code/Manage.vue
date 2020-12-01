<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-responsive"
          >
            <template slot="header">
              <h3 class="card-title">서비스 코드 관리</h3>
              <hr>
            </template>
            <search :options="options" @keywordSearch="searchData"></search>
            <l-table class="table-hover table-striped"
                     id="my-table"
                     :headers="row.headers"
                     :columns="row.columns"
                     :data="row.data"
                     :per-page="perPage"
                     :current-page="currentPage"
                     @rowSelected="onRowSelected"
            >
          <!-- <template #cell(show_details)>
             <b-button size="sm" @click="test" class="mr-2">
           {{ row.detailsShowing ? 'Hide' : 'Show'}} 삭제
           </b-button>
          </template> -->
            </l-table>
            <div id="noData" v-if="row.noData" style="text-align:center; height:100px">
              데이터가 없습니다.
            </div>
              <div>   
              <b-pagination 
                v-show="row.default"
                v-model="page.currentPage"
                :total-rows="page.totalPage"
                :per-page="page.perPage"
                @change="handle"
                aria-controls="my-table"
                style="position:relative;justify-content:center;margin-bottom:0;margin-top:1rem"
              ></b-pagination>
                 <b-button class="btn btn-fill mb-2 mr-sm-2 mb-sm-1"
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
  import Search from '@/layout/Search.vue'
  import axios from 'axios'
  import axioMixin from "@/components/axioMixin"
  const tableHeaders = [ 'NO.','Code', 'Code 이름', '등록일']
  const tableColumns = [ 'seq','code', 'codeName', 'regDate']
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
          perPage: 4,
          totalPage: 0
        },
        row: {
          default: true,
          noData: false,
          headers: [...tableHeaders],
          columns: [...tableColumns],
          data: [],
        },
      form: {
          keyword: '',
          type: 'all',
          start: '0',
          length: ''
          },
        options: [
            {value: "code", text: tableHeaders[1]},
            {value: tableColumns[2], text: tableHeaders[2]}
          ],

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
        // var res = await this.request("/restapi/svcCode/list", this.form);
        // console.log("Cdoe data : " + JSON.stringify(res));
        this.page.totalPage = await this.request("/restapi/svcCode/count",this.form);
        console.log("카운트" + this.page.totalPage);
        this.form.length = String(this.page.perPage);
        var res = await this.request("/restapi/svcCode/search", this.form);
        //seq 추가
        for (var i = 0; i <res.length ; i++ )
        {res[i]['seq'] = i+1;} 
        this.row.data = res;
      },
    //페이지 핸들
      async handle(page) {
        console.log("page : " + page);
        console.log("current Page : " + this.page.currentPage);
        this.form.start = String(page-1);
        var response = await this.request("/restapi/svcCode/search", this.form);
        //seq 추가
        for (var i = 0; i <response.length ; i++ )
        {response[i]['seq'] = (4*page)-3+i; } 
        this.row.data = response;
        },
      async searchData(form) {
        if(form.searchWord === null || form.searchWord === "") {
          alert("검색어를 입력하세요.")
        }
        else {
          this.form.keyword = form.searchWord;
          if(form.searchType == "default") {this.form.type = "code";}
          else {this.form.type = form.searchType;}
          this.form.start = "0";
          this.form.length = String(this.page.perPage);
          this.page.totalPage = await this.request("/restapi/svcCode/count", this.form);

          //데이터 없음 화면 및 페이징 UI 변경
          if(this.page.totalPage !== 0) {
            this.row.default = true;
            this.row.noData = false
          }
          else {
            this.row.default = false;
            this.row.noData = true;
          }
          var response = await this.request("/restapi/svcCode/search", this.form);
          console.log("code Data : " + JSON.stringify(response));
         //seq 추가
          for (var i = 0; i <response.length ; i++ )
          { response[i]['seq'] = i+1; } 
        this.row.data = response;
        } 
      },
      onRowSelected(items) {
        console.log("items "+JSON.stringify(items));
        this.$emit('rename', 'Content');
        this.$router.push({
        name: "CodeView",
        params: { 
            code : items.code,
            codeName: items.codeName,
            regDate: items.regDate,
        },
      });
      },
      movePage() {
        this.$emit('rename', 'Content');
        this.$router.push("/service/codeCreate");
      },
      
    },
  }
</script>
<style TYPE="text/css">

#my-table ,#noData{
  font-size: 0.8rem;
  height: calc(1.5em + 0.75rem + 4px);
  color: rgb(100, 100, 100);
  }

#text{
 color: rgb(100, 100, 100);
 font-size: 0.8rem;
}

body{
  font-size: 0.8rem;
}

#my-table > thead > tr > th {
    font-weight: bold;
 }
 

</style>