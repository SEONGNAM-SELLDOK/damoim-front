<template>
  <div class="sidebar-wrapper">
    <nav
        :class="{sidebar: true, sidebarStatic, sidebarOpened}"
        @mouseenter="sidebarMouseEnter"
        @mouseleave="sidebarMouseLeave"
    >
      <header class="logo">
        <router-link to="/app/dashboard"><span class="primary-word">DAMOIM</span> <span class="secondary-word"> </span></router-link>
      </header>
      <h5 class="navTitle first">
        APP
      </h5>
      <ul class="nav">
        <NavLink
            :activeItem="activeItem"
            header="소개글(X)"
            link="/app/aboutUs"
            iconName="flaticon-home"
            index="aboutUs"
            isHeader
        />
        <NavLink
            :activeItem="activeItem"
            header="스터디 모임"
            link="/app/study"
            iconName="flaticon-list"
            index="study"
            isHeader
        />
        <NavLink
            :activeItem="activeItem"
            header="커뮤니티(X)"
            link="/app/community"
            iconName="flaticon-equal-1"
            index="community"
            isHeader
        />
        <NavLink
            :activeItem="activeItem"
            header="이벤트"
            link="/app/event"
            iconName="flaticon-network"
            index="event"
            :childrenLinks="[
              { header: '세미나', link: '/app/seminar' },
              { header: '도서 리뷰', link: '/app/book' },
              { header: '강의 추천', link: '/app/lecture' },
            ]"
        />
        <NavLink
            :activeItem="activeItem"
            header="구인 구직"
            link="/app/recruit"
            iconName="flaticon-equal-1"
            index="recruit"
            isHeader
        />
        <NavLink
            :activeItem="activeItem"
            header="중고 거래"
            link="/app/trade"
            iconName="flaticon-equal-1"
            index="trade"
            isHeader
        />
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import isScreen from '@/core/screenHelper';
import NavLink from './NavLink/NavLink';

export default {
  name: 'Sidebar',
  components: { NavLink },
  data() {
    return {
      alerts: [
        {
          id: 0,
          title: 'Sales Report',
          value: 15,
          footer: 'Calculating x-axis bias... 65%',
          color: 'danger',
        },
        {
          id: 1,
          title: 'Personal Responsibility',
          value: 20,
          footer: 'Provide required notes',
          color: 'primary',
        },
      ],
    };
  },
  methods: {
    ...mapActions('layout', ['changeSidebarActive', 'switchSidebar']),
    setActiveByRoute() {
      const paths = this.$route.fullPath.split('/');
      paths.pop();
      this.changeSidebarActive(paths.join('/'));
    },
    sidebarMouseEnter() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(false);
        this.setActiveByRoute();
      }
    },
    sidebarMouseLeave() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      }
    },
  },
  created() {
    this.setActiveByRoute();
  },
  computed: {
    ...mapState('layout', {
      sidebarStatic: true,
      sidebarOpened: true,
      activeItem: state => state.sidebarActiveElement,
    }),
  },
};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
