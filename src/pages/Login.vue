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
  <b-container class="border border-info">
    <b-row class="login-row justify-content-md-center" cols-md="3" align-v="center">
        <form class="login-form border border-primary rounded">
            <p class="h4 text-center mb-4">Sign in</p>
                <label for="Email" class="grey-text">Your email</label>
                <input type="email" id="Email" class="form-control"/>
                <br/>
                <label for="defaultFormLoginPasswordEx" class="grey-text">Your password</label>
                <input type="password" id="defaultFormLoginPasswordEx" class="form-control"/>
                <div class="text-center mt-4">
                <button class="btn btn-indigo" type="submit">Login</button>
            </div>
        </form>
    </b-row>
  </b-container>
  <!-- Default form login -->
</template>

<!--<script>
  export default {
    data() {
      return {
        form: {
          email: '',
          name: '',
          food: null,
          checked: []
        },
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>-->