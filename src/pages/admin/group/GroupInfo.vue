<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <b-button v-b-toggle.collapse-1 variant="primary">
            {{ this.$store.getters["groupStore/memberInfo"].authGroupSeq }}
            {{ this.$store.getters["groupStore/memberInfo"].id }}
            회원 정보
          </b-button>

          <b-collapse id="collapse-1">
            <b-list-group style="text-align: left">
              <b-list-group-item
                >아이디:
                {{ this.$store.getters["groupStore/memberInfo"].authGroupSeq }}
                </b-list-group-item
              >
              <b-list-group-item
                >이름:
                {{ this.$store.getters["groupStore/memberInfo"].id }}
                </b-list-group-item
              >
            </b-list-group>
          </b-collapse>

          <card>
            <h3 slot="header" class="card-title">권한 관리 상세</h3>
            <p class="card-category">
              권한 관리 그룹을 확인 및 업데이트해 주십시오.
            </p>
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
                    v-model="$route.params.authName"
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
                    v-model="$route.params.desc"
                  >
                  </b-input>
                </div>
              </b-row>
              <b-row>
                <div class="col-md-3"></div>
                <div class="col-md-6 ml-sm-3">
                  <label> 메뉴별 권한 <span class="required">*</span></label>
                  <table class="table table-bordered">
                    <tr>
                      <td style="width: 20%">회원 관리</td>
                      <td style="width: 50%">
                        <b-form-select
                          v-model="selected_user"
                          :options="options"
                        >
                        </b-form-select>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 20%">계정 관리</td>
                      <td style="width: 50%">
                        <b-form-select
                          v-model="selected_admin"
                          :options="options"
                        >
                        </b-form-select>
                      </td>
                    </tr>
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
                  pill
                  variant="success"
                  class="btn-fill mb-2 mr-sm-2 mb-sm-0"
                  @click="update()"
                >
                  수정
                </b-button>

                <b-button
                  pill
                  class="btn btn-info btn-fill mb-2 mr-sm-2 mb-sm-0"
                  @click.prevent="movePage"
                >
                  목록
                </b-button>

                <b-button
                  pill
                  variant="danger"
                  class="btn-fill mb-2 mr-sm-2 mb-sm-0"
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
      form: {
        adminId: "",
      },
      fields: ["Menu_name", "show_details"],
      items: [
        { Menu_name: "회원관리" },
        { Menu_name: "계정관리" },
        { Menu_name: "메뉴관리" },
      ],
      selected_user: "R",
      selected_admin: "R",
      options: [
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
    this.form.authGroupSeq = this.$route.params.authGroupSeq;
    this.form.authName = this.$route.params.authName;
    this.form.desc = this.$route.params.desc;
    this.form.regDate = this.$route.params.regDate;

    console.log("authGroupSeq: " + this.form.authGroupSeq);
    console.log("authName: " + this.form.authName);
    console.log("desc: " + this.form.desc);
    console.log("regDate: " + this.form.regDate);
  },
  methods: {
    movePage: function (event) {
      this.$router.push("/admin/group-list");
    },
    update() {
      let data = {
        authGroupSeq: this.$route.params.authGroupSeq,
        gname: this.$route.params.authName,
        userGroup: this.$route.params.desc,
        auth: this.selected_user,
      };
      console.log(data);

      alert("콘솔창 확인 ");

      axios
        .post("/rest/group/update.json", data)
        .then((result) => {
          console.log("result.data : " + result.data);
          this.result = result.data;
          alert(result.data);
        })
        .catch((e) => {
          console.log("error : " + e);
        });

      this.$router.push("/admin/group-list");
    },

    remove() {
      let data = {
        authGroupSeq: this.form.authGroupSeq,
      };
      console.log(data);

      alert("콘솔창 확인 ");

      axios
        .post("/rest/group/remove.json", data)
        .then((result) => {
          console.log("result.data : " + result.data);
          this.result = result.data;
          alert(result.data);
        })
        .catch((e) => {
          console.log("error : " + e);
        });

      this.$router.push("/admin/group-list");
    },
  },
};
</script>
<style>
</style>
