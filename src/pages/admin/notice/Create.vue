<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title">파일 게시판</h4>
              <p class="card-category">게시글 생성</p>
              <hr>
            </template>
            <b-form>
              <div>
                <label for="title">제목</label>
                <b-input id="title" name="title" type="text" v-model="form.title" maxlength="200"></b-input>
              </div>
              <br>
              <div>
                <label for="writer">작성자</label>
                <b-input id="writer" name="writer" type="text" v-model="form.writer"></b-input>
              </div>
              <br>
              <div>
                <label for="contents">내용</label>
                <b-form-textarea
                    id="contents"
                    v-model="form.contents"
                    placeholder="Enter something..."
                    rows="3"
                    max-rows="9"
                ></b-form-textarea>
              </div>
              <br>
              <hr>
              <div>
                <label for="file">파일 첨부</label>
                <b-form-file id="file" multiple name="file[]" type="file" v-model="form.file" placeholder="Choose a file" ref="image" browse-text="파일 선택"></b-form-file>
                <p class="mt-2">Select title : {{ form.title }}</p>
                <p class="mt-2">Select file : {{ form.file ? form.file.name : "" }}</p>
              </div>
              <br>
              <div class="text-center">
                <b-button id="saveBtn" variant="success" class="btn btn-fill mb-2 mr-sm-2 mb-sm-0" @click="create()">저장</b-button>
                <b-button id="listBtn" variant="info" class="btn btn-fill mb-2 mr-sm-2 mb-sm-0" @click="list()">취소</b-button>
              </div>
            </b-form>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import axioMixin from "@/components/axioMixin"
    import axios from "axios"

    export default {
      data() {
        return {
          form: {
            title: "",
            writer: "",
            contents: "",
            file: null
          }
        }
      },
      mixins: [axioMixin],
      methods: {
        create() {
          if (this.form.title == null || this.form.title == "") {
            alert("제목을 입력하세요.");
          }
          else if (this.form.writer == null || this.form.writer == "") {
            alert("작성자를 입력하세요.");
          }
          else if (this.form.contents == null || this.form.contents == "") {
            alert("내용을 입력하세요.");
          }
          else {
            console.log('Create API invoked.');

            var formData = new FormData();
            formData.append('title', this.form.title);
            formData.append('writer', this.form.writer);
            formData.append('contents', this.form.contents);
            formData.append('file', this.form.file);

            // var res = this.request("/rest/file/create.json", this.form);
            axios.post("/rest/file/create.json", formData).then((result) =>  {
              // 정상 처리 될 경우 리스트 화면으로 이동
              console.log("result : " + result.data);
              if(result.data == '0') {
                alert("생성 완료.");
                this.$emit('rename', 'Content');
                this.$router.push({
                  name: "File"
                });
              }
              else {
                alert("저장에 실패하였습니다.");
              }
            });
            
            // console.log('RESULT : ' + JSON.stringify(res));
            this.$emit('rename','Content');
            this.$router.push({
              name: "File"
            });
          }
        },
        list() {
          // this.$emit('rename', 'Content');
          this.$router.push({
            name: "FileManage"
          });
        }
      }
    }
</script>