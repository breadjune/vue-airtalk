<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-responsive"
          >
            <template slot="header">
              <h3 class="card-title">{{title}}</h3>
              <p class="card-category">{{subTitle}}</p>
              <hr>
            </template>
            <!--search(custom)-->
            <search 
                :options="options" 
                @keywordSearch="onKeywordSearched"
            ></search>

            <!--table(default) -->
            <b-table
                id="table"
                striped
                hover
                selectable
                select-mode="single"
                :fields="fields"
                :items="data"
                :per-page="pageSet.pageRows"
                :current-page="pageSet.currentPage"
                @row-selected="onRowSelected"
            ></b-table>
            <p v-if="upload">it's work!!</p>
            <br>
            <div>
              <!--button 공통 컴포넌트 구현 필요 -->
              <b-button
                class="btn-fill mb-2 mr-sm-2 mb-sm-1"
                variant="primary"
                @click="movePage()"
              >작성
              </b-button>
              <!-- <b-button
                class="btn-fill mb-2 mr-sm-2 mb-sm-1"
                variant="success"
              >다운로드
              </b-button> -->
              <!--pagination(default) -->
              <b-pagination
                class="page-control"
                v-model="pageSet.currentPage"
                :total-rows="pageSet.totalRows"
                :per-page="pageSet.pageRows"
                @change="onPageSelected"
                aria-controls="my-table"
                style="float:right"
              ></b-pagination>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Card from 'src/components/Cards/Card.vue'
  import Search from './Search.vue'

  import axioMixin from "@/components/axioMixin"

  const dataStore = "dataStore"
  export default {
    name: 'a-board',
    components: {
      Card,
      Search
    },
    mixins: [axioMixin],
    data () {
      return {}
    },
    props: {
        upload: Boolean,
        title: String,
        subTitle: String,
        fields: Array,
        data: Array,
        pageSet: Object,
        options: Array
    },
    methods: {
      onPageSelected(page) {
        this.$emit('onPageSelected', page);
      },
      onRowSelected(items) {
        this.$emit('onRowSelected', items);
      },
      onKeywordSearched(form) {
        if(form.searchWord === null || form.searchWord === "") alert("검색어를 입력하세요.")
        else this.$emit("onKeywordSearched", form);
      },
      create() {
        this.$emit('onCreated', true);
      }
    }
  }
</script>
<style>
#table > tbody > tr > td, .btn {
  /* font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; */
  color: rgb(100, 100, 100);
  font-size: 0.8rem;
}
#table > thead > tr > th > div {
  font-weight: bold;
  text-align: center;
}
.custom-select {
  font-size: 0.8rem;
  height: calc(1.5em + 0.75rem + 4px);
}
.btn {
  margin-top: 0.05rem;
}
#table > thead > tr {
  text-align: center;
}
</style>