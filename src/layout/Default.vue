<template>
  <div class="wrapper">
    
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <li>
        <a href="#" @click="movePage('Overview')" class="nav-link">
          <i class="nc-icon nc-chart-pie-35"></i>
          Dashboard
        </a>
      </li>
      <li>
        <a href="#" @click="movePage('Member')" class="nav-link">
          <i class="nc-icon nc-circle-09"></i>
          회원 관리
        </a>
      </li>
      <li>
        <a href="#" @click="movePage('Admin')" class="nav-link">
          <i class="nc-icon nc-circle-09"></i>
          계정 관리
        </a>
      </li>
      <li>
        <a href="#" @click="movePage('Menu')" class="nav-link">
          <i class="nc-icon nc-notes"></i>
          메뉴 관리
        </a>
      </li>
      <li>
        <a href="#" @click="movePage('Group')" class="nav-link">
          <i class="nc-icon nc-layers-3"></i>
          권한 관리
        </a>
      </li>
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
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      },
      movePage(urlName, el) {
        console.log("element : " + el);
        console.log("name : " + urlName);
        console.log("this name : " + this.name);
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