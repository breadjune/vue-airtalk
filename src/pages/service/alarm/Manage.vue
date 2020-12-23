<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover">
            <template slot="header">
              <h3 class="card-title">알림 관리</h3>
              <hr>
            </template>
            <search :options="options" @keywordSearch="searchData"></search>
            <div style="overflow-x:scroll">
              <b-table
                id="table"
                striped
                hover
                table-class="text-nowrap"
                selectable
                select-mode="single"
                :fields="fields"
                :items="row.data"
                sort-icon-left
                :per-page="page.perPage"
                @row-selected="onRowSelected"
              ></b-table>
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
                style="position:relative;justify-content:center;margin-bottom:0;"
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
  // const tableHeaders = ['no.', '사용자 ID', '내용', '서비스 코드', '위도', '경도', '건물 명', '발송 예약시간', '등록시간', '수정시간']
  // const tableColumns = ['seq', 'userId', 'message', 'code', 'latitude', 'longitude', 'bdNm', 'reservDate', 'regDate', 'modDate']

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
        fields: [
          { key: "seq", label: "NO.", sortable: true},
          { key: "userId", label: "사용자 ID", sortable: true},
          { key: "message", label: "내용", sortable: true},
          { key: "code", label: "서비스 코드", sortable: true},
          { key: "latitude", label: "위도", sortable: true},
          { key: "longitude", label: "경도", sortable: true},
          { key: "bdNm", label: "건물 명", sortable: true},
          { key: "reservDate", label: "발송 예약시간", sortable: true},
          { key: "regDate", label: "등록시간", sortable: true},
          { key: "modDate", label: "수정시간", sortable: true}
        ],
        page: {
          currentPage: 1,
          perPage: 7,
          totalPage: 9999
        },
        row: {
          default: false,
          data: []
        },
        form: {
          type: '',
          keyword: '',
        },
        options: [
          { value: "userId", text: "사용자 ID"},
          { value: "code", text: "서비스 코드"}
        ]
      }
    },
    computed: {
      rows() {
        return this.row.data.length
      }
    },
    mounted() {
      if(this.$route.params.research) {
        this.reSearch();
      }
    },
    methods: {
      async searchData(form) {
        console.log("form : " + JSON.stringify(form));
        if(form.searchWord === null || form.searchWord === "") {
          alert("검색어를 입력하세요.")
        } else {
          
          this.form.type = form.searchType;
          this.form.keyword = form.searchWord;
          var formData = this.form;
          formData.start = "0";
          formData.length = String(this.page.perPage);

          var response = await this.request("/restapi/alarm/list", formData);
          console.log("response Data : " + JSON.stringify(response));

          this.row.data = response.result;
          this.page.totalPage = response.total_cnt;

          console.log("this Data : " + JSON.stringify(this.row.data));

          this.$session.set('type', form.searchType);
          this.$session.set('keyword',form.searchWord);
          this.$session.set('totalPage', response.total_cnt);

          if(this.page.totalPage !== 0) this.row.default = true;
          else this.row.default = false

        } 
      },
      async reSearch() {
        var page = this.$session.get('page');
        var type = this.$session.get('type');
        var keyword = this.$session.get('keyword');
        var totalPage = this.$session.get('totalPage');

        console.log("session : "+page+"/"+type+"/"+keyword+"/"+totalPage);

        this.form.type = type !== undefined ? type : "";
        this.form.keyword = keyword !== undefined ? keyword : "";

        var formData = this.form;
        formData.start = page !== undefined ? page-1 : 0;
        formData.length = String(this.page.perPage);

        var response = await this.request("/restapi/alarm/list", formData);

        this.row.data = response.result;
        this.page.totalPage = response.total_cnt;

        this.page.currentPage = page !== undefined ? page : 1;

        if(this.page.totalPage !== 0) this.row.default = true;
          else this.row.default = false

      },
      async handle(page) {
        console.log("page : " + page);
        var formData = this.form;
        formData.start = String(page-1);
        formData.length = String(this.page.perPage);
        var response = await this.request("/restapi/alarm/list", formData);
        console.log("response Data : " + JSON.stringify(response));
        this.row.data = response.result;
        console.log("this Data : " + JSON.stringify(this.row.data));
        this.$session.set('page', (String)(page));
      },
      onRowSelected(items) {
        console.log("items : "+JSON.stringify(items));
        this.$emit('rename', 'Content');
        this.$router.push({
          name:"AlarmView",
          params: {
            row: items
          }
        })
      }
    }
  }
</script>
<style>
body {
 overflow-x: hidden;
}
</style>