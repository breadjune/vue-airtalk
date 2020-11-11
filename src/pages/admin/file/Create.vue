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
                <b-input id="title" name="title" type="text" v-model="title" maxlength="200"></b-input>
              </div>
              <br>
              <div>
                <label for="writer">작성자</label>
                <b-input id="writer" name="writer" type="text" v-model="writer"></b-input>
              </div>
              <br>
              <div>
                <label for="contents">내용</label>
                <b-form-textarea
                    id="contents"
                    v-model="contents"
                    placeholder="Enter something..."
                    rows="3"
                    max-rows="9"
                ></b-form-textarea>
              </div>
              <br>
              <hr>
              <div>
                <label for="file">파일 첨부</label>
                <b-form-file id="file" name="file" type="file" v-model="file" placeholder="Choose a file" browse-text="파일 선택"></b-form-file>
              </div>
              <br>
              <div class="text-center">
                <b-button id="saveBtn" variant="success" class="btn btn-fill mb-2 mr-sm-2 mb-sm-0" @click="save()">저장</b-button>
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
    import axios from "axios"
    
    export default {
      data() {
        return {
          form: {
            title: "",
            writer: "",
            contents: "",
            file: null,
          }
        }
      },

      watch: {
          // phone에 숫자가 아닌 다른 문자가 들어올 경우 삭제 처리
          // phone : function() {
          //     return this.phone = this.phone.replace(/[^0-9]/g, '');
          // }
      },

      methods: {
        create() {
          if (this.title == null || this.title == "") {
            alert("제목을 입력하세요.");
          }
          else if (this.writer == null || this.writer == "") {
            alert("작성자를 입력하세요.");
          }
          else if (this.contents == null || this.contents == "") {
            alert("내용을 입력하세요.");
          }
          else {
            console.log('Create API invoked.');
            console.log("Board File Create form : " + this.form);
            var res = this.request("/rest/file/create.json", this.form);
                


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