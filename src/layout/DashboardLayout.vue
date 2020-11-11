<template>
  <div class="wrapper">
    <a href=# @click="movePage('Login')" ref="login" style="display:none"></a>
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <!-- <sidebar-link to="" @click="hideSidebar">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Dashboard</p>
      </sidebar-link> -->
      <ul>
      <li>
        <a href="#" @click="changeCountents('Overview')" class="nav-link">
          <em class="nc-icon nc-chart-pie-35"></em>
          Dashboard
        </a>
      </li>
      <!-- <li>
        <a href="#" @click="changeCountents('Member')" class="nav-link">
          <i class="nc-icon nc-circle-09"></i>
          회원 관리
        </a>
      </li> -->
      <li>
        <a href="#" @click="changeCountents('Member')" class="nav-link">
          <i class="nc-icon nc-circle-09"></i>
          계정 관리
        </a>
      </li>
      <!-- <li>
        <a href="#" @click="changeCountents('Menu')" class="nav-link">
          <i class="nc-icon nc-notes"></i>
          메뉴 관리
        </a>
      </li> -->
      <li>
        <a href="#" @click="changeCountents('Group')" class="nav-link">
          <i class="nc-icon nc-settings-gear-64"></i>
          권한 관리
        </a>
      </li>
      <li>
        <b-navbar-toggle target="navbar-toggle-collapse" @click="changeCountents('directory')" class="nav-link directory">
          <div href=#><i class="nc-icon nc-layers-3"></i>게시판</div>
        </b-navbar-toggle>
      </li>
        <b-collapse id="navbar-toggle-collapse" class="board-toggle">
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#" @click="changeCountents('editor')">
              <i class="nc-icon nc-single-copy-04"></i>
              글쓰기 게시판
            </b-nav-item>
            <b-nav-item href="#" @click="changeCountents('file')">
              <i class="nc-icon nc-single-copy-04"></i>
              파일 게시판
            </b-nav-item>
            <b-nav-item href="#" @click="changeCountents('Notice')">
              <i class="nc-icon nc-single-copy-04"></i>
              공지 게시판
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>

        <!-- <a href="#" @click="changeCountents('Notice')" class="nav-link">
          <i class="nc-icon nc-layers-3"></i>
          공지 게시판
        </a> -->
      
      <!-- <sidebar-link to="/admin/typography">
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
      </ul>
    </side-bar>
    <div class="main-panel">
      <top-navbar v-bind="title"></top-navbar>

      <!-- <dashboard-content @click="toggleSidebar">

      </dashboard-content> -->

      <component :is="this.name" v-on:rename="rename"></component>
      

      <footer></footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import Footer from './ContentFooter.vue'
  import Content from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  import Overview from '../pages/Overview'
  //import Member from '../pages/admin/member/MemberManage.vue'
  import Member from '../pages/admin/member/Manage.vue'
  import Group from '../pages/admin/group/GroupManage.vue'
  import Menu from '../pages/admin/menu/Menu.vue'
  import Admin from '../pages/admin/adminManager/AdminManager.vue'
  import editor from '../pages/admin/editor/editorMain.vue'
  // import Admin from '../pages/admin/adminManager/AdminManager.vue'
  import file from '../pages/admin/file/Manage.vue'
  import Notice from '../pages/admin/notice/notice.vue'
  import NoticeAdd from '../pages/admin/notice/notice_add.vue'
  import NoticeDetail from '../pages/admin/notice/notice_detail.vue'
  // import eventBus from '../components/eventBus'
  import Vue from 'vue'
var EventBus = new Vue();
  export default {
    data() {
      return {
        name: 'Overview',
        title: {
          name: 'Dashboard'
        }
      }
    },
    components: {
      TopNavbar,
      Footer,
      Content,
      Notice,
      MobileMenu,
      Overview,
      Member,
      Group,
      Menu,
      // Admin,
      file,
      editor,
      NoticeAdd,
      NoticeDetail
    },
    mounted(){
      // EventBus.$on('message_bus',this.onReceive);
      console.log('auth : ' + this.$session.get('auth'));
      if(!this.$session.get('auth')) {
        const elem = this.$refs.login
        elem.click()
      }
    },
    methods: {
      oonReceive(text) {
            this.receiveText = text;
        },
      rename(name) {
        console.log('name : ' + name);
        this.name = name
      },
      changeCountents(name) {

        console.log("name is ... : " + name);

        var list = document.querySelectorAll('.nav-main__links li');

        if(name !== 'Login' && name !== 'directory' && name !== 'board') {
          this.active(list)
          this.name = name
        }

        if(name === 'directory') {
          for (var i = 0; i < list.length; i++) { 
            (function(idx) {
              list[idx].classList.remove("active");
            })(i);
          }
        }
        
        if(name === 'board') {
          var list2 = document.querySelectorAll('.navbar-nav li');
          this.active(list2)
        }
      },
      active(list) {
        for (var i = 0; i < list.length; i++) { 
          (function(idx) {
            list[idx].classList.remove("active");
            list[idx].onclick = function() {
              list[idx].classList.add("active");
            }
          })(i);
        }
      },
      movePage(urlName) {
        console.log('name : ' + this.name);
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