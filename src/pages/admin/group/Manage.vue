<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h3 class="card-title">권한 관리</h3>
              <p class="card-category">여기는 권한을 관리하는 곳입니다.</p>
              <hr>
            </template>
              <search :options="options" @keywordSearch="init"></search>
            <!-- <div v-if="this.$store.getters['groupStore/memberList'].length > 0"> -->
            
            <b-table
              id="my-table"
              striped
              hover
              selectable
              select-mode="single"
              :fields="fields"
              :items="this.$store.getters['groupStore/memberList']"
              :per-page="perPage"
              :current-page="currentPage"
              @row-selected="onRowSelected"
            ></b-table>
            <!-- 페이징 처리 테스트-->
            <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="my-table"
              style="float:right"
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
      perPage: 3,
      currentPage: 1,
      fields: [
        { key: "authGroupSeq", label: "관리자 ID", sortable: true,},
        { key: "name",label: "관리자 명", sortable: false, },
        { key: "description", label: "사용자 그룹", sortable: false, },
        { key: "regDate", label: "등록일", sortable: false, },
      ],
      form: {
        searchWord: "",
        searchType: null,
      },
      options: [
        { value: null, text: "전체" },
        { value: "adminName", text: "이름" },
      ],
    };
  }, 
  computed: {
      rows() {
        return this.$store.getters['groupStore/memberList'].length
      }
    },
  methods: {
    init: async function () {
      var data = await this.request("/rest/group/search.json", this.form);
      console.log("DB 정보 확인 : " + JSON.stringify(data));
      this.$store.dispatch("groupStore/selectGroupListBySearchWord", data);
    },
    onRowSelected(items) {
      console.log("아이템 보기 ==== "+JSON.stringify(items));
      this.$emit('rename', 'Content');
      this.$router.push({
        name: "GroupInfo",
        params: { authGroupSeq : items[0].authGroupSeq,
                  authName : items[0].name,
                  desc : items[0].description,
                  regDate : items[0].regDate,
                  },
      });
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
  mounted() {
    this.init();
  },
};

</script>
<style>
</style>
