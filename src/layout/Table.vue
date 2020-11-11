<template>
  <table class="table">
    <thead>
      <slot name="columns">
        <tr>
          <th v-for="header in headers" :key="header">{{header}}</th>
        </tr>
      </slot>
    </thead>
    <tbody>
    <tr v-for="(item, index) in data" :key="index" @click="rowSelected(item)">
      <!-- <ul v-if="hasColumn(index, column)"> -->
        <slot :row="item">
          <td v-for="column in columns" 
              :key="column"
          >{{itemValue(item, column)}}</td>
        </slot>
      <!-- </ul> -->
    </tr>
    </tbody>
  </table>
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
        return item[column.toLowerCase()]
      },
      rowSelected (item) {
        this.$emit("rowSelected", item);
        console.log("invoke RowSelected!");
      }
    }
  }
</script>
<style>
</style>
