<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-responsive"
          >
            <template slot="header">
              <h3 class="card-title">알림 관리</h3>
              <p class="card-category">알림 메시지 목록 조회 게시판</p>
              <hr>
            </template>
            <search v-bind="search" @btnClick="searchData"></search>
            <div style="overflow:auto">
              <l-table class="table-hover table-striped"
                      :headers="row.headers"
                      :columns="row.columns"
                      :data="row.data"
                      @rowSelected="onRowSelected"
              >
              </l-table>
            </div>
            <div :class="{nullData: row.default}" ref="nullData" style="text-align:center">데이터가 없습니다.</div>
            <br>
            <div>
              <b-pagination
                v-model="page.currentPage"
                :total-rows="page.totalPage"
                :per-page="page.perPage"
                @change="handle"
                aria-controls="my-table"
              ></b-pagination>
            </div>
          </card>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import LTable from '../../../layout/Table.vue'
  import Card from 'src/components/Cards/Card.vue'
  import Search from '../../../layout/Search.vue'
  // import PageLink from '../../../layout/Pagination.vue'

  import axios from 'axios'
  import axioMixin from "@/components/axioMixin"

  const dataStore = "dataStore"
  const tableHeaders = ['no.', '사용자 ID', '내용', '서비스 코드', '위도', '경도', '건물 명', '발송 예약시간', '등록시간', '수정시간']
  const tableColumns = ['seq', 'userId', 'message', 'code', 'latitude', 'longitude', 'bdNm', 'reservDate', 'regDate', 'modDate']

  export default {
    components: {
      LTable,
      Card,
      Search,
      // PageLink
    },
    mixins: [axioMixin],
    data () {
      return {
        page: {
          currentPage: 1,
          perPage: 7,
          totalPage: 0
        },
        row: {
          default: false,
          headers: [...tableHeaders],
          columns: [...tableColumns],
          data: []
          // data: [...tableData]
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
            {value: tableColumns[3], text: tableHeaders[3]}
          ]
        }
      }
    },
    computed: {
      rows() {
        return this.row.data.length
      }
    },
    methods: {
      async handle(page) {
        console.log("page : " + page);
        console.log("current Page : " + this.page.currentPage);
        this.form.start = String(page-1);
        var response = await this.request("/restapi/alarm/list", this.form);
        this.row.data = response.result;
      },
      async searchData(form) {
        if(form.searchWord === null || form.searchWord === "") {
          alert("검색어를 입력하세요.")
        } else {
          this.form.keyword = form.searchWord;
          if(form.searchType == "default") {this.form.type = "userId";}
          else {this.form.type = form.searchType;}
          this.form.start = "0";
          this.form.length = String(this.page.perPage);

          this.page.totalPage = await this.request("/restapi/alarm/count", this.form);

          if(this.page.totalPage !== 0) this.row.default = true;
          else this.row.default = false

          var response = await this.request("/restapi/alarm/list", this.form);
          console.log("alarm Data : " + JSON.stringify(response.result));

          this.row.data = response.result;

        } 
      },
      onRowSelected(items) {
        console.log("items "+JSON.stringify(items));
        this.$emit('rename', 'Content');
        this.$router.push({
          name:"AlarmView",
          params: items
        })
      },
      movePage() {
        this.$emit('rename', 'Content');
        this.$router.push({
          name:"FileCreate",
        });
      }
    }
  }
</script>
<style>
</style>