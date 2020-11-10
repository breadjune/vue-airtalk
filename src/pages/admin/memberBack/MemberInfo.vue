<template>
<div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
         
<b-button v-b-toggle.collapse-1 variant="primary">
  {{ this.$store.getters['memberStore/memberInfo'].adminId}} 
  ({{ this.$store.getters['memberStore/memberInfo'].adminName }})
  </b-button>
    
             <b-collapse id="collapse-1">
        <b-list-group style="text-align:left;">
          <b-list-group-item>아이디: {{ this.$store.getters['memberStore/memberInfo'].adminId }}</b-list-group-item>
          <b-list-group-item>이름: {{ this.$store.getters['memberStore/memberInfo'].adminName }}</b-list-group-item>
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
          adminId: this.$store.getters['memberStore/memberInfo'].adminId,
          firstName: 'Mike',
          company: 'Light dashboard',
          username: 'michael23',
          lastName: 'Andrew',
          address: 'Melbourne, Australia'
      },
      form: {
          adminId: ''
        }
      }
      
  },
  mounted() {
    this.form.adminId = this.$route.params.adminId
    this.getInitPageData()
    console.log('MemberInfo: ' + this.form.adminId);
  },
  methods: {
    async getInitPageData() {
      var data = await this.request('/admin/member/getMemberInfoBySeq.json', this.form)
      this.$store.dispatch("memberStore/getMemberInfoBySeq", data)
    }
  }
}
</script>
<style>
</style>
