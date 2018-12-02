<template>
  <v-ons-select v-model="selected" :disabled="!data.length">
    <option value="">{{ selectTitle }}</option>
    <option v-for="d in data" :key="d.name" :value="d.code">{{ d.name }}</option>
  </v-ons-select>
</template>

<script>
export default {
  props: {
    selectTitle: String,
    targetName: String,
    data: Array
  },
  data () {
    return {
      selected: ''
    }
  },
  watch: {
    selected (value) {
      this.$emit(`on-${this.targetName}-select`, value)
    }
  }
}
</script>

<style scoped>
ons-select {
  padding: 0 16px;
  width: 100%;
}
</style>
