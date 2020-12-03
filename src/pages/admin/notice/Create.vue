<template>
  <l-form
    create
    :title="title"
    :form="form"
    @onList="list"
    @onSave="save"
  >
  </l-form>
</template>
<script>
import axioMixin from "@/components/axioMixin"
import comment from '../../../layout/Comment.vue'
import LForm from '../../../layout/Form.vue'
export default {
  data() {
    return {
      title: '공지 게시판 작성',
      form: {}
    }
  },
  components: {
    comment,
    LForm
  },
  mixins: [axioMixin],
  mounted() {
    this.form = this.$route.params.row[0];
    console.log("this.params : " + JSON.stringify(this.$route.params.row));
    console.log("this.form : " + JSON.stringify(this.form));
  },
  methods : {
    list(flag){
      console.log("list invoked!");
      this.$emit('rename','Content');
      this.$router.push({
          name: "Notice"
      });
    },
    save(){
      console.log('Update API invoked.');
      var res = this.request("/rest/file/update.json", this.form);
      console.log('RESULT : ' + JSON.stringify(res));
      this.$emit('rename','Content');
      this.$router.push({
          name: "File"
      });
    }
  }
}
</script>