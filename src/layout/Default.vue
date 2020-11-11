<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from '../pages/Overview'
  import MobileMenu from './MobileMenu.vue'
  export default {
    data() {
      return {
        name: ''
      }
    },
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    mounted(){
      console.log('auth : ' + this.$session.get('auth'));
      console.log('name : ' + this.name);
      if(!this.$session.get('auth')) {
        // const elem = this.$refs.loginBtn
        // elem.click()
      }
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      },
      trigger() {
        
      },
      movePage(urlName, el) {
        console.log("element : " + el);
        console.log("name : " + urlName);
        //console.log(document.querySelector('.nav-main__links li'));
        var list = document.querySelectorAll('.nav-main__links li');
        console.log('listAll : ' + list);

        for (var i = 0; i < list.length; i++) { 
          (function(idx) {
            list[idx].classList.remove("active");
            list[idx].onclick = function() {
              list[idx].classList.add("active");
              //console.log(idx);
            }
          })(i);
        }

        if (this.name !== urlName) {
          this.name = urlName;
          this.$router.push({
          name: urlName
          });
        }
      }
    }
  }

</script>
<style>
</style>