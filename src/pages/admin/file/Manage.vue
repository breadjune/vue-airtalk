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
                     :data="row.data">
            </l-table>
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
// import func from '../../../../vue-temp/vue-editor-bridge'

  const tableHeaders = ['no', '제목', '작성자', '등록일']
  const tableColumns = ['seq', 'title', 'writer', 'regdate']
  const tableData = [{
    seq: 1,
    title: '파일업로드 타이틀 1',
    writer: '작성자 1',
    regdate: '2020-11-06 09:10'
  },
  {
    seq: 2,
    title: '파일업로드 타이틀 2',
    writer: '작성자 2',
    regdate: '2020-11-06 09:10'
  },
  {
    seq: 3,
    title: '파일업로드 타이틀 3',
    writer: '작성자 3',
    regdate: '2020-11-06 09:10'
  },
  {
    seq: 4,
    title: '파일업로드 타이틀 4',
    writer: '작성자 4',
    regdate: '2020-11-06 09:10'
  },
  {
    seq: 5,
    title: '파일업로드 타이틀 5',
    writer: '작성자 5',
    regdate: '2020-11-06 09:10'
  }]
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
        var array = new Array;
        var data = new Object;
        for(var i=0; i < res.length; i++) {
          data.seq = JSON.stringify(res[i].seq).replace(/\"/g, "");
          data.title = JSON.stringify(res[i].title).replace(/\"/g, '');
          data.writer = JSON.stringify(res[i].writer).replace(/\"/g, '');
          data.regDate = JSON.stringify(res[i].regDate).replace(/\"/g, '');

          console.log("json data column : " + JSON.stringify(data.writer));

          array.push(data);
        }

        // data.seq = res.seq
        // data.title = res.map(x=>x.title);
        // data.writer = res.map(x=>x.writer);
        // data.regDate = res.map(x=>x.regDate);

        console.log("file board data : " + JSON.stringify(array));
        //this.$store.dispatch("dataStore/selectList", data);
      }
    }
  }
</script>
<style>
</style>