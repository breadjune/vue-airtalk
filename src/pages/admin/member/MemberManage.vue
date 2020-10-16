<template>
<div class="content">
    <div class="container-fluid">
      <div class="row">

        <div class="col-12">
          
          <card>
            <template slot="header">
              <h4 class="card-title">Table</h4>
              <p class="card-category">Here is a subtitle for this table</p>
            </template>

            <b-form inline>
              <b-form-select id="inline-form-custom-select-pref" class="mb-2 mr-sm-2 mb-sm-0" 
                v-model="form.searchType" :options="options"></b-form-select>
                <div class="mt-3"><strong>{{ form.searchType }}</strong></div>

              <b-form-input id="adminName" name="adminName" v-model="form.searchWord" ></b-form-input>

              <b-button class="btn-info btn-fill" variant="primary" @click="selectMemberListBySearchWord()">검색</b-button>
            </b-form>

            <div v-if="this.$store.getters['memberStore/memberList'].length > 0">
              <b-table
                striped
                hover
                ref="selectableTable"
                selectable
                select-mode="single"
                :fields="fields"
                :items="this.$store.getters['memberStore/memberList']"
                @row-selected="onRowSelected"
              ></b-table>
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

import axioMixin from "@/components/axioMixin";

const memberStore = 'memberStore'

export default {
//name: "MemberManage",
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
      }
    ],
    form: {
        searchWord: "",
        searchType: null
    },
    options: [
          { value: null, text: '전체' },
          { value: 'adminName', text: '이름' }
        ]
    }
  },
  created: function () {},
  methods: {
    async selectMemberListBySearchWord() {
      var data = await this.request('/admin/member/selectMemberListBySearchWord.json', this.form)
      this.$store.dispatch('memberStore/selectMemberListBySearchWord',data)
    },
    onRowSelected(items) {
      this.$router.push({
        name: "MemberInfo",
        params: { adminId: items[0].adminId }
      })
    }
  }
}

</script>
<style>
</style>
