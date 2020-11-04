<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <!-- <b-button v-b-toggle.collapse-1 variant="primary">
            {{ this.$store.getters["memberStore/memberInfo"].adminId }}
            {{ this.$store.getters["memberStore/memberInfo"].adminName }}
            회원 정보
          </b-button> -->
          <!-- 
          <b-collapse id="collapse-1">
            <b-list-group style="text-align: left">
              <b-list-group-item
                >아이디:
                {{
                  this.$store.getters["memberStore/memberInfo"].adminId
                }}</b-list-group-item
              >
              <b-list-group-item
                >이름:
                {{
                  this.$store.getters["memberStore/memberInfo"].adminName
                }}</b-list-group-item
              >
            </b-list-group>
          </b-collapse> -->

          <card>
            <h3 slot="header" class="card-title">권한 관리 추가</h3>
            <p class="card-category">권한 관리 그룹을 추가해 주십시오.</p>
            <hr />
            <b-form id="form">
              <b-row>
                <div class="col-md-3"></div>
                <div class="col-md-6 ml-sm-3">
                  <label> 사용자 그룹 </label>
                  <b-input
                    name="userGroup"
                    type="text"
                    placeholder="사용자 그룹"
                    v-model="user.userGroup"
                  >
                  </b-input>
                </div>
              </b-row>

              <b-row>
                <div class="col-md-3"></div>
                <div class="col-md-6 ml-sm-3">
                  <label> 설명 </label>
                  <b-input
                    name="gname"
                    type="text"
                    placeholder="관리자 명"
                    v-model="user.gname"
                  >
                  </b-input>
                </div>
              </b-row>
              <b-row>
                <div class="col-md-3"></div>
                <div class="col-md-6 ml-sm-3">
                  <label> 메뉴별 권한 </label>
                  <table class="table table-bordered">
                    <template v-for="item in this.resultL">
                      <tr v-bind:key="item">
                        <td style="width: 20%">
                          {{ resultD[item - 1].title }}
                        </td>
                        <td style="width: 50%">
                          <b-form-select
                            v-bind:key="item"
                            v-model="selected[item]"
                            :options="options"
                          ></b-form-select>
                        </td>
                      </tr>
                    </template>
                  </table>

                  <!-- <b-table
                    striped
                    ref="selectableTable"
                    selectable
                    select-mode="single"
                    :fields="fields"
                    :items="this.$store.getters['groupStore/memberList']"
                  > 
                    <template #cell(auth_manage)>
                      <b-form-select
                        v-model="selected"
                        :options="options"
                      ></b-form-select>
                    </template>
                  </b-table> -->
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
                    v-model="user.regDate"
                  >
                  </b-input>
                </div>
              </b-row>
              <div class="col-md-4"></div>
              <div class="text-center">
                <b-button
                  variant="success"
                  class="btn-fill mb-2 mr-sm-2 mb-sm-0"
                  @click="create()"
                >
                  저장
                </b-button>

                <b-button
                  variant="primary"
                  class="btn btn-fill mb-2 mr-sm-2 mb-sm-0"
                  @click.prevent="movePage"
                >
                  목록
                </b-button>

                <b-button
                  variant="primary"
                  class="btn btn-fill mb-2 mr-sm-2 mb-sm-0"
                  @click="test()"
                >
                  테스트
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
const groupStore = "groupStore";

import axios from "axios";

export default {
  name: "GroupCreate",
  data() {
    return {
      user: {
        userGroup: "",
        gname: "",
        regDate: "",
      },
      selected: [],
      resultL: "",
      resultD: [],

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
  },
  methods: {
    movePage: function (event) {
      this.$emit("rename", "Content");
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

          this.$store.dispatch(
            "groupStore/selectGroupListBySearchWord",
            result.data
          );
          this.resultD = this.$store.getters["groupStore/memberList"];
          console.log(JSON.stringify(this.resultD));
       
       //셀렉트 박스 디폴트 값 입력
       for (var i = 0; i <=this.result.length ; i++ ){
         this.selected[i]= "X";
        }

        })
        .catch((e) => {
          console.log("error : " + e);
        });
    },
    async create() {
      let data = {
        gname: this.user.gname,
        userGroup: this.user.userGroup,
        // auth: this.selected,
        regDate: this.user.regDate,
      };
      console.log(data);

      axios
        .post("/rest/group/create.json", data)
        .then((result) => {
          console.log("result.data : " + result.data);
          this.result = result.data;
          if (result.data == "SUCCESS")
            alert(result.data + " 정상 처리 되었습니다.");
          else
            alert(result.data + " 저장 실패 하였습니다. 정보를 확인해주세요.");
        })
        .catch((e) => {
          console.log("error : " + e);
        });
      this.$emit("rename", "Content");
      this.$router.push("/admin/group-list");
    },

    test() {
      console.log(this.selected[1]);
      console.log(this.selected[2]);
      console.log(this.selected[3]);

    },
  },
};
</script>
<style>
</style>
