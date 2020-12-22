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
import axios from "axios"
import axioMixin from "@/components/axioMixin"
import comment from '../../../layout/Comment.vue'
import LForm from '../../../layout/Form.vue'
export default {
  data() {
    return {
      title: '공지 게시판 작성',
      create: false,
      form: {
       adminName: "" 
      }
    }
  },
  components: {
    comment,
    LForm
  },
  mounted() {
    this.create = this.$route.params.mounted;
    this.form.adminName = this.$session.get("adminName");
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
      for (var key of formData.keys()) console.log("key : " + key);
      for (var value of formData.values()) console.log("value : " + value);
      
      formData.append('bcode', '0001');
      
      if(formData.get("files") != null) {
        console.log("upload create");
        this.request("/restapi/board/uploadCreate", formData);
      } else {
        this.request("/restapi/board/create", formData);
      }
      this.$emit('rename','Content');
      this.$router.push({
       name: "Notice"
      });
    }
  }
}
</script>