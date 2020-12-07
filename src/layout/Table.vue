<template>
  <table class="table" style="white-space:nowrap">
    <thead>
      <slot name="columns">
        <tr>
          <th v-for="header in headers" :key="header">{{header}}</th>
        </tr>
      </slot>
    </thead>
    <tbody>
    <tr v-for="(item, index) in data" :key="index" @click="rowSelected(item)">
        <slot :row="item">
          <td v-for="column in columns" 
              :key="column"
          >{{itemValue(item, column)}}</td>
           <td id="btnTD">
             <p v-html="btnData" @click="btnClick"></p>
           </td>
        </slot>
       
    </tr>
    </tbody>
  </table>
  <!-- <b-table
    id="table"
    striped
    hover
    selectable
    select-mode="single"
    :fields="fields"
    :items="this.$store.getter['dataStore/getList']"
    :per-page="perPage"
    :current-page="currentPage"
    @row-selected="onRowSelected"
    ><b-table> -->
</template>
<script>
  export default {
    name: 'l-table',
    props: {
      headers: Array,
      columns: Array,
      data: Array,
      btnData:"",
    },
    data () {
      return {

        btnChk:false,
        
      }
      },
    methods: {
      hasValue (item, column) {
        return item[column.toLowerCase()] !== 'undefined'
      },
      itemValue (item, column) {
        return item[column]
      },
      rowSelected (item) {
        console.log("item : " + item[0]);
        if(this.btnChk){
          this.btnGo(item);
        }
        else{       
        this.$emit("rowSelected", item);
        console.log("invoke RowSelected!");
        }
      },
      btnClick(){
           this.btnChk=true;
           console.log("버튼 클릭 : ");
      },
      btnGo(item){
          console.log("버튼 기능 : " +  item);
          this.$emit("btnClick", item);
      }
    }
  }
</script>
<style>
</style>
