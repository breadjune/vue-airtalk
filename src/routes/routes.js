import Default from '../layout/Default.vue'
import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Login from 'src/pages/Login.vue'
import Overview from 'src/pages/Overview.vue'
import UserProfile from 'src/pages/UserProfile.vue'
import TableList from 'src/pages/TableList.vue'
import Typography from 'src/pages/Typography.vue'
import Icons from 'src/pages/Icons.vue'
import Maps from 'src/pages/Maps.vue'
import Notifications from 'src/pages/Notifications.vue'
import Upgrade from 'src/pages/Upgrade.vue'

import MemberManage from 'src/pages/admin/member/MemberManage.vue'
import MemberInfo from 'src/pages/admin/member/MemberInfo.vue'

import GroupManage from 'src/pages/admin/group/GroupManage.vue'
import GroupInfo from 'src/pages/admin/group/GroupInfo.vue'
import GroupCreate from 'src/pages/admin/group/GroupCreate.vue'

import Menu from 'src/pages/admin/menu-list/Menu.vue'
import MovePage from 'src/pages/admin/menu-list/MovePage.vue'

import AdminManager from'src/pages/admin/adminManager/AdminManager.vue'

const routes = [
  {
    path: '/',
    component: Default,
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
        path: 'member-list',
        name: 'Member',
        component: MemberManage,
      },
      {
        path: 'member-view',
        name: 'MemberInfo',
        component: MemberInfo
      },
      {
        path: 'group-list',
        name: 'Group',
        component: GroupManage
      },
      {
        path: 'group-view',
        name: 'GroupInfo',
        component: GroupInfo
      },
      {
        path: 'group-create',
        name: 'GroupCreate',
        component: GroupCreate
      },
      {
        path: 'admin-list',
        name: 'Admin',
        component: AdminManager
      },
      /*{
        path: 'user-register',
        name: 'User',
        component: UserRegister
      },*/
      {
        path: 'user',
        name: 'User',
        component: UserProfile
      },
      {
        path: 'table-list',
        name: 'Table List',
        component: TableList
      },
      {
        path: 'typography',
        name: 'Typography',
        component: Typography
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'Maps',
        component: Maps
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade
      },
      {
        path: 'menu-list',
        name : 'Menu',
        component: Menu,
      },
      {
        path: 'movePage',
        name : 'MovePage',
        component: MovePage,
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
