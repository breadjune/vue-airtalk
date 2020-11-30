<template>
  <div class="wrapper">
    <a href=# @click="movePage('Login')" ref="login" style="display:none"></a>
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <ul>
        <li>
          <a href="#" @click="changeCountents('Overview')" class="nav-link">
            <i class="nc-icon nc-chart-pie-35"></i>
            Dashboard
          </a>
        </li>
        <li>
          <a href="#" @click="changeCountents('Member')" class="nav-link">
            <i class="nc-icon nc-circle-09"></i>
            계정 관리
          </a>
        </li>
        <li>
          <a href="#" @click="changeCountents('Group')" class="nav-link">
            <i class="nc-icon nc-settings-gear-64"></i>
            권한 관리
          </a>
        </li>
        <li>
          <a href="#" @click="changeCountents('User')" class="nav-link">
            <i class="nc-icon nc-single-02"></i>
            사용자 관리
          </a>
        </li>
        <li>
          <a href="#" @click="changeCountents('Code')" class="nav-link">
            <i class="nc-icon nc-puzzle-10"></i>
            서비스 코드 관리
          </a>
        </li>
        <li>
          <a href="#" @click="changeCountents('Alarm')" class="nav-link">
            <i class="nc-icon nc-time-alarm"></i>
            알림 관리
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
  import Member from '../pages/admin/member/Manage.vue'
  import Group from '../pages/admin/group/Manage.vue'
  import User from '../pages/service/user/Manage.vue'
  import Code from '../pages/service/code/Manage.vue'
  import Alarm from '../pages/service/alarm/Manage.vue'
  // import Menu from '../pages/admin/menu/Menu.vue'
  import editor from '../pages/admin/editor/Manage.vue'
  import file from '../pages/admin/file/Manage.vue'
  import Notice from '../pages/admin/notice/Manage.vue'
  // import NoticeAdd from '../pages/admin/notice/notice_add.vue'
  // import NoticeDetail from '../pages/admin/notice/notice_detail.vue'
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
      User,
      Code,
      Alarm,
      // Menu,
      file,
      editor,
      // NoticeAdd,
      // NoticeDetail
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