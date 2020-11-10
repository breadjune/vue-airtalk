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
            <editorTable v-bind="noticeList"></editorTable>

            <!-- <l-table class="table-hover table-striped"
                     :headers="row.headers"
                     :columns="row.columns"
                     :data="row.data">
            </l-table> -->
            
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
  import LTable from 'src/components/Table.vue'
  import Card from 'src/components/Cards/Card.vue'
  import Search from '../../../layout/Search.vue'
  import editorTable from './editorTable.vue'
  import axios from 'axios'
  const tableHeaders = ['', 'no', '제목', '작성자', '등록일']
  const tableColumns = ['chkbox', 'number', 'title', 'writer', 'regdate']
  const tableData = [{
    chkbox: '',
    number: 1,
    title: '테스트1',
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
      Search,
      editorTable,
    },
    data () {
      return {
        row: {
          headers: [...tableHeaders],
          columns: [...tableColumns],
          data: [...tableData]
        },

          noticeList: {
                seq : Array,
                title : Array,
                contents : Array,
                id : Array,
                reg_date : Array,
                mod_date : Array,
                flag_file : Array
            },
            detailInfo: {
                seq : '',
                title : '',
                contents : '',
                id : '',
                reg_date : '',
                mod_date : '',
                flag_file : ''
            }
      }
    },
    created: function() {

      this.list();
    },
    methods: {
       list(){
            axios.get('/rest/notice/list').then((res) => {
                console.log('rest_api_list');
                this.noticeList.seq = res.data.map(x=>x.boardSeq);
                this.noticeList.title = res.data.map(x=>x.title);
                this.noticeList.contents = res.data.map(x=>x.contents);
                this.noticeList.id = res.data.map(x=>x.adminId);
                this.noticeList.reg_date = res.data.map(x=>x.regDate);
                this.noticeList.mod_date = res.data.map(x=>x.modDate);
                this.noticeList.flag_file = res.data.map(x=>x.flagFile);

                console.log("api : result = : " + this,this.noticeList.id);
            }).catch(function(res){
                    console.log('errrrrrr');
                    console.log(res);
            });
        },

      movePage: function (event) {
      this.$emit('rename', 'Content');
      this.$router.push("/admin/editorCreate");
       },

    },
  }
</script>
<style>
</style>