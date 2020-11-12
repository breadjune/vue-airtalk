<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-responsive"
          >
            <template slot="header">
              <h3 class="card-title">파일 게시판</h3>
              <p class="card-category">여기는 파일 업로드/다운로드 게시판 입니다.</p>
              <hr>
            </template>
            <search></search>
            <l-table class="table-hover table-striped"
                     :headers="row.headers"
                     :columns="row.columns"
                     :data="row.data"
                     @rowSelected="onRowSelected"
            >
            </l-table>
            <br>
            <div>
              <b-button
                class="btn-fill mb-2 mr-sm-2 mb-sm-1"
                variant="primary"
                @click="movePage()"
              >추가
              </b-button>
              <b-button
                class="btn-fill mb-2 mr-sm-2 mb-sm-1"
                variant="success"
              >다운로드
              </b-button>
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

  import axioMixin from "@/components/axioMixin"

  const dataStore = "dataStore"
  const tableHeaders = ['no', '제목', '작성자', '등록일',]
  const tableColumns = ['seq', 'title', 'writer', 'regDate']
  const tableData = [
    {
      seq: 1,
      title: "test1",
      writer: "test1",
      regDate: "test1",
    },
    {
      seq: 2,
      title: "test2",
      writer: "test2",
      regDate: "test2",
    },
    {
      seq: 3,
      title: "test3",
      writer: "test3",
      regDate: "test3",
    },
    {
      seq: 4,
      title: "test4",
      writer: "test4",
      regDate: "test4",
    },
    {
      seq: 5,
      title: "test5",
      writer: "test5",
      regDate: "test5",
    },
  ]
  export default {
    components: {
      LTable,
      Card,
      Search
    },
    mixins: [axioMixin],
    data () {
      return {
        row: {
          headers: [...tableHeaders],
          columns: [...tableColumns],
          data: []
          // data: [...tableData]
        },
        form: {
          keyword: '',
          type: ''
        }
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init: async function () {
        var res = await this.request("/rest/file/search.json", this.form);
        console.log("file board data : " + JSON.stringify(res));
        //   data.seq = JSON.stringify(res[i].seq).replace(/\"/g, "");
        this.row.data = res;
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