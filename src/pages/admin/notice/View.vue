<template>
  <l-form
    :title="title"
    :form="form"
    @onList="list"
    @onSave="save"
    @onRemove="remove"
    @onDownload="download"
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
      title: '공지 게시판 수정',
      fileName: '',
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
    // this.form.fileName = this.$route.params.fileName[0];
    console.log("this.params : " + JSON.stringify(this.$route.params.row));
    // console.log("this.fileName : " + JSON.stringify(this.$route.params.fileName));
  },
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
      // if(formData.get("files") != null) {
      //   console.log("upload create");
      //   this.request("/restapi/board/uploadCreate", formData);
      // } else {
        this.request("/restapi/board/create", formData);
      // }
      this.$emit('rename','Content');
      this.$router.push({
       name: "Notice"
      });
    },
    remove(formData){
      formData.append('bcode', '0001');
      console.log('delete form : ' + formData.get('seq'));
      var response = this.request("/restapi/board/delete", formData);
      console.log('RESULT : ' + JSON.stringify(response));
      this.$emit('rename','Content');
      this.$router.push({
          name: "Notice"
      });
    },
    download(seq){
      var response = axios.get("/restapi/board/download?seq="+seq).then((result) => {
        console.log(result.data);
      });
    }
  }
}
</script>