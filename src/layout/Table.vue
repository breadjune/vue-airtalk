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
        this.$emit("rowSelected", item);
        console.log("invoke RowSelected!");
      }
    }
  }
</script>
<style>
</style>
