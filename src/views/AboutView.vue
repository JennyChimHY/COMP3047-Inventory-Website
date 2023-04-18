<template>

  <div class="row" style="width: 80rem;">
    <div class="col-sm-6" style="text-align: left;">
      <!-- left alignment -->
      <div class="card">
        <div class="card-body">
          <h1 class="card-title"> Inventory System </h1>
          <p class="card-text">This is a modified jumbotron that occupies the entire horizontal space of
            its parent.</p>
        </div>
      </div>
    </div>

    <!-- element is used here -->
    <!-- create chart -->
    <div class="col-sm-6">
      <ChartView />
    </div>
  </div>


  <div class="text-start">
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import { ref, onMounted } from "vue";
import ChartView from '@/components/ChartView.vue'

export default {
  name: 'AboutView',
  components: {
        ChartView
    },
    
  setup() {
    const options = ref({});
    const series = ref([44, 55, 41, 17, 15]);

    onMounted(async () => {

      // var response = await fetch("/api/bookings/aggregate/groupby");
      let token = localStorage.getItem("user");

      var response = await fetch("/api/inventory/aggregate/groupby", {
        headers: {
          "x-access-token": token
        }
      });

      if (response.ok) {
        var heroes = await response.json();

        series.value = heroes.map(a => a.count);
        options.value = { labels: heroes.map(a => a._id) };
      }
    });

    return {
      options, series
    }
  }

}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

