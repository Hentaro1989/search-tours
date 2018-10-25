<template>
  <v-ons-list class="ons-list">
      <v-ons-select class="ons-select" v-model="selected">
      <option value="menu">{{selectTitle}}</option>
      <option v-for="d in data" :key="d.name" :value="d.code">{{d.name}}</option>
      </v-ons-select>
  </v-ons-list>
</template>

<script>
export default {
  props: {
    selectTitle: String,
    eventName: String,
    data: Array
  },
  data () {
    return {
      selected: 'menu'
    }
  },
  watch: {
    selected (value) {
      this.$emit(this.eventName, value)
    }
  }
}
</script>

<style scoped>
.ons-list {
  text-align: center;
  padding: 25px 0;
}

.ons-select {
  width: 300px;
}

</style>
