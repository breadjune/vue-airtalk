<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title">{{title}}</h4>
              <p class="card-category">{{subTitle}}</p>
              <hr>
            </template>

            <b-form>
              <div>
                <label for="seq">NO.</label>
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
              <div v-if="upload">
                <label for="phone">파일 다운로드</label>
                <b-input id="fileName" name="fileName" type="text" v-model="form.fileName"></b-input>
              </div>
            </b-form>
            <br>
            <b-button class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="primary" style="float:left" @click="list">목록</b-button>
            <b-button class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="warning" style="float:left" @click="update">수정</b-button>
            <b-button class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="success" style="float:left" @click="down">다운로드</b-button>
            <b-button class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="danger" style="float:left" @click="remove">삭제</b-button>
          </card>
          <comment></comment>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import comment from './Comment.vue'
export default {
  data() {
    return {
    }
  },
  components: {
    comment
  },
  props: {
    title: String,
    subTitle: String,
    form: Object,
    upload: false
  },
  mounted() {
    // this.form= this.$route.params[0].row;
    // console.log("this form : " + JSON.stringify(this.form));
  },
  methods : {
    list(){
      this.$emit('onlist', true);
    },
    update(){
      this.$emit('onUpdate',true);
    },
    down(){
      this.$emit('onDown',true);
    },
    remove(){
      this.$emit('onRemove',true);
    },
  }
}
</script>