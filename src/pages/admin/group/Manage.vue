<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h3 class="card-title">권한 관리</h3>
              <hr>
            </template>
              <search :options="options" @keywordSearch="searchData"></search>
             <b-table
                id="my-table"
                striped
                hover
                selectable
                select-mode="single"
                :fields="fields"
                :items="row.data"
                :per-page="page.perPage"
                sort-icon-left
                @row-selected="onRowSelected"
            ></b-table>
             <div id="noData" v-if="row.noData" style="text-align:center; height:100px">
              데이터가 없습니다.
            </div>
            <b-pagination
              v-show="row.default"
              v-model="page.currentPage"
              :total-rows="page.totalPage"
              :per-page="page.perPage"
              @change="handle"
              aria-controls="my-table"
              style="position:relative;justify-content:center;margin-bottom:0;"
            ></b-pagination>
          <b-form inline>
              <div>
                <b-button
                  class="btn-fill mb-2 mr-sm-2 mb-sm-1"
                  variant="primary"
                  @click="movePage()"
                  >추가
                </b-button>
              </div>
            </b-form>
            <!-- </div> -->
          </card>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import LTable from "src/components/Table.vue";
import Card from "src/components/Cards/Card.vue";
import Search from '@/layout/Search.vue'
import Table from "src/pages/admin/group/GroupTable.vue";
import axioMixin from "@/components/axioMixin";

const groupStore = "groupStore";

export default {
  // name: "GroupManage",
  components: {
    Card,
    Search,
  },
  mixins: [axioMixin],
  data() {
    return {
      page: {
        currentPage: 1,
        perPage: 4,
        totalPage: 99,
      },
      row: {
        default: true,
        noData: false,
        data: [],
      },
      fields: [
        { key: "adminGroupSeq", label: "관리자 ID", sortable: true,},
        { key: "name",label: "관리자 명", sortable: true, },
        { key: "description", label: "사용자 그룹", sortable: true, },
        { key: "regDate", label: "등록일", sortable: true, },
      ],
       form: {
        keyword: "",
        type: "all",
        start: "0",
        length: "",
      },
      options: [
        { value: "name", text: "관리자 명" },
        { value: "description", text: "사용자 그룹" },
      ],
    };
  }, 
 computed: {
    rows() {
      return this.row.data.length;
    },
  },
  // beforeRouteEnter (to, from, next) {
  //       this.page.currentPage = this.$session.get("page");
  //       next();
  // },  
  mounted() {
    this.init();
  },
  created() {
  //session 가져오기
  if(this.$session.get("keyword")!=undefined )
    this.form.keyword = this.$session.get("keyword");
  if(this.$session.get("page")!=undefined){
    this.form.start = this.$session.get("page")-1;
    this.page.currentPage = this.$session.get("page");
  }
  if(this.$session.get("type")!=undefined)
    this.form.type = this.$session.get("type");
  },
  methods: {
      init: async function () {
      this.page.totalPage = await this.request("/rest/group/count",this.form);
      console.log("카운트" + this.page.totalPage);
      this.form.length = String(this.page.perPage);
      var res = await this.request("/rest/group/search", this.form);
      console.log("Group data : " + JSON.stringify(res));
      this.row.data = res;
    },
    // init: async function () {
    //   var data = await this.request("/rest/group/search.json", this.form);
    //   console.log("DB 정보 확인 : " + JSON.stringify(data));
    //   this.$store.dispatch("groupStore/selectGroupListBySearchWord", data);
    // },
     async handle(page) {
      this.form.start = String(page - 1);
      var response = await this.request("/rest/group/search", this.form);
      this.row.data = response;
      this.$session.set('page', this.page.currentPage );
    },
    async searchData(form) {
        this.$session.set('keyword', form.searchWord);
        this.$session.set('type', form.searchType);

        this.form.keyword = form.searchWord;
        this.form.type = form.searchType;
        this.form.start = "0";
        this.form.length = String(this.page.perPage);
        this.page.totalPage = await this.request("/rest/group/count",this.form);
        
        //데이터 없음 화면 및 페이징 UI 변경
        if (this.page.totalPage !== 0) {
          this.row.default = true;
          this.row.noData = false;
        } else {
          this.row.default = false;
          this.row.noData = true;
        }
         var response = await this.request("/rest/group/search", this.form);
          console.log("GROUP Data : " + JSON.stringify(response));
         this.row.data = response;
    },
    onRowSelected(items) {
      console.log("아이템 보기 ==== "+JSON.stringify(items));
      this.$emit('rename', 'Content');
      this.$router.push({
        name: "GroupInfo",
        params: { authGroupSeq : items[0].adminGroupSeq,
                  authName : items[0].name,
                  desc : items[0].description,
                  regDate : items[0].regDate,
                  },
      });
      this.$session.set('page', this.page.currentPage );
    },
    async groupList() {
      // params 테스트 용 
      // this.$router.push({name: 'GroupInfo', params: {authGroupSeq: '1', age:4}})
      var data = await this.request("/rest/group/search.json", this.form);
      this.$store.dispatch("groupStore/selectGroupListBySearchWord", data);
    },
    movePage: function (event) {
      this.$emit('rename', 'Content');
      this.$router.push("/admin/group-create");
    },
  },
};

</script>
<style>
</style>
