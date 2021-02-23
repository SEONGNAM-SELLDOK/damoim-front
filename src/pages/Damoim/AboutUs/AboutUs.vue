<template>
  <table class="table table-bordered table-lg mt-lg mb-0">
    <thead class="text-uppercase">
    <tr>
      <th>test</th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.id }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "AboutUs",
  data() {
    return {
      items: [
        {
          id: 0
        },
        {
          id: 1
        }]
    }
  }
}
</script>

<style scoped>

</style>
