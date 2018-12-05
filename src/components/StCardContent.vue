<template>
  <table class="content">
    <tr>
      <td class="data-title">期間: </td>
      <td>{{ tour.term }} 日間</td>
    </tr>
    <tr>
      <td class="data-title">出発地: </td>
      <td>{{ tour.dept_city.name }}</td>
    </tr>
    <tr>
      <td class="data-title">価格: </td>
      <td>
        <span class="price">{{ tour.price.min }} </span>
        円 ~
        <span class="price"> {{ tour.price.max }} </span>
        円
      </td>
    </tr>
    <tr>
      <td class="data-title">ホテル: </td>
      <td>{{ tour.hotel_summary }}</td>
    </tr>
    <tr>
      <td class="data-title">航空会社: </td>
      <td>{{ tour.airline_summary }}</td>
    </tr>
    <tr>
      <td class="data-title">シートクラス: </td>
      <td>{{ tour.seat_class.name }}</td>
    </tr>
    <tr>
      <td colspan="2" style="padding-top: 20px; border-top: solid 1px gray;"><a :href="tour.urls.pc" target="_blank">AB-ROAD で見る</a></td>
    </tr>
  </table>
</template>

<script>
export default {
  props: {
    tour: Object
  }
}
</script>

<style scoped>
.price {
  font-size: 18px; color: red;
}

.data-title {
  white-space: nowrap;
}
</style>
