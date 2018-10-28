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
      <v-ons-input placeholder="Departure Date" style="width: 300px"></v-ons-input>
    </v-ons-list>
    <v-ons-list style="text-align: center; padding: 25px 0;">
      <v-ons-input placeholder="Free Word" style="width: 300px"></v-ons-input>
    </v-ons-list>
    <v-ons-list style="text-align: center; padding: 25px 0;">
      <v-ons-button @click="search()" style="margin: 6px 0">Search</v-ons-button>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
import StSelect from '../components/StSelect'
import { API_KEY } from '../constants'
import SearchPage from './SearchPage'

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
        this.selectedArea = value
        const query = {area: value, callback: 'onCountry', count: 100}
        this.fetch('https://webservice.recruit.co.jp/ab-road/country/v1/', query)
          .then(({results}) => { this.countries = results.country })
      } else {
        this.selectedArea = ''
        this.countries = []
        this.cities = []
      }
    },
    onCountrySelected (value) {
      if (value !== 'menu') {
        this.selectedCountry = value
        const query = {country: value, callback: 'onCity', count: 100}
        this.fetch('https://webservice.recruit.co.jp/ab-road/city/v1/', query)
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
    },
    search () {
      this.$router.push({name: 'Search'})
      this.$emit('push-page', SearchPage)
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
