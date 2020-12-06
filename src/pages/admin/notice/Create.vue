<template>
  <l-form
    :create="create"
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
      create: false,
      form: {}
    }
  },
  components: {
    comment,
    LForm
  },
  mounted() {
    this.create = this.$route.params.mounted;
  },
  mixins: [axioMixin],
  methods : {
    list(flag){
      console.log("list invoked!");
      this.$emit('rename','Content');
      this.$router.push({
          name: "Notice"
      });
    },
    save(formData){
      formData.append('bcode', '0001');
      console.log('save form : ' + JSON.stringify(formData));
      var response = this.request("/restapi/board/create", formData);
      console.log('RESULT : ' + JSON.stringify(response));
      this.$emit('rename','Content');
      this.$router.push({
       name: "Notice"
      });
    }
  }
}
</script>