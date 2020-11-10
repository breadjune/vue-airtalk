<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <card>
            <h3 slot="header" class="card-title">권한 관리 상세</h3>
            <p class="card-category">
              권한 관리 그룹을 확인 및 업데이트해 주십시오.
            </p>
            <hr>
            <b-form id="form">
              <b-row>
                <div class="col-md-3"></div>
                <div class="col-md-6 ml-sm-3">
                  <label> 사용자 그룹 <span class="required">*</span></label>
                  <b-form-input
                    name="userGroup"
                    type="text"
                    placeholder="내용을 입력하세요"
                    v-model="$route.params.authName"
                  >
                  </b-form-input>
                </div>
              </b-row>

              <b-row>
                <div class="col-md-3"></div>
                <div class="col-md-6 ml-sm-3">
                  <label> 설명 <span class="required">*</span> </label>
                  <b-form-input
                    name="gname"
                    type="text"
                    placeholder="내용을 입력하세요"
                    v-model="$route.params.desc"
                  >
                  </b-form-input>
                </div>
              </b-row>
              <b-row>
                <div class="col-md-3"></div>
                <div class="col-md-6 ml-sm-3">
                  <label> 메뉴별 권한 <span class="required">*</span></label>
                    <table class="table table-bordered">
                     <template v-for="item in this.resultL">
                      <tr v-bind:key="item">
                        <td style="width: 20%">
                          {{ resultD[item - 1].title }}
                        </td>
                        <td style="width: 50%">
                          <b-form-select
                            v-bind:key="item"
                            v-model="resultA[item-1].auth"
                            :options="options"
                          ></b-form-select>
                        </td>
                      </tr>
                    </template>
                 </table>
                </div>
              </b-row>
              <b-row>
                <div class="col-md-3"></div>
                <div class="col-md-6 ml-sm-3">
                  <label> 등록일 </label>
                  <b-input
                    name="regDate"
                    type="text"
                    disabled="true"
                    placeholder="2020-10-20"
                    v-model="$route.params.regDate"
                  >
                  </b-input>
                </div>
              </b-row>
              <div class="col-md-4"></div>
              <div class="text-center">
                <b-button
                  variant="success"
                  class="btn btn-fill mb-2 mr-sm-2 mb-sm-0"
                  @click="update()"
                >
                  수정
                </b-button>

                <b-button
                  variant="primary"
                  class="btn btn-fill mb-2 mr-sm-2 mb-sm-0"
                  @click.prevent="movePage"
                >
                  목록
                </b-button>

                <b-button
                  variant="danger"
                  class="btn btn-fill mb-2 mr-sm-2 mb-sm-0"
                  @click="remove()"
                >
                  삭제
                </b-button>
              </div>
              <div class="clearfix"></div>
            </b-form>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

const groupStore = "groupStore";

export default {
  name: "GroupInfo",
  data() {
    return {
      user: {
        authGroupSeq: "",
        authName: "",
        desc: "",
        regDate: "",
      },
      fields: ["Menu_name", "show_details"],
      items: [
        { Menu_name: "회원관리" },
        { Menu_name: "계정관리" },
        { Menu_name: "메뉴관리" },
      ],
      selected: [],
      resultL: "",
      resultD: [],
      resultA: [],
      menuSeq: [],
      options: [
        { value: "X", text: "권한없음" },
        { value: "R", text: "읽기" },
        { value: "RA", text: "읽기/승인" },
        { value: "RC", text: "읽기/생성" },
        { value: "RUA", text: "읽기/수정/승인" },
        { value: "RCU", text: "읽기/생성/수정" },
        { value: "RCUD", text: "읽기/생성/수정/삭제" },
        { value: "RCUDA", text: "읽기/생성/수정/삭제/승인" },
      ],
    };
  },

  mounted() {
    this.init();
    this.user.authGroupSeq = this.$route.params.authGroupSeq;
    this.user.authName = this.$route.params.authName;
    this.user.desc = this.$route.params.desc;
    this.user.regDate = this.$route.params.regDate;
   
    console.log("authGroupSeq: " + this.user.authGroupSeq);
    console.log("authName: " + this.user.authName);
    console.log("desc: " + this.user.desc);
    console.log("regDate: " + this.user.regDate); 
    
    this.init2();

  },
  methods: {
    movePage: function (event) {
      this.$emit('rename', 'Content');
      this.$router.push("/admin/group-list");
    },
    init: function () {
      axios
        .get("/rest/group/create")
        .then((result) => {
          console.log("result.data : " + JSON.stringify(result.data));
          this.result = result.data;
          this.resultL = this.result.length;
          console.log(this.result.length);

          this.$store.dispatch( "groupStore/selectGroupListBySearchWord",result.data );
          this.resultD = this.$store.getters["groupStore/memberList"];
          console.log(JSON.stringify(this.resultD));
        
          //셀렉트 박스 디폴트 값 입력
          for (var i = 0; i <this.result.length ; i++ ){
           this.menuSeq[i]= this.resultD[i].menuSeq;
          }
        })
        .catch((e) => {
          console.log("error : " + e);
        });
    },
    init2: function () {
      axios
        .get("/rest/group/modify",{
          params: {
             adminGroupSeq: this.user.authGroupSeq,
          }
        })
        .then((result) => {
          console.log("result.data : " + JSON.stringify(result.data));
          this.result = result.data;
          this.resultL = this.result.length;
          console.log(this.result.length);

          this.$store.dispatch( "groupStore/selectGroupListBySearchWord",result.data );
          this.resultA = this.$store.getters["groupStore/adminGroupAuth"];
          console.log(JSON.stringify(this.resultA));
        })
        .catch((e) => {
          console.log("error : " + e);
        });
    },
    update() {

        // 셀렉트 박스 값 저장
          for (var i = 0; i <this.resultL ; i++ ){
           this.selected[i] = this.resultA[i].auth;
          }

      let data = {
        authGroupSeq: this.$route.params.authGroupSeq,
        gname: this.$route.params.authName,
        userGroup: this.$route.params.desc,
        auth: this.selected,
        menuSeq: this.menuSeq,
      };

      if(data.gname!="" && data.userGroup!=""){
        axios
          .post("/rest/group/update.json", data)
          .then((result) => {
           console.log("result.data : " + result.data);
           this.result = result.data;
           if(result.data=="SUCCESS")
            this.$bvModal.msgBoxOk(result.data + "  정상적으로 처리 되었습니다.");
           else
            this.$bvModal.msgBoxOk(result.data + "  실패되었습니다. ");
           })
          .catch((e) => {
            console.log("error : " + e);
          });
        this.$emit('rename', 'Content');
        this.$router.push("/admin/group-list");
      }
      else if(data.gname=="")
         this.$bvModal.msgBoxOk("사용자 그룹을 입력해 주세요");

      else if(data.userGroup=="")
        this.$bvModal.msgBoxOk("설명을 입력해 주세요");
       
    },

    remove() {
      let data = {
        authGroupSeq: this.user.authGroupSeq,
      };
      console.log(data);
      axios
        .post("/rest/group/remove.json", data)
        .then((result) => {
          console.log("result.data : " + result.data);
          this.result = result.data;
           if(result.data=="SUCCESS")
            this.$bvModal.msgBoxOk(result.data + "  정상적으로 처리 되었습니다.");
           else
            this.$bvModal.msgBoxOk(result.data + "  실패되었습니다. ");
        })
        .catch((e) => {
          console.log("error : " + e);
        });

      this.$emit('rename', 'Content');
      this.$router.push("/admin/group-list");
    },
  },
};
</script>
<style>
</style>
