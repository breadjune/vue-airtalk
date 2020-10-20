<!--<template>
<b-container class="bv-example-row">
    <b-row no-gutters class="container-row justify-content-md-center">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-row>
                <b-col>
                    <b-form-group id="input-group-1" label="Email address:" label-for="input-email">
                        <b-form-input id="input-email" v-model="form.email" type="email" placeholder="Enter email" required></b-form-input>
                    </b-form-group>
                </b-col>
            </b-form-row>

            <b-form-row>
                <b-col md="12">
                    <b-form-group id="input-group-2" label="Password:" label-for="input-pw">
                        <b-form-input id="input-pw" v-model="form.name" placeholder="Enter Password" required></b-form-input>
                    </b-form-group>
                </b-col>
            </b-form-row>

            <b-form-row>
                <b-col md ="12">
                    <b-button type="submit" variant="primary" class="login-submit">Submit</b-button>
                    <b-button type="reset" variant="danger" class="login-reset">Reset</b-button>
                </b-col>
            </b-form-row>
        </b-form>
    </b-row>
</b-container>
    <b-card class="mt-3" header="Form Data Result">
    <pre class="m-0">{{ form }}</pre>
    </b-card>
</template>-->

<template>
  <!-- Default form login -->
  <b-container class="login-container">
    <b-row class="login-row justify-content-md-center" cols-md="3" cols-sm="3" align-v="center">
        <b-form class="login-form" @submit="onSubmit" @reset="onReset" v-if="show">
            <p class="h4 text-center mb-4">Sign in</p>
              <b-form-group id="input-group-1" label="Email:" label-for="input-email">
                <b-form-input id="input-email" v-model="form.email" type="email" placeholder="Enter email" required></b-form-input>
              </b-form-group>
              <br/>
              <b-form-group id="input-group-2" label="Password:" label-for="input-pw">
                <b-form-input id="input-pw" v-model="form.password" placeholder="Enter Password" required></b-form-input>
              </b-form-group>
              {{ msg }}
              <div class="login-btn text-center mt-6">
                <b-button type="submit" variant="primary" class="login-submit">Login</b-button>
                <b-button type="reset" variant="danger" class="login-reset">Reset</b-button>
              </div>
        </b-form>
    </b-row>
  </b-container>
  <!-- Default form login -->
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        form: {
          email: '',
          password: '',
          msg: ''
        },
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        console.log(JSON.stringify(this.form));
        const res = axios.post(`/admin/auth/login`, this.form).then((result) => {
          console.log("response : " + JSON.stringify(result));
          console.log("status : " + result.status);
          if(result.status === 200 && result.data != null ) {
            var data = result.data;
            console.log("data : " + JSON.stringify(data));

            this.$session.start()
            this.$session.set('name', data.name);
            this.$session.set('admin', data.adminGroupSeq);
            this.$session.set('errorCode', data.errorCode);

            console.log("session : " + this.$session.get("name"));
            
            this.$router.push('/admin/overview');
          } else {
            this.msg = '아이디 또는 비밀번호가 일치하지 않습니다.'
          }
          
        });  
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.password = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>