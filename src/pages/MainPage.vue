<template>
  <v-ons-page>
    <v-ons-toolbar class="home-toolbar">
      <div class="left">
        <v-ons-toolbar-button @click="$store.commit('splitter/toggle')">
          <v-ons-icon icon="fa-bars"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="center">{{ pageName }}</div>
    </v-ons-toolbar>
    <v-ons-list modifier="inset" class="search-list">
      <v-ons-list-header>エリア</v-ons-list-header>
      <v-ons-list-item>
        <st-select select-title="[エリアを選択]" target-name="area" :data="areas" @on-area-select="onAreaSelect"></st-select>
      </v-ons-list-item>
      <v-ons-list-header>国</v-ons-list-header>
      <v-ons-list-item>
        <st-select select-title="[国を選択]" target-name="country" :data="countries" @on-country-select="onCountrySelect"></st-select>
      </v-ons-list-item>
      <v-ons-list-header>都市</v-ons-list-header>
      <v-ons-list-item>
        <st-select select-title="[都市を選択]" target-name="city" :data="cities" @on-city-select="onCitySelect"></st-select>
      </v-ons-list-item>
      <v-ons-list-header>出発日</v-ons-list-header>
      <v-ons-list-item>
        <v-ons-input type="date" style="width: 300px" v-model="departureDate"></v-ons-input>
      </v-ons-list-item>
      <v-ons-list-header>フリーワード</v-ons-list-header>
      <v-ons-list-item>
        <v-ons-input type="text" placeholder="(例)ベトナム　癒し" style="width: 300px" v-model="freeWord"></v-ons-input>
      </v-ons-list-item>
    </v-ons-list>
    <v-ons-bottom-toolbar modifier="transparent">
      <v-ons-button class="search-button" @click="search()" modifier="large">検索</v-ons-button>
    </v-ons-bottom-toolbar>
  </v-ons-page>
</template>

<script>
import StSelect from '../components/StSelect'
import { API_KEY } from '../constants'
const apiKey = atob(API_KEY)

export default {
  name: 'main-page',
  data () {
    return {
      pageName: '海外旅行を検索',
      areas: [],
      countries: [],
      cities: [],
      area: '',
      country: '',
      city: '',
      departureDate: '',
      freeWord: ''
    }
  },
  watch: {
  },
  methods: {
    fetch (url, query) {
      query.key = apiKey
      query.format = 'jsonp'
      return this.$jsonp(url, query)
    },
    fetchArea () {
      const query = {callback: 'onArea', count: 20}
      this.fetch('https://webservice.recruit.co.jp/ab-road/area/v1/', query)
        .then(({results}) => { this.areas = results.area })
    },
    onAreaSelect (value) {
      if (value) {
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
    onCountrySelect (value) {
      if (value) {
        this.country = value
        const query = {country: value, callback: 'onCity', count: 100}
        this.fetch('https://webservice.recruit.co.jp/ab-road/city/v1/', query)
          .then(({results}) => { this.cities = results.city })
      } else {
        this.country = ''
        this.cities = []
      }
    },
    onCitySelect (value) {
      if (value) {
        this.city = value
      } else {
        this.city = ''
      }
    },
    search () {
      if (!this.area && !this.freeWord) {
        this.$ons.notification.alert('「エリア」を選択するか、「フリーワード」を入力してください。')
        return
      }
      this.$router.push({
        name: 'Search',
        query: {
          area: this.area,
          country: this.country,
          city: this.city,
          ymd: this.departureDate && this.departureDate.replace(/-/g, ''),
          keyword: this.freeWord
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
    this.fetchArea()
  },
  components: {
    StSelect
  }
}
</script>

<style scoped>
.search-list {
  margin-top: 8px;
}

ons-bottom-toolbar {
  margin: 0 6px;
}

.search-button {
  padding: 0;
}
</style>
