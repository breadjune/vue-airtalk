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
    @onCreated="created"
  ></board>
</template>
<script>
  import board from "../../../layout/Board.vue"
  import axioMixin from "@/components/axioMixin"

  const dataStore = "dataStore"
  const tableHeaders = ['no', '제목', '작성자', '등록일',]
  const tableColumns = ['boardSeq', 'title', 'writer', 'regDate']
  export default {
    mixins: [axioMixin],
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
        data: [],
        pageSet: { currentPage: 1, pageRows: 7, totalRows: 9 },
        options: [
          { value: "title", text: "제목"},
          { value: "writer", text: "작성자"}
        ],
        form: {
          type: "",
          keyword: ""
        }
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init: async function () {
        var formData = Object();
        formData.start = "0";
        formData.length = String(this.pageSet.pageRows);
        formData.bcode = "0001";
        var response = await this.request("/restapi/board/list", formData);
        console.log("board data : " + JSON.stringify(response));
        this.data = response.result;
        this.pageSet.totalRows = response.total_cnt;
      },
      async pageSelected(page) {
        if(this.form.type !== "") {
          var formData = this.form;
          formData.start = page-1;
          formData.length = String(this.pageSet.pageRows);
          formData.bcode = "0001";
          var response = await this.request("/restapi/board/search", formData);
          console.log("response data : " + JSON.stringify(formData));
          this.data = response.result;
          // console.log("page : " + page);
          // this.pageSet.currentPage = page;
        } else {
          var formData = Object();
          formData.start = page-1;
          formData.length = String(this.pageSet.pageRows);
          formData.bcode = "0001";
          var response = await this.request("/restapi/board/list", formData);
          console.log("board data : " + JSON.stringify(response));
          this.data = response.result;
        }
      },
      // async getFileName(seq) {
      //   console.log("File seq : " + seq);
      //   var formData = new FormData();
      //   formData.append('seq', seq);
      //   var response = await this.request("/restapi/board/fileNameInfo", formData);
      //   console.log("response fileName : " + response.fileName);
      //   return response.fileName;
      // },
      async rowSelected(items) {
        console.log("items "+JSON.stringify(items));
        var formData = new FormData();
        var seq = items[0].seq;
        formData.append('seq', seq);
        var response = await this.request("/restapi/board/fileNameInfo", formData);
        var fileName = response.fileName
        console.log("response fileName1 : " + response.fileName);
        console.log("response fileName2 : " + fileName);
        items[0].fileName = fileName;
        this.$emit('rename', 'Content');
        this.$router.push({
          name:"NoticeView",
          params: {
            row: items,
            // fileName: fileName
          }
        })
      },
      created() {
        console.log("created invoke!")
        this.$emit('rename', 'Content');
        this.$router.push({
          name:"NoticeCreate",
          params: {
            created: true
          }
        });
      },
      async keywordSearched(form) {
        console.log("search type : " + form.searchType);
        console.log("search keyword : " + form.searchWord);
        this.form.type = form.searchType;
        this.form.keyword = form.searchWord;
        var formData = this.form;
        formData.start = "0";
        formData.length = String(this.pageSet.pageRows);
        formData.bcode = "0001";
        var response = await this.request("/restapi/board/search", formData);
        console.log("response data : " + JSON.stringify(formData));
        this.data = response.result;
        this.pageSet.totalRows = response.total_cnt;
      }
    }
  }
</script>
<style>
</style>