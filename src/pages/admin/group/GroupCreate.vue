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
            <h4 slot="header" class="card-title">권한 관리 추가 </h4>
            <hr>
            <b-form id="form">
              <div class="row">
                <div class="col-md-6">
                  <label> 관리자 ID </label>
                  <b-input
                    name="id"
                    type="text"
                    placeholder="관리자 ID"
                    v-model="user.id">
                  </b-input>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <label> 관리자 명 </label>
                  <b-input
                    name="gname"
                    type="text"
                    placeholder="관리자 명"
                    v-model="user.gname">
                  </b-input>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <label> 사용자 그룹 </label>
                  <b-input
                    name="userGroup"
                    type="text"
                    placeholder="사용자 그룹"
                    v-model="user.userGroup">
                  </b-input>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <label> 등록일 </label>
                  <b-input
                    name="regDate"
                    type="text"
                    disabled="true"
                    placeholder="2020-10-20"
                    v-model="user.regDate">
                  </b-input>
                </div>
              </div>

              <div class="text-center">
                <button
                  class="btn btn-info btn-fill float-right"
                  @click="create()"
                >
                  저장
                </button>
              </div>
              <div class="text-center">
                <button
                  type="submit"
                  class="btn btn-info btn-fill float-right"
                  @click.prevent="movePage"
                >
                  목록
                </button>
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
import axios from 'axios';

export default {
  name: "GroupCreate",
  data() {
    return {
       user: {
          id : '',
          gname : '',
          userGroup : '',
          regDate : '2020-10-21',
      },
    };
  },
  methods: {
      movePage : function(event){
        this.$router.push('/admin/group-list')
    },
      async create(){
           let data = {
            id : this.user.id,
            gname : this.user.gname,
            userGroup : this.user.userGroup,
            regDate : this.user.regDate
        };

        console.log("id : " + this.user.id);
        console.log("pw : " + this.user.gname);
        console.log(data);

        alert("Hello! Spring type post2!");

        axios.post('/admin/group/create.json', data).then(result => {
            console.log("result.data : " + result.data);
            this.result = result.data;
            alert(result.data);
        })
        .catch(e => {
            console.log('error : ' + e);
           })
    //   this.$store.dispatch("groupStore/selectGroupListBySearchWord", data);
      this.$router.push('/admin/group-list');
    },
  },
};
</script>
<style>
</style>
