<template>
    <b-form inline>
        <b-form-select v-model="form.searchType" :options="options" class="mb-2 mr-sm-2 mb-sm-0"/>
        <!-- <div class="mt-3">Selected: <strong>{{ selected }}</strong></div> -->
        <b-form-input id="adminName" name="adminName" v-model="form.searchWord" class="mb-2 mr-sm-2 mb-sm-0"></b-form-input>
        <b-button class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="primary">검색</b-button>
    </b-form>
</template>
<script>
export default {
    data() {
      return {
        options: [
            { value: 'a', text: '제목' },
            { value: 'b', text: '작성자' }
        ],
        form: {
            searchWord: "",
            searchType: 'a'
        },
        
      }
    }
}
</script>