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
              <div v-if="!btnControl">
                <label for="seq">NO.</label>
                <b-input id="seq" name="seq" type="text" v-model="form.seq" readonly></b-input>
              </div>
               <div v-if="!showFlag">
                <label for="title">제목</label>
                <b-input id="title" name="title" type="text" v-model="form.title" readonly maxlength="100"></b-input>
              </div>
              <div v-if="!showFlag">
                <label for="writer">작성자</label>
                <b-input id="writer" name="writer" type="text" v-model="form.writer" readonly maxlength="20"></b-input>
              </div>
              <div v-if="showFlag">
                <label for="title">제목</label>
                <b-input id="title" name="title" type="text" v-model="form.title" maxlength="100"></b-input>
              </div>
              <div v-if="showFlag">
                <label for="writer">작성자</label>
                <b-input id="writer" name="writer" type="text" v-model="form.writer" maxlength="20"></b-input>
              </div>
              <div>
                <label for="contents">내용</label>
                <editor 
                @onEdit="edit"
                :showFlag="showFlag"
                :contents="form.contents"
                >
                </editor>
              </div>
              <!-- <div v-else>
                <label for="contents">내용</label>
                <editor 
                @onEdit="edit"
                :showFlag="showFlag"
                :contents="form.contents"
                >
                </editor>
              </div> -->
              <!-- <div v-if="create">
                <b-button class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="success" @click="upload">업로드</b-button>
                <div class="file-box" v-for="(file, index) in files" :key="index">{{files ? files[index].name : ''}}</div>
                <div class="file-box">{{files ? files.name : ''}}</div>
              </div> -->
              <div v-if="showFlag">
                <b-button class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="success" @click="upload">업로드</b-button>
                <div class="file-box">{{files ? files.name : ''}}</div>
              </div>
              <div v-else>
                <div class="btn btn-success btn-fill mb-2 mr-sm-2 mb-sm-1" @click="download">다운로드</div>
                <div class="file-box">{{form.fileName}}</div>
              </div>
              <div style="display:none">
                <label for="files" ref="upload">파일 첨부</label>
                <b-form-file id="files" name="files" type="file" v-model="files"></b-form-file>
              </div>
            </b-form>
          </card>
          <b-button class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="primary" style="float:left" @click="list">목록</b-button>
          <b-button v-if="btnControl" class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="primary" style="float:left" @click="save">저장</b-button>
          <b-button v-if="!btnControl" class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="primary" style="float:left" @click="update">저장</b-button>
          <b-button v-if="!btnControl" class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="primary" style="float:left" @click="modify">수정</b-button>
          <!-- <b-button v-if="!create" class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="primary" style="float:left" @click="down">다운로드</b-button> -->
          <b-button v-if="!btnControl" class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="danger" style="float:left" @click="remove">삭제</b-button>
          <br><br>
          <hr>
          <card v-if="!create" style="clear:both">
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
      files: null,
      showFlag: false,
      btnControl: false
    }
  },
  props: {
    title: String,
    subTitle: String,
    create: ['create'],
    form: Object
  },
  watch: {
    create(flag) {
      this.showFlag = true;
      this.btnControl = true;
    }
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
    modify(){
      this.showFlag = true;
    },
    save(){
      var formData = new FormData();
      if(this.files != null) formData.append('files', this.files);
      formData.append('title', this.form.title);
      formData.append('writer', this.form.writer);
      formData.append('contents', this.contents);
      this.$emit('onSave', formData);
    },
    update(){
      var formData = new FormData();
      formData.append('seq', this.form.seq);
      if(this.files != null) formData.append('files', this.files);
      formData.append('title', this.form.title);
      formData.append('writer', this.form.writer);
      formData.append('contents', this.contents);
      this.$emit('onSave', formData);
    },
    contentFunc(){
      this.editor.setContent(form.contents);
    },
    edit(edit){
      this.contents = edit;
    },
    down(){
      this.$emit('onDown',true);
    },
    remove(){
      var formData = new FormData();
      formData.append('seq', this.form.seq);
      this.$emit('onRemove', formData);
    },
    upload(){
      const elem = this.$refs.upload
      elem.click()
    },
    download(){
      console.log("seq : " + this.form.seq);
      this.$emit('onDownload', this.form.seq);
    },
    isNotEmpty : function(_str){
		obj = String(_str);
		if(obj == null || obj == undefined || obj == 'null' || obj == 'undefined' || obj == '' ) return false;
		else return true;
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