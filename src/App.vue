<template>
  <v-ons-page id="app">
    <v-ons-splitter>
      <v-ons-splitter-side swipeable collapse width="250px"
        :animation="$ons.platform.isAndroid() ? 'overlay' : 'reveal'"
        :open.sync="menuIsOpen">
        <menu-page></menu-page>
      </v-ons-splitter-side>

      <v-ons-splitter-content>
        <v-ons-navigator
          swipeable
          :page-stack="pageStack"
          :pop-page="popPage"
        >
        </v-ons-navigator>
      </v-ons-splitter-content>
    </v-ons-splitter>
  </v-ons-page>
</template>

<script>
import MenuPage from './pages/MenuPage'
import MainPage from './pages/MainPage'
import SearchPage from './pages/SearchPage'

export default {
  name: 'app',
  data () {
    return {
      pageStack: [MainPage]
    }
  },
  computed: {
    menuIsOpen: {
      get () {
        return this.$store.state.splitter.open
      },
      set (newValue) {
        this.$store.commit('splitter/toggle', newValue)
      }
    }
  },
  methods: {
    popPage () {
      this.$router.back()
    }
  },
  watch: {
    $route (to, from) {
      this.pageStack = to.matched.map(m => m.components.default)
    }
  },
  created () {
    this.pageStack = this.$route.matched.map(m => m.components.default)
  },
  components: {
    MenuPage,
    MainPage,
    SearchPage
  }
}
</script>

<style>
ons-splitter-side[side=left][animation=overlay] {
  border-right: 1px solid #BBB;
}
</style>
