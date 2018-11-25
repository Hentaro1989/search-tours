<template>
  <v-ons-page>
    <v-ons-toolbar class="home-toolbar">
      <div class="left">
        <v-ons-toolbar-button @click="$store.commit('splitter/toggle')">
          <v-ons-icon icon="fa-bars"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="center">{{ msg }}</div>
    </v-ons-toolbar>
    <st-select select-title="[SELECT AREA]"     event-name="on-area-selected"     :data="areas"     @on-area-selected="onAreaSelected"></st-select>
    <st-select select-title="[SELECT COUNTRY]"  event-name="on-country-selected"  :data="countries" @on-country-selected="onCountrySelected"></st-select>
    <st-select select-title="[SELECT CITY]"     event-name="on-city-selected"     :data="cities"    @on-city-selected="onCitySelected"></st-select>
    <v-ons-list style="text-align: center; padding: 25px 0;">
      <v-ons-input type="date" style="width: 300px" v-model="departureDate"></v-ons-input>
    </v-ons-list>
    <v-ons-list style="text-align: center; padding: 25px 0;">
      <v-ons-input type="text" placeholder="Free Word" style="width: 300px"></v-ons-input>
    </v-ons-list>
    <v-ons-list style="text-align: center; padding: 25px 0;">
      <v-ons-button @click="search()" style="margin: 6px 0">Search</v-ons-button>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
import StSelect from '../components/StSelect'
import { API_KEY } from '../constants'

export default {
  name: 'main-page',
  data () {
    return {
      msg: 'Main Page',
      areas: [],
      area: '',
      countries: [],
      country: '',
      cities: [],
      city: '',
      departureDate: ''
    }
  },
  watch: {
  },
  methods: {
    fetch (url, query) {
      query.key = API_KEY
      query.format = 'jsonp'
      return this.$jsonp(url, query)
    },
    fetchArea () {
      const query = {callback: 'onArea', count: 20}
      this.fetch('https://webservice.recruit.co.jp/ab-road/area/v1/', query)
        .then(({results}) => { this.areas = results.area })
    },
    onAreaSelected (value) {
      if (value !== 'menu') {
        this.area = value
        const query = {area: value, callback: 'onCountry', count: 100}
        this.fetch('https://webservice.recruit.co.jp/ab-road/country/v1/', query)
          .then(({results}) => { this.countries = results.country })
      } else {
        this.area = ''
        this.countries = []
        this.cities = []
      }
    },
    onCountrySelected (value) {
      if (value !== 'menu') {
        this.country = value
        const query = {country: value, callback: 'onCity', count: 100}
        this.fetch('https://webservice.recruit.co.jp/ab-road/city/v1/', query)
          .then(({results}) => { this.cities = results.city })
      } else {
        this.country = ''
        this.cities = []
      }
    },
    onCitySelected (value) {
      if (value !== 'menu') {
        this.city = value
      } else {
        this.city = ''
      }
    },
    search () {
      this.$router.push({
        name: 'Search',
        query: {
          area: this.area,
          country: this.country,
          city: this.city,
          ymd: this.departureDate.replace(/-/g, '')
        }
      })
    },
    formatDate (date) {
      const d = new Date(date)
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      const year = d.getFullYear()

      if (month.length < 2) {
        month = '0' + month
      }
      if (day.length < 2) {
        day = '0' + day
      }
      return [year, month, day].join('-')
    }
  },
  created () {
    this.departureDate = this.formatDate(new Date())
    this.fetchArea()
  },
  components: {
    StSelect
  }
}
</script>

<style scoped>

</style>
