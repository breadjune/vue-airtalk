<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-responsive"
          >
            <template slot="header">
              <h3 class="card-title">사용자 관리</h3>
              <p class="card-category">이곳은 사용자 관지 페이지 입니다.</p>
              <hr>
            </template>
            <search></search>
            <l-table class="table-hover table-striped"
                     id="my-table"
                     :headers="row.headers"
                     :columns="row.columns"
                     :data="row.data"
                     :per-page="perPage"
                     :current-page="currentPage"
                     @rowSelected="onRowSelected"
            >
            </l-table>

              <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="my-table"
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
  import axios from 'axios'
  import axioMixin from "@/components/axioMixin"
  const tableHeaders = [ '사용자 ID', '이름', '핸드폰 번호' ,'등록일']
  const tableColumns = [ 'id', 'name', 'hpNo' ,'regDate']
  // const tableData = [{
  //   chkbox: '',
  //   number: 1,
  //   title: '테스트1',
  //   writer: '작성자 1',
  //   regdate: '2020-11-06 09:10'
  // },
  // {
  //  chkbox: '',
  //   number: 2,
  //   title: '파일업로드 타이틀 2',
  //   writer: '작성자 2',
  //   regdate: '2020-11-06 09:10'
  // },
  // {
  //   chkbox: '',
  //   number: 3,
  //   title: '파일업로드 타이틀 3',
  //   writer: '작성자 3',
  //   regdate: '2020-11-06 09:10'
  // },
  // {
  //   chkbox: '',
  //   number: 4,
  //   title: '파일업로드 타이틀 4',
  //   writer: '작성자 4',
  //   regdate: '2020-11-06 09:10'
  // },
  // {
  //   chkbox: '',
  //   number: 5,
  //   title: '파일업로드 타이틀 5',
  //   writer: '작성자 5',
  //   regdate: '2020-11-06 09:10'
  // }]
  export default {
    components: {
      LTable,
      Card,
      Search,
    },
    mixins: [axioMixin],
    data () {
      return {
        perPage: 3,
        currentPage: 1,
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
     computed: {
      rows() {
        return this.row.data.length
      }
    },
    mounted () {
      this.init();
    },
    methods: {
        init: async function () {
        var res = await this.request("/restapi/user/list", this.form);
        console.log("User data : " + JSON.stringify(res));
        this.row.data = res;
      },
      onRowSelected(items) {
        console.log("items "+JSON.stringify(items));
        this.$emit('rename', 'Content');
        this.$router.push({
        name: "UserView",
        params: { 
            id : items.id,
            name: items.name,
            password: items.password,
            hpNo: items.hpNo,
            regDate: items.regDate,
        },
      });
      },
      movePage() {
        this.$emit('rename', 'Content');
        this.$router.push("/service/userCreate");
      }
    },
  }
</script>
<style>
</style>