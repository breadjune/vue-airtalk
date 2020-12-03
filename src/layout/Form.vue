<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title">{{title}}</h4>
              <hr>
            </template>
            <b-form>
              <div v-if="!create">
                <label for="seq">NO.</label>
                <b-input id="seq" name="seq" type="text" v-model="form.seq" readonly></b-input>
              </div>
              <div>
                <label for="title">제목</label>
                <b-input id="title" name="title" type="text" v-html="form.title" v-model="form.title" maxlength="100"><span v-html="rawHtml"></span></b-input>
              </div>
              <div>
                <label for="writer">작성자</label>
                <b-input id="writer" name="writer" type="text" v-model="form.writer" maxlength="20"></b-input>
              </div>
              <div v-if="create">
                <label for="contents">내용</label>
                <editor></editor>
              </div>
              <div v-else>
                <label for="contents">내용</label>
                <b-form-textarea id="contents" name="contents" v-model="form.contents" type="text"></b-form-textarea>
              </div>
              <div>
                <b-button v-if="create" class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="success" @click="upload">업로드</b-button>
                <div class="file-box" v-for="(file, index) in files" :key="index">{{files ? files[index].name : ''}}</div>
              </div>
              <div style="display:none">
                <label for="file" ref="upload">파일 첨부</label>
                <b-form-file id="file" multiple name="file" type="file" v-model="files"></b-form-file>
              </div>
            </b-form>
          </card>
          <b-button class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="primary" @click="list">목록</b-button>
          <b-button v-if="create" class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="primary" @click="update">저장</b-button>
          <b-button v-if="!create" class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="primary" style="float:left" @click="update">수정</b-button>
          <b-button v-if="!create" class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="primary" style="float:left" @click="down">다운로드</b-button>
          <b-button v-if="!create" class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="danger" style="float:left" @click="remove">삭제</b-button>
          <card v-if="!create">
            <comment></comment>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import card from 'src/components/Cards/Card.vue'
import comment from './Comment.vue'
import editor from './Editor.vue'
export default {
  components: {
    card,
    comment,
    editor
  },
  data() {
    return {
      files: null
    }
  },
  props: {
    title: String,
    subTitle: String,
    create: Boolean,
    form: Object
  },
  mounted() {
    // this.form= this.$route.params[0].row;
    // console.log("this form? : " + JSON.stringify(this.form));
  },
  methods : {
    list(){
      console.log("onList invoke");
      this.$emit('onList', true);
    },
    update(){

      this.$emit('onUpdate',true);
    },
    save(){
      var formData = Object();
      formData.files = this.files
      this.$emit('onUpdate',true);
    },
    down(){
      this.$emit('onDown',true);
    },
    remove(){
      this.$emit('onRemove',true);
    },
    upload(){
      const elem = this.$refs.upload
      elem.click()
    }
  }
}
</script>
<style>
.file-box {
  height: 45px;
  vertical-align: middle;
  border: 1px solid #ccc;
  color: rgb(123, 123, 123);
  padding: 10px 0 10px 10px;
  margin: 10px 0 10px 0;
  border-radius: 5px;
}
</style>