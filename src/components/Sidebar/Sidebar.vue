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
            header="About us"
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
            header="커뮤니티"
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
              { header: '세미나', link: '/app/components/seminar' },
              { header: '도서 리뷰', link: '/app/components/books' },
              { header: '강의 추천', link: '/app/components/lecture' },
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
            link="/app/usedDeal"
            iconName="flaticon-equal-1"
            index="usedDeal"
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
