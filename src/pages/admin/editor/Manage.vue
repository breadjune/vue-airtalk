<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-responsive"
          >
            <template slot="header">
              <h3 class="card-title">글쓰기 게시판</h3>
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
                <b-pagination 
                v-show="row.default"
                v-model="page.currentPage"
                :total-rows="page.totalPage"
                :per-page="page.perPage"
                @change="handle"
                aria-controls="my-table"
                style="position:relative;justify-content:center; margin-bottom:0;"
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
  // import editorTable from './editorTable.vue'
  import axios from 'axios'
  import axioMixin from "@/components/axioMixin"
  const tableHeaders = ['No.', '제목', '작성자', '등록일']
  const tableColumns = ['editorSeq', 'title', 'adminId', 'regDate']

  export default {
    components: {
      LTable,
      Card,
      Search,
      // editorTable,
    },
    mixins: [axioMixin],
    data () {
      return {
        createChk: true,
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
          // data: [...tableData],
        },
      form: {
             keyword: '',
             type: ''
          },
           fields: [
        { key:'editorSeq', label:'No.',sortable: true, }, 
        { key:'title', label:'제목' ,sortable: true,}, 
        { key:'adminId', label:'작성자' ,sortable: true,}, 
        { key:'regDate', label:'등록일' ,sortable: true,}
      ],
       options: [
          { value: "title", text: tableHeaders[1] },
          { value: tableColumns[2], text: tableHeaders[2] },
        ],
      }
    },
    mounted () {
      this.init();
    },
    methods: {
        init: async function () {
        var res = await this.request("/restapi/editor/search.json", this.form);
        console.log("editor data : " + JSON.stringify(res));
        this.row.data = res;
      },
      onRowSelected(items) {
        console.log("items "+JSON.stringify(items));
        this.$emit('rename', 'Content');
        this.$router.push({
        name: "EditorInfo",
        params: {
          editorSeq: items.editorSeq,
          title: items.title,
          adminId: items.adminId,
          regDate: items.regDate,
          contents: items.contents, 
          createChk: false,
        },
      });
      },
      movePage() {
        this.$emit('rename', 'Content');
         this.$router.push({
          name: "EditorCreate",
            params: {
              adminId: this.$session.get("name"),
              createChk: this.createChk,
        },
      });
      }
    },
  }
</script>
<style>
</style>