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
              <div>
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
              
              <!-- <div v-if="upload">
                <label for="phone">파일 다운로드</label>
                <b-input id="fileName" name="fileName" type="text" ></b-input>
              </div> -->
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
import card from 'src/components/Cards/Card.vue'
import comment from './Comment.vue'
import editor from './Editor.vue'
export default {
  components: {
    card,
    comment,
    editor
  },
  props: {
    title: String,
    subTitle: String,
    create: Boolean,
    form: Object,
    upload: Boolean
  },
  mounted() {
    // this.form= this.$route.params[0].row;
    // console.log("this form? : " + JSON.stringify(this.form));
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