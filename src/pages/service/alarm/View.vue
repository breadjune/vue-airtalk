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
              <p class="card-category">알림 메시지 목록 상세 조회</p>
              <hr>
            </template>
            <!-- <search v-bind="search" @btnClick="searchData"></search> -->
            <div style="overflow:auto">
              <!-- <l-table class="table-hover table-striped"
                      :headers="row.headers"
                      :columns="row.columns"
                      :data="row.data"
              >
              </l-table> -->
              <b-table
                id="receiver_table"
                striped
                :fields="fields"
                :items="row.data"
                :current-page="page.currentPage"
                :per-page="page.perPage"
              ></b-table>
            </div>
            <div :class="{nullData: row.default}" ref="nullData" style="text-align:center">데이터가 없습니다.</div>
            <br>
            <div>
              <b-button class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="primary" style="float:left" v-on:click="movePage">목록</b-button>
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
//   import Search from '../../../layout/Search.vue'
  
  import axioMixin from "@/components/axioMixin"

  const dataStore = "dataStore"
  // const tableHeaders = ['NO.', '수신자 ID', '전화번호', '수신여부', '수신시간']
  // const tableColumns = ['alarmSeq', 'userId', 'hpNo', 'receiveYn', 'receiveDate']

  export default {
    components: {
      LTable,
      Card,
    //   Search,
    },
    mixins: [axioMixin],
    data () {
      return {
        fields: [
          { key: "alarmSeq", label: "NO.", sortable: true},
          { key: "userId", label: "수신자 ID", sortable: true},
          { key: "hpNo", label: "전화번호", sortable: true},
          { key: "receiveYn", label: "수신여부", sortable: true},
          { key: "receiveDate", label: "수신시간", sortable: true},
        ],
        page: {
          currentPage: 1,
          perPage: 5,
          totalPage: 0
        },
        row: {
          default: false,
          // headers: [...tableHeaders],
          // columns: [...tableColumns],
          data: []
          // data: [...tableData]
        },
        form: {
          alarmSeq: ''
        }
      }
    },
    mounted() {
      this.form.alarmSeq = String(this.$route.params.row[0].seq);
      this.view();
    },
    computed: {
      rows() {
        return this.row.data.length * this.form.start;
      }
    },
    methods: {
      async view() {
        console.log("this seq Data : " + this.form.alarmSeq);

        var response = await this.request("/restapi/alarmRecv/list", this.form);
        console.log("Data : " + JSON.stringify(response));

        this.page.totalPage = response.total_cnt;
        if(this.page.totalPage !==0) this.row.default = true;
        else this.row.default = false;
        console.log("length : " + response.total_cnt);
        this.row.data = response.result;
      },
      movePage() {
        this.$emit('rename', 'Content');
        this.$router.push({
          name:"AlarmManage",
          params: {
            research: true
          }
        });
      }
    }
  }
</script>
<style>
</style>