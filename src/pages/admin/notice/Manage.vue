<template>
  <board
    :title="title"
    :subTitle="subTitle"
    :fields="fields"
    :data="data"
    :pageSet="pageSet"
    :options="options"
    @onPageSelected="pageSelected"
    @onKeywordSearched="keywordSearched"
    @onRowSelected="rowSelected"
  ></board>
</template>
<script>
  import board from "../../../layout/Board.vue"
  import axioMixin from "@/components/axioMixin"

  const dataStore = "dataStore"
  const tableHeaders = ['no', '제목', '작성자', '등록일',]
  const tableColumns = ['boardSeq', 'title', 'writer', 'regDate']
  export default {
    components: {
      board
    },
    data () {
      return {
        title: '공지 게시판',
        subTitle: '공지 게시판 데모 페이지 입니다.',
        fields: [
          { key: "seq", label: "NO.", sortable: true},
          { key: "title", label: "제목", sortable: true},
          { key: "writer", label: "작성자", sortable: true},
          { key: "regDate", label: "등록일", sortable: true},
        ],
        data: [
          { seq: 1, title: "test1", writer: "test1", contents: "test1", regDate: "2020.11.24 13:30"},
          { seq: 2, title: "test2", writer: "test2", contents: "test2", regDate: "2020.11.24 13:30"},
          { seq: 3, title: "test3", writer: "test3", contents: "test3", regDate: "2020.11.24 13:30"},
          { seq: 4, title: "test4", writer: "test4", contents: "test4", regDate: "2020.11.24 13:30"},
          { seq: 5, title: "test5", writer: "test5", contents: "test5", regDate: "2020.11.24 13:30"},
          { seq: 6, title: "test6", writer: "test6", contents: "test6", regDate: "2020.11.24 13:30"},
          { seq: 7, title: "test7", writer: "test7", contents: "test7", regDate: "2020.11.24 13:30"},
          { seq: 8, title: "test8", writer: "test8", contents: "test8", regDate: "2020.11.24 13:30"},
          { seq: 9, title: "test9", writer: "test9", contents: "test9", regDate: "2020.11.24 13:30"}
        ],
        pageSet: { currentPage: 1, pageRows: 7, totalRows: 9 },
        options: [
          { value: "title", text: "제목"},
          { value: "writer", text: "작성자"}
        ],
      }
    },
    mounted() {
      // this.init();
    },
    methods: {
      init: async function () {
        var res = await this.request("/rest/file/search.json", this.form);
        console.log("file board data : " + JSON.stringify(res));
        //   data.seq = JSON.stringify(res[i].seq).replace(/\"/g, "");
        this.row.data = res;
      },
      pageSelected(page) {
        console.log("page : " + page);
        this.pageSet.currentPage = page;
      },
      rowSelected(items) {
        console.log("items "+JSON.stringify(items));
        this.$emit('rename', 'Content');
        this.$router.push({
          name:"FileView",
          params: {
            row: items
          }
        })
      },
      movePage() {
        this.$emit('rename', 'Content');
        this.$router.push({
          name:"FileCreate",
        });
      },
      keywordSearched(form) {
        console.log("search type : " + form.searchType);
        console.log("search keyword : " + form.searchWord);
      }
    }
  }
</script>
<style>
</style>