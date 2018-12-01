<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button>海外旅行を検索</v-ons-back-button>
      </div>
      <div class="center">{{ pageName }}</div>
    </v-ons-toolbar>
    <div>
      <v-ons-card v-for="tour in tourResults.tour" :key="tour.id">
        <p class="title tour-title">{{ tour.title }}</p>
        <table class="content">
          <tr>
            <td>期間: </td>
            <td>{{ tour.term }} 日間</td>
          </tr>
          <tr>
            <td>出発地: </td>
            <td>{{ tour.dept_city.name }}</td>
          </tr>
          <tr>
            <td>価格: </td>
            <td>
              <span class="price">{{ tour.price.min }} </span>
              円 ~
              <span class="price"> {{ tour.price.max }} </span>
              円
            </td>
          </tr>
          <tr>
            <td colspan="2"><a :href="tour.urls.pc" target="_blank">AB-ROAD で見る</a></td>
          </tr>
        </table>
      </v-ons-card>
    </div>
    <v-ons-bottom-toolbar>
      <div class="bottom-abroad-link">
        <a href="http://webservice.recruit.co.jp/" target="_blank">
          <img src="http://webservice.recruit.co.jp/banner/abroad-m.gif"
            alt="エイビーロードWebサービス"
            width="88"
            height="35"
            border="0"
            title="エイビーロードWebサービス"
            style="vertical-align: middle;"
          >
        </a>
      </div>
      <div class="bottom-buttons">
        <v-ons-button @click="backToPreviousPage()" :disabled="isFetching" modifier="quiet" class="change-page-button">&lt;</v-ons-button>
        {{ pageData.currentPage }} / {{ pageData.allPage }}
        <v-ons-button @click="goToNextPage()" :disabled="isFetching" modifier="quiet" class="change-page-button">&gt;</v-ons-button>
      </div>
    </v-ons-bottom-toolbar>
  </v-ons-page>
</template>

<script>
import { API_KEY } from '../constants'
const apiKey = atob(API_KEY)

export default {
  name: 'search-page',
  data () {
    return {
      pageName: '検索結果',
      tourResults: {},
      pageData: {}
    }
  },
  methods: {
    fetch (url, query) {
      query.key = apiKey
      query.format = 'jsonp'
      return this.$jsonp(url, query)
    },
    fetchTours (index) {
      this.isFetching = true
      this.tourResults = {}
      const query = {
        ...this.$route.query,
        callback: 'onTour',
        count: 10,
        start: index || 1
      }
      this.fetch('https://webservice.recruit.co.jp/ab-road/tour/v1/', query)
        .then(({results}) => {
          this.tourResults = console.log(results) || results
          this.getCurrentPageInformation()
          this.isFetching = false
        })
    },
    getCurrentPageInformation () {
      const available = parseInt(this.tourResults.results_available, 10)
      this.start = parseInt(this.tourResults.results_start, 10)
      this.toursPerPage = 10

      const allPage = Math.ceil(available / this.toursPerPage)
      const currentPage = Math.floor(this.start === 1 ? 1 : (this.start - 1) / this.toursPerPage + 1)
      this.pageData = {currentPage, allPage}
    },
    goToNextPage () {
      this.start += this.toursPerPage
      this.$router.replace({name: 'Search', query: {...this.$route.query, start: this.start, toursPerPage: this.toursPerPage}})
      this.fetchTours(this.start)
    },
    backToPreviousPage () {
      const previousStart = this.start - this.toursPerPage
      if (previousStart < 1) {
        return
      }
      this.start = previousStart
      this.$router.replace({name: 'Search', query: {...this.$route.query, start: this.start, toursPerPage: this.toursPerPage}})
      this.fetchTours(this.start)
    }
  },
  created () {
    this.fetchTours(this.$route.query.start)
  }
}
</script>

<style scoped>
.tour-title {
  font-size: 18px;
}
.price {
  font-size: 18px; color: red;
}

ons-bottom-toolbar {
  display: table;
  width: 100%;
  text-align: right;
  padding: 0 10px;
}

.bottom-abroad-link {
  display: table-cell;
  vertical-align: middle;
  text-align: left;
}

.bottom-buttons {
  display: table-cell;
  vertical-align: middle;
  font-size: 20px;
}

.change-page-button {
  font-size: 25px;
}
</style>

