<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button>Main Page</v-ons-back-button>
      </div>
      <div class="center">Search Page</div>
    </v-ons-toolbar>
    <v-ons-card>
      <p style="text-align: center">This is the second page</p>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
export default {
  name: 'search-page',
  data () {
    return {}
  },
  methods: {
  },
  created () {
    console.log('Search Page has created.')
  }
}
</script>

<style scoped>
</style>

