import Default from '../layout/Default.vue'
import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Login from 'src/pages/Login.vue'
import Overview from 'src/pages/Overview.vue'
// import UserProfile from 'src/pages/UserProfile.vue'
// import TableList from 'src/pages/TableList.vue'
// import Typography from 'src/pages/Typography.vue'
import Notifications from 'src/pages/Notifications.vue'
// import Upgrade from 'src/pages/Upgrade.vue'

import GroupManage from 'src/pages/admin/group/Manage.vue'
import GroupInfo from 'src/pages/admin/group/View.vue'
import GroupCreate from 'src/pages/admin/group/Create.vue'

import Menu from 'src/pages/admin/menu/Menu.vue'

import MemberManage from'src/pages/admin/member/Manage.vue'
import MemberView from'src/pages/admin/member/View.vue'
import MemberCreate from'src/pages/admin/member/Create.vue'

// import Notice from 'src/pages/admin/notice/notice.vue'
// import NoticeAdd from 'src/pages/admin/notice/notice_add.vue'
// import NoticeDetail from 'src/pages/admin/notice/notice_detail.vue'
// import NoticeUpdate from 'src/pages/admin/notice/notice_update.vue'

import NoticeManage from 'src/pages/admin/notice/Manage.vue'
import NoticeCreate from 'src/pages/admin/notice/Create.vue'
import NoticeView from 'src/pages/admin/notice/View.vue'

import EditorMain from 'src/pages/admin/editor/Manage.vue'
import EditorInfo from 'src/pages/admin/editor/View.vue'
import EditorCreate from 'src/pages/admin/editor/Create.vue'

import FileManage from 'src/pages/admin/file/Manage.vue'
import FileCreate from 'src/pages/admin/file/Create.vue'
import FileView from 'src/pages/admin/file/View.vue'

import UserManage from 'src/pages/service/user/Manage.vue'
import UserView from 'src/pages/service/user/View.vue'
import UserCreate from 'src/pages/service/user/Create.vue'

import AlarmManage from 'src/pages/service/alarm/Manage.vue'
import AlarmView from 'src/pages/service/alarm/View.vue'

import CodeManage from 'src/pages/service/code/Manage.vue'
import CodeView from 'src/pages/service/code/View.vue'
import CodeCreate from 'src/pages/service/code/Create.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    component: DashboardLayout,
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview,
      },
      {
        path: 'group-list',
        name: 'Group',
        component: GroupManage
      },
      {
        path: 'group-view',
        name: 'GroupInfo',
        component: GroupInfo,
        props: true
      },
      {
        path: 'group-create',
        name: 'GroupCreate',
        component: GroupCreate
      },
      {
        path: 'member-list',
        name: 'MemberManage',
        component: MemberManage
      },
      {
        path: 'member-info',
        name: 'MemberView',
        component: MemberView
      },
      {
        path: 'member-create',
        name: 'MemberCreate',
        component: MemberCreate
      },
      {
        path: 'file-list',
        name: 'File',
        component: FileManage
      },
      {
        path: 'file-create',
        name: 'FileCreate',
        component: FileCreate
      },
      {
        path: 'file-view',
        name: 'FileView',
        component: FileView
      },
      /*{
        path: 'user-register',
        name: 'User',
        component: UserRegister
      },*/
      // {
      //   path: 'user',
      //   name: 'User',
      //   component: UserProfile
      // },
      // {
      //   path: 'table-list',
      //   name: 'Table List',
      //   component: TableList
      // },
      // {
      //   path: 'typography',
      //   name: 'Typography',
      //   component: Typography
      // },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      // {
      //   path: 'upgrade',
      //   name: 'Upgrade to PRO',
      //   component: Upgrade
      // },
      {
        path: 'menu',
        name : 'Menu',
        component: Menu,
      },
      {
        path: 'notice',
        name : 'Notice',
        component: NoticeManage,
      },
      {
        path: 'noticeCreate',
        name : 'NoticeCreate',
        component: NoticeCreate,
      },
      {
        path: 'noticeView',
        name : 'NoticeView',
        component: NoticeView,
      },
      {
        path: 'editorMain',
        name : 'EditorMain',
        component: EditorMain,
      },
      {
        path: 'editorInfo',
        name : 'EditorInfo',
        component: EditorInfo,
      },
      {
        path: 'editorCreate',
        name : 'EditorCreate',
        component: EditorCreate,
      },
    ]
  },
  {
     path: '/service',
    component: DashboardLayout,
    children: [
      {
        path: 'userManage',
        name : 'UserManage',
        component: UserManage,
      },
      {
        path: 'userView',
        name : 'UserView',
        component: UserView,
      },
      {
        path: 'userCreate',
        name : 'UserCreate',
        component: UserCreate,
      },
      {
        path: 'alarmManage',
        name: 'AlarmManage',
        component: AlarmManage
      },
      {
        path: 'alarmView',
        name: 'AlarmView',
        component: AlarmView
      },
      {
        path: 'codeManage',
        name : 'CodeManage',
        component: CodeManage,
      },
      {
        path: 'codeView',
        name : 'CodeView',
        component: CodeView,
      },
      {
        path: 'codeCreate',
        name : 'CodeCreate',
        component: CodeCreate,
      },
  
    
    ]
  },
 
   
  // { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
