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
              <l-table class="table-hover table-striped"
                      :headers="row.headers"
                      :columns="row.columns"
                      :data="row.data"
              >
              </l-table>
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
  const tableHeaders = ['no.', '수신자 ID', '전화번호', '수신여부', '수신시간']
  const tableColumns = ['alarmSeq', 'userId', 'hpNo', 'receiveYn', 'receiveDate']

  export default {
    components: {
      LTable,
      Card,
    //   Search,
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
          alarm_seq: ''
        },
        // search: {
        //   options: [
        //     {value: "default", text: tableHeaders[1]},
        //     {value: tableColumns[3], text: tableHeaders[3]}
        //   ]
        // }
      }
    },
    mounted() {
      this.form.alarm_seq = String(this.$route.params.seq);
      this.view();
    },
    computed: {
      rows() {
        return this.row.data.length * this.form.start;
      }
    },
    methods: {
      // async handle(page) {
      //   this.form.start = String(page-1);
      //   var response = await this.request("/restapi/alarmRecv/list", this.form);
      //   this.row.data = response.result;
      // },
      async view() {
        console.log("seq Data : " + this.form.alarm_seq);

        var response = await this.request("/restapi/alarmRecv/list", this.form);
        console.log("alarm Data : " + JSON.stringify(response.result));

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
        });
      }
    }
  }
</script>
<style>
</style>