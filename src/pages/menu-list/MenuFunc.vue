<template>
    <div>
        <h4>Menu_func</h4>
        <b-table sticky-header :items="items" head-variant="light"></b-table>
    </div>
</template>
<script>
export default {
    props:{
        id : Array,
        title : Array,
        points : Array,
        user : Array,
        dotcoma : Array,
        time : Array,
        time_ago : Array,
        commnets_count : Array,
        type : Array,
        url : Array,
        domain : Array
    },
    data() {
      return {
        items: [
          { heading1: this.url, heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' }
        ]
      }
    }
}
</script>