<template>
    <b-form inline>
        <b-form-select v-model="form.searchType" :options="options" class="select-control mb-2 mr-sm-2 mb-sm-0"/>
        <b-form-input hidden></b-form-input>
        <b-form-input id="adminName" name="adminName" v-model="form.searchWord" class="mb-2 mr-sm-2 mb-sm-0"></b-form-input>
        <b-button class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="primary" @click="btnSearch">검색</b-button>
    </b-form>
</template>
<script>
export default {
    data() {
      return {
        default: "선택",
        form: {
            searchWord: "",
            searchType: this.options[0].value,
        },
      }
    },
    mounted() {
        console.log("options : " + JSON.stringify(this.options));
      if(this.$session.get("type")!=undefined || this.$session.get("keyword")!=undefined){
           this.form.searchType = this.$session.get("type");
           this.form.searchWord = this.$session.get("keyword");
      }
    },
    props: {
        options: Array
    },
    methods: {
        btnSearch() {
            this.$emit("keywordSearch", this.form);
        }
    }
}
</script>
<style>
/* .select-control {
    font-size: 0.8rem;
} */
</style>