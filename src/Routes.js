import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';
import Login from '@/pages/Login/Login';
import ErrorPage from '@/pages/Error/Error';
// Core
import TypographyPage from '@/pages/Typography/Typography';

// Tables
import TablesBasicPage from '@/pages/Tables/Basic';

// Maps
import GoogleMapPage from '@/pages/Maps/Google';

// Main
import AnalyticsPage from '@/pages/Dashboard/Dashboard';

// Charts
import ChartsPage from '@/pages/Charts/Charts';

// Ui
import IconsPage from '@/pages/Icons/Icons';
import NotificationsPage from '@/pages/Notifications/Notifications';

// Damoim
import AboutUsPage from '@/pages/Damoim/AboutUs/AboutUs';
import StudyPage from '@/pages/Damoim/Study/Study';
import CommunityPage from '@/pages/Damoim/Community/Community';
import SeminarPage from '@/pages/Damoim/Event/Seminar/Seminar';
import LecturePage from '@/pages/Damoim/Event/Lecture/Lecture';
import BookPage from '@/pages/Damoim/Event/Book/Book';
import RecruitPage from '@/pages/Damoim/Recruit/Recruit';
import TradePage from '@/pages/Damoim/Trade/Trade';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/error',
      name: 'Error',
      component: ErrorPage,
    },
    {
      path: '/app',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: 'dashboard',
          name: 'AnalyticsPage',
          component: AnalyticsPage,
        },
        {
          path: 'aboutUs',
          name: 'AboutUsPage',
          component: AboutUsPage,
        },
        {
          path: 'study',
          name: 'StudyPage',
          component: StudyPage,
        },
        {
          path: 'community',
          name: 'CommunityPage',
          component: CommunityPage,
        },
        {
          path: 'seminar',
          name: 'SeminarPage',
          component: SeminarPage,
        },
        {
          path: 'lecture',
          name: 'LecturePage',
          component: LecturePage,
        },
        {
          path: 'book',
          name: 'BookPage',
          component: BookPage,
        },
        {
          path: 'recruit',
          name: 'RecruitPage',
          component: RecruitPage,
        },
        {
          path: 'trade',
          name: 'TradePage',
          component: TradePage,
        },
        {
          path: 'typography',
          name: 'TypographyPage',
          component: TypographyPage,
        },
        {
          path: 'components/icons',
          name: 'IconsPage',
          component: IconsPage,
        },
        {
          path: 'notifications',
          name: 'NotificationsPage',
          component: NotificationsPage,
        },
        {
          path: 'components/charts',
          name: 'ChartsPage',
          component: ChartsPage,
        },
        {
          path: 'tables',
          name: 'TablesBasicPage',
          component: TablesBasicPage,
        },
        {
          path: 'components/maps',
          name: 'GoogleMapPage',
          component: GoogleMapPage,
        },
      ],
    },
  ],
});
