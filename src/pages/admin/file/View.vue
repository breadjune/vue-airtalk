<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title">파일 게시판</h4>
              <p class="card-category">파일 게시판 수정</p>
              <hr>
            </template>

            <b-form>
              <div>
                <label for="seq">No:</label>
                <b-input id="seq" name="seq" type="text" v-model="form.seq" readonly></b-input>
              </div>
              <div>
                <label for="title">제목</label>
                <b-input id="title" name="title" type="text" v-model="form.title" maxlength="100"></b-input>
              </div>
              <div>
                <label for="writer">작성자</label>
                <b-input id="writer" name="writer" type="text" v-model="form.writer" maxlength="20"></b-input>
              </div>
              <div>
                <label for="contents">내용</label>
                <b-form-textarea id="contents" name="contents" type="text" v-model="form.contents"></b-form-textarea>
              </div>
              <div>
                <label for="phone">파일 다운로드</label>
                <b-input id="fileName" name="fileName" type="text" v-model="form.fileName"></b-input>
              </div>
            </b-form>
            <br>
            <b-button class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="primary" style="float:left" v-on:click="list">목록</b-button>
            <b-button class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="primary" style="float:left" v-on:click="update">수정</b-button>
            <b-button class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="primary" style="float:left" v-on:click="remove">삭제</b-button>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axioMixin from "@/components/axioMixin"
export default {
  data() {
    return {
      form: {
        seq : '',
        title : '',
        writer : '',
        contents : '',
        fileName : ''
      }
    }
  },
  mixins: [axioMixin],
  mounted() {
    this.form.seq = this.$route.params.seq;
    this.form.title = this.$route.params.title;
    this.form.writer = this.$route.params.writer;
    this.form.contents = this.$route.params.contents;
    this.form.fileName = this.$route.params.fileName;
  },
  methods : {
    list(){
      this.$emit('rename','Content');
      this.$router.push({
          name: "File"
      });
    },
    update(){
      console.log('Update API invoked.');
      var res = this.request("/rest/file/update.json", this.form);
      console.log('RESULT : ' + JSON.stringify(res));
      this.$emit('rename','Content');
      this.$router.push({
          name: "File"
      });
    },
    remove(){
      console.log('Delete API invoked.');
      var res = this.request("/rest/file/delete.json", this.form);
      console.log('RESULT : ' + JSON.stringify(res));
      this.$router.push({
          name: "File"
      });
    },
  }
}
</script>