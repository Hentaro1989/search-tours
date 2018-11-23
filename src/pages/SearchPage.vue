<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button>Main Page</v-ons-back-button>
      </div>
      <div class="center">Search Page</div>
    </v-ons-toolbar>
    <div>
      <v-ons-card v-for="tour in tours" :key="tour.id">
        <p class="title" style="font-size: 18px">{{tour.title}}</p>
        <table class="content">
          <tr>
            <td>期間: </td>
            <td>{{tour.term}} 日間</td>
          </tr>
          <tr>
            <td>出発地: </td>
            <td>{{tour.dept_city.name}}</td>
          </tr>
          <tr>
            <td>価格: </td>
            <td>
              <span style="font-size: 18px; color: red;">{{tour.price.min}}</span> 円 ~ <span style="font-size: 18px; color: red;">{{tour.price.max}}</span> 円</td>
          </tr>
          <tr>
            <td colspan="2"><a :href="tour.urls.pc" target="_blank">AB-ROAD で見る</a></td>
          </tr>
        </table>
      </v-ons-card>
    </div>
  </v-ons-page>
</template>

<script>
import { API_KEY } from '../constants'

export default {
  name: 'search-page',
  data () {
    return {
      tours: []
    }
  },
  methods: {
    fetch (url, query) {
      query.key = API_KEY
      query.format = 'jsonp'
      return this.$jsonp(url, query)
    },
    fetchTours () {
      const query = {
        ...this.$route.query,
        // ymd: this.date,
        // keyword: this.keyword,
        callback: 'onTour',
        count: 10,
        start: 1
      }
      this.fetch('https://webservice.recruit.co.jp/ab-road/tour/v1/', query)
        .then(({results}) => { this.tours = results.tour })
    }
  },
  created () {
    console.log('Search Page has been created.')
    this.fetchTours()
  }
}
</script>

<style scoped>
</style>

