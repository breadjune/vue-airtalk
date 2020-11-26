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
              <p class="card-category">여기는 글을 쓸수 있는 게시판 입니다.</p>
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
            
              <div>
                <br>
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
  const tableHeaders = ['no', '제목', '작성자', '등록일']
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
        row: {
          headers: [...tableHeaders],
          columns: [...tableColumns],
          data: [],
          // data: [...tableData],
        },
      form: {
             keyword: '',
             type: ''
          }
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