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
            <br>
            <div>
              <b-pagination
                v-model="page.currentPage"
                :total-rows="page.totalPage"
                :per-page="page.perPage"
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
  import PageLink from '../../../layout/Pagination.vue'

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
      PageLink
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
          headers: [...tableHeaders],
          columns: [...tableColumns],
          data: []
          // data: [...tableData]
        },
        form: {
          keyword: '',
          type: '',
          start: '1',
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
    mounted() {
    },
    computed: {
      rows() {
        return this.row.data.length
      }
    },
    methods: {
      async searchData(form) {
        console.log("search form data : " + form.searchWord);
        if(form.searchWord === null || form.searchWord === "") {
          alert("검색어를 입력하세요.")
        } else {
          this.form.keyword = form.searchWord;
          this.form.type = form.searchType;

          var response = await this.request("/restapi/alarm/list", this.form);
          console.log("alarm Data : " + JSON.stringify(response));

          this.page.totalPage = response.length;
          this.row.data = response;


        }
        
      },
      onRowSelected(items) {
        console.log("items "+JSON.stringify(items));
        this.$emit('rename', 'Content');
        this.$router.push({
          name:"FileView",
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