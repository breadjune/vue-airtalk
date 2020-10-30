<template>
  <div class="wrapper">
    <a href=# @click="movePage('Login')" ref="login" style="display:none"></a>
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <!-- <sidebar-link to="" @click="hideSidebar">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Dashboard</p>
<<<<<<< HEAD
      </sidebar-link>
      <sidebar-link to="/admin/member-list">
        <i class="nc-icon nc-circle-09"></i>
        <p>회원 관리</p>
      </sidebar-link>
      <sidebar-link to="/admin/admin-list">
        <i class="nc-icon nc-circle-09"></i>
        <p>계정 관리</p>
      </sidebar-link>
      <sidebar-link to="/admin/menu">
        <i class="nc-icon nc-notes"></i>
        <p>메뉴 관리</p>
      </sidebar-link>
      <sidebar-link to="/admin/group-list">
        <i class="nc-icon nc-layers-3"></i>
        <p>권한 관리</p>
      </sidebar-link>
      <sidebar-link to="/admin/notice">
        <i class="nc-icon nc-notes"></i>
        <p>공지사항</p>
      </sidebar-link>
      <sidebar-link to="/admin/table-list">
        <i class="nc-icon nc-notes"></i>
        <p>Table list</p>
      </sidebar-link>
      <!--<sidebar-link to="/admin/typography">
=======
      </sidebar-link> -->
      <li>
        <a href="#" @click="changeCountents('Overview')" class="nav-link">
          <i class="nc-icon nc-chart-pie-35"></i>
          Dashboard
        </a>
      </li>
      <li>
        <a href="#" @click="changeCountents('MemberManage')" class="nav-link">
          <i class="nc-icon nc-circle-09"></i>
          회원 관리
        </a>
      </li>
      <li>
        <a href="#" @click="changeCountents('AdminManager')" class="nav-link">
          <i class="nc-icon nc-circle-09"></i>
          계정 관리
        </a>
      </li>
      <li>
        <a href="#" @click="changeCountents('Menu')" class="nav-link">
          <i class="nc-icon nc-notes"></i>
          메뉴 관리
        </a>
      </li>
      <li>
        <a href="#" @click="changeCountents('GroupManage')" class="nav-link">
          <i class="nc-icon nc-layers-3"></i>
          권한 관리
        </a>
      </li>
      <!-- <sidebar-link to="/admin/typography">
>>>>>>> efb9b4f51471093be738c54733171e7c4a482b23
        <i class="nc-icon nc-paper-2"></i>
        <p>Typography</p>
      </sidebar-link>
      <sidebar-link to="/admin/icons">
        <i class="nc-icon nc-atom"></i>
        <p>Icons</p>
      </sidebar-link>
      <sidebar-link to="/admin/maps">
        <i class="nc-icon nc-pin-3"></i>
        <p>Maps</p>
      </sidebar-link>
      <sidebar-link to="/admin/notifications">
        <i class="nc-icon nc-bell-55"></i>
        <p>Notifications</p>
      </sidebar-link>

      <template slot="bottom-links">
        <sidebar-link class="active"
                      to="/admin/upgrade">
          <i class="nc-icon nc-alien-33"></i>
          <p>Upgrade to PRO</p>
        </sidebar-link>
      </template>
      -->
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <!-- <dashboard-content @click="toggleSidebar">

      </dashboard-content> -->

      <component
        :is="this.name"
      >
      </component>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  // import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  import Overview from '../pages/Overview'
  import MemberManage from '../pages/admin/member/MemberManage.vue'
  import GroupManage from '../pages/admin/group/GroupManage.vue'
  import Menu from '../pages/admin/menu-list/Menu.vue'
  import AdminManager from '../pages/admin/adminManager/AdminManager.vue'
  export default {
    data() {
      return {
        name: 'Overview'
      }
    },
    components: {
      TopNavbar,
      ContentFooter,
      // DashboardContent,
      MobileMenu,
      Overview,
      MemberManage,
      GroupManage,
      Menu,
      AdminManager
    },
    mounted(){
      // console.log('auth : ' + this.$session.get('auth'));
      // if(!this.$session.get('auth')) {
      //   const elem = this.$refs.login
      //   elem.click()
      // }
    },
    methods: {
      changeCountents(name) {

        var list = document.querySelectorAll('.nav-main__links li');

        if(name !== 'Login') {
          for (var i = 0; i < list.length; i++) { 
            (function(idx) {
              list[idx].classList.remove("active");
              list[idx].onclick = function() {
                list[idx].classList.add("active");
                //console.log(idx);
              }
            })(i);
          }
        }

        if(name !== this.name) this.name = name
        
      },
      // toggleSidebar () {
      //   if (this.$sidebar.showSidebar) {
      //     this.$sidebar.displaySidebar(false)
      //   }
      // },
      // movePage(urlName) {
      //   console.log('name : ' + this.name);

      //   var list = document.querySelectorAll('.nav-main__links li');

      //   if(urlName !== 'Login') {
      //     for (var i = 0; i < list.length; i++) { 
      //       (function(idx) {
      //         list[idx].classList.remove("active");
      //         list[idx].onclick = function() {
      //           list[idx].classList.add("active");
      //           //console.log(idx);
      //         }
      //       })(i);
      //     }
      //   }

      //   if (this.name !== urlName) {
      //     this.name = urlName;
      //     this.$router.push({
      //     name: urlName
      //     });
      //   }
      // }
    }
  }

</script>
<style>
</style>