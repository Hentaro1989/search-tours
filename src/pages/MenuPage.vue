<template>
  <v-ons-page>
    <v-ons-toolbar modifier="transparent"></v-ons-toolbar>
    <div class="header">
      <img src="../assets/search-tours-logo.png" alt="search-tours-logo">
    </div>

    <v-ons-list-title>Search Tours Links</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item modifier="chevron" v-for="item in essentialLinks" @click="goTo(item.link)" :key="item.link">
        <div class="left"><v-ons-icon fixed-width :icon="item.icon"></v-ons-icon></div>
        <div class="center">{{ item.label }}</div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
export default {
  name: 'menu-page',
  data () {
    return {
      essentialLinks: [
        {
          label: 'AB-ROAD',
          link: 'https://www.ab-road.net/',
          icon: 'fa-suitcase'
        },
        {
          label: 'Developer',
          link: 'https://twitter.com/retry_htr',
          icon: 'fa-twitter'
        }
      ]
    }
  },
  methods: {
    goTo (url) {
      const newWindow = window.open(url, '_blank')
      newWindow.opener = null
      newWindow.location = url
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  text-align: center;
  margin-bottom: 20px;
}

img {
  max-width: 150px;
}

ons-list-title {
  text-transform: none;
}

ons-list-item {
  cursor: pointer;
}
</style>
