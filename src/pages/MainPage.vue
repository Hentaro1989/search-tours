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
    <st-select select-title="[select area]"     event-name="on-area-selected"     :data="areas"     @on-area-selected="onAreaSelected"></st-select>
    <st-select select-title="[select country]"  event-name="on-country-selected"  :data="countries" @on-country-selected="onCountrySelected"></st-select>
    <st-select select-title="[select city]"     event-name="on-city-selected"     :data="cities"    @on-city-selected="onCitySelected"></st-select>
    <v-ons-list style="text-align: center; padding: 25px 0;">
      <v-ons-input placeholder="Departure Date" style="width: 300px"></v-ons-input>
    </v-ons-list>
    <v-ons-list style="text-align: center; padding: 25px 0;">
      <v-ons-input placeholder="Free Word" style="width: 300px"></v-ons-input>
    </v-ons-list>
    <v-ons-list style="text-align: center; padding: 25px 0;">
      <v-ons-button style="margin: 6px 0">Search</v-ons-button>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
// import queryString from 'query-string'
import StSelect from '../components/StSelect'
import { API_KEY } from '../constants'
import Vue from 'vue'
import VueJsonp from 'vue-jsonp'

Vue.use(VueJsonp)

export default {
  name: 'main-page',
  data () {
    return {
      msg: 'Main Page',
      areas: [],
      selectedArea: '',
      countries: [],
      selectedCountry: '',
      cities: [],
      selectedCity: ''
    }
  },
  watch: {
  },
  methods: {
    fetchArea () {
      const query = {}
      query.key = API_KEY
      query.format = 'jsonp'
      query.callback = 'onArea'
      query.count = 20
      this.$jsonp('https://webservice.recruit.co.jp/ab-road/area/v1/', query)
        .then(({results}) => { this.areas = results.area })
    },
    onAreaSelected (value) {
      if (value !== 'menu') {
        this.selectedArea = value
        const query = {}
        query.key = API_KEY
        query.area = value
        query.format = 'jsonp'
        query.callback = 'onCountry'
        query.count = 100
        this.$jsonp('https://webservice.recruit.co.jp/ab-road/country/v1/', query)
          .then(({results}) => { this.countries = results.country })
      } else {
        this.selectedArea = ''
        this.countries = []
      }
    },
    onCountrySelected (value) {
      if (value !== 'menu') {
        this.selectedCountry = value
        const query = {}
        query.key = API_KEY
        query.country = value
        query.format = 'jsonp'
        query.callback = 'onCity'
        query.count = 100
        this.$jsonp('https://webservice.recruit.co.jp/ab-road/city/v1/', query)
          .then(({results}) => { this.cities = results.city })
      } else {
        this.selectedCountry = ''
        this.cities = []
      }
    },
    onCitySelected (value) {
      if (value !== 'menu') {
        this.selectedCity = value
      } else {
        this.selectedCity = ''
      }
    }
  },
  created () {
    this.fetchArea()
  },
  components: {
    StSelect
  }
}
</script>

<style scoped>

</style>
