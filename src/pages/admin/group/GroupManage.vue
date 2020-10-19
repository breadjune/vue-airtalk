<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title">권한 관리</h4>
              <p class="card-category">여기는 권한을 관리하는 곳입니다.</p>
            </template>

            <!-- <template> -->
              <b-form inline>
                <b-form-select
                  id="inline-form-custom-select-pref"
                  class="mb-2 mr-sm-2 mb-sm-0"
                  v-model="form.searchType"
                  :options="options"
                ></b-form-select>
                <div class="mt-3">
                  <strong>{{ form.searchType }}</strong>
                </div>

                <b-form-input
                  id="adminName"
                  name="adminName"
                  v-model="form.searchWord"
                ></b-form-input>

                <b-button
                  class="btn-info btn-fill"
                  variant="primary"
                  @click="selectGroupListBySearchWord()"
                  >검색</b-button
                >
              </b-form>
            <!-- </template>
            <b-form> -->
              <div
                v-if="this.$store.getters['groupStore/memberList'].length > 0"
              >
              <!-- <div> -->
                <b-table
                  striped
                  hover
                  ref="selectableTable"
                  selectable
                  select-mode="single"
                  :fields="fields"
                  :items="this.$store.getters['groupStore/memberList']"
                  @row-selected="onRowSelected"
                ></b-table>
              </div>
              <!-- <div>
                <b-table
                  striped
                  hover
                  ref="selectableTable"
                  selectable
                  select-mode="single"
                  :items="items"
                  @row-selected="onRowSelected"
                ></b-table>
              </div> -->
            <!-- </b-form> -->
          </card>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import LTable from "src/components/Table.vue";
import Card from "src/components/Cards/Card.vue";

import Table from "src/pages/admin/group/GroupTable.vue";
import axioMixin from "@/components/axioMixin";

// const memberStore = "memberStore";

const groupStore = "groupStore";

export default {
  // name: "GroupManage",
  components: {
    Card
  },
  mixins: [axioMixin],
  data() {
    return {
      fields: [
        {
          key: "adminId",
          label: "아이디",
          sortable: true,
        },
        {
          key: "adminName",
          label: "이름",
          sortable: false,
        },
        {
          key: "phone",
          label: "전화번호",
          sortable: false,
        },
        {
          key: "email",
          label: "이메일",
          sortable: false,
        },
      ],
      form: {
        searchWord: "",
        searchType: null,
      },
      options: [
        { value: null, text: "전체" },
        { value: "adminName", text: "이름" },
      ],
      // items: [
      //   { seq: 1, menu_seq: "TEST", auth: "테스트 유저", reg_date: "20201001" },
      //   { seq: 2, menu_seq: "USER", auth: "사용자", reg_date: "20201013" },
      //   { seq: 3, menu_seq: "ADMIN", auth: "관리자", reg_date: "20201012" },
      //   { seq: 4, menu_seq: "NONE", auth: "권한 없음", reg_date: "20201016" },
      // ],
    };
  },
  created: function () {},
  methods: {
    async selectGroupListBySearchWord() {
      var data = await this.request(
        "/admin/group/selectGroupListBySearchWord.json",
        this.form
      );
      this.$store.dispatch("groupStore/selectGroupListBySearchWord", data);
    },
    onRowSelected(items) {
      this.$router.push({
        name: "GroupInfo",
        params: { adminId: items[0].adminId },
      });
    },
  },
};
</script>
<style>
</style>
