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
  import LTable from 'src/components/Table.vue'
  import Card from 'src/components/Cards/Card.vue'
  import Search from '../../../layout/Search.vue'
  const tableHeaders = ['', 'no', '제목', '작성자', '등록일']
  const tableColumns = ['chkbox', 'number', 'title', 'writer', 'regdate']
  const tableData = [{
    chkbox: '',
    number: 1,
    title: '파일업로드 타이틀 1',
    writer: '작성자 1',
    regdate: '2020-11-06 09:10'
  },
  {
   chkbox: '',
    number: 2,
    title: '파일업로드 타이틀 2',
    writer: '작성자 2',
    regdate: '2020-11-06 09:10'
  },
  {
    chkbox: '',
    number: 3,
    title: '파일업로드 타이틀 3',
    writer: '작성자 3',
    regdate: '2020-11-06 09:10'
  },
  {
    chkbox: '',
    number: 4,
    title: '파일업로드 타이틀 4',
    writer: '작성자 4',
    regdate: '2020-11-06 09:10'
  },
  {
    chkbox: '',
    number: 5,
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
    data () {
      return {
        row: {
          headers: [...tableHeaders],
          columns: [...tableColumns],
          data: [...tableData]
        }
      }
    }
  }
</script>
<style>
</style>