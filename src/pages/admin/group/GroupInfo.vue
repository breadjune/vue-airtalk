<template>
<div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
         
<b-button v-b-toggle.collapse-1 variant="primary">
  {{ this.$store.getters['groupStore/memberInfo'].authGroupSeq}} 
  ({{ this.$store.getters['groupStore/memberInfo'].id }})
  </b-button>
    
             <b-collapse id="collapse-1">
        <b-list-group style="text-align:left;">
          <b-list-group-item>아이디: {{ this.$store.getters['groupStore/memberInfo'].authGroupSeq }}</b-list-group-item>
          <b-list-group-item>이름: {{ this.$store.getters['groupStore/memberInfo'].id }}</b-list-group-item>
        </b-list-group>
    </b-collapse>

          <card>
            <h4 slot="header" class="card-title">Edit Profile</h4>
            <form>
              <div class="row">
                <div class="col-md-6">
                  <base-input type="text"
                            label="아이디"
                            :disabled="true"
                            placeholder="Id"
                            v-model="user.company">
                  </base-input>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <base-input type="text"
                            label="이름"
                            placeholder="Name"
                            v-model="user.firstName">
                  </base-input>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <base-input type="text"
                            label="전화번호"
                            placeholder="Phone"
                            v-model="user.address">
                  </base-input>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <base-input type="text"
                            label="이메일"
                            placeholder="Email"
                            v-model="user.adminId">
                  </base-input>
                </div>
              </div>
              
              <div class="text-center">
                <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="updateProfile">
                  Update Profile
                </button>
              </div>
              <div class="clearfix"></div>
            </form>
          </card>


        </div>
      </div>
    </div>
  </div>
</template>


<script>

const memberStore = 'memberStore'

export default {
  name: 'MemberInfo',
  data() {
    return {
      user: {
          authGroupSeq: this.$store.getters['groupStore/memberInfo'].authGroupSeq,
          authName: '',
          desc: '',
          regDate: '',
      },
      form: {
          adminId: ''
        }
      }
      
  },
  mounted() {
    this.form.authGroupSeq = this.$route.params.authGroupSeq
    this.getInitPageData()
    console.log('MemberInfo: ' + this.form.authGroupSeq);
  },
  methods: {
    async getInitPageData() {
      var data = await this.request('/admin/member/getGroupInfoBySeq.json', this.form)
      console.log('파라미터 정보 : ' + data);
       alert("Hello! Spring type post2!");

      this.$store.dispatch("memberStore/getGroupInfoBySeq", data)
    }
  }
}
</script>
<style>
</style>
