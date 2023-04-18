<template>
  <!-- Nav bar and search for ALL pages -->
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Inventory</a> 
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" v-if="user_ID" href="/books">Books</a>  <!-- user_ID is decoded ver. of token.user_id(?) -->
          </li>
          <li class="nav-item">
            <a class="nav-link" v-if="user_ID" href="/games">Games</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" v-if="user_ID" href="/gifts">Gifts</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" v-if="user_ID" href="/materials">Materials</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" v-if="user_ID && user_category == 'Admin'" href="/users">Users</a>
          </li>
        </ul>
        <router-link to="/signin" class="btn btn-primary" v-if="!user_ID" role="button">Sign in</router-link>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" v-if="user_ID" placeholder="Search" aria-label="Search" v-model="title">
          <router-link to="/search" class="btn btn-outline-success" v-if="user_ID" role="button" @click="search">Search</router-link>
        </form>        
        <router-link to="/" class="btn btn-outline-primary" v-if="user_ID" role="button" @click="logout">Sign out</router-link>
      </div>
    </div>
  </nav>

  <div class="text-start">
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import { ref, onMounted } from "vue";
import jwt_decode from "jwt-decode";

export default {
  name: 'GeneralView',
  setup() {
    const options = ref({});
    const title = ref({});
    const series = ref([44, 55, 41, 17, 15]);

    const search = async function () {

      var response = await fetch("/api/inventory/", {
                method: "get",
                // headers: {
                //     // 'Content-Type': 'application/x-www-form-urlencoded',
                //     'Content-Type': 'application/json'
                // },
                query: JSON.stringify(title.value)

            });
            if (response.ok) {

                var text = await response.text();
                alert(text);
                location.assign("/search");
            } else {
                alert(response.statusText)
            }

    }
    const logout = function () {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('user_category');
      localStorage.removeItem('user_ID');
      localStorage.removeItem('user_username');
      localStorage.removeItem('user_email');
      localStorage.removeItem('user_password');
      location.reload()
      location.assign('/') //jump to home page without login
    }
    const user_category = ref({});
    const user_email = ref({});
    const user_ID = ref(false);

    onMounted(async () => {

      // var response = await fetch("/api/bookings/aggregate/groupby");
      let token = localStorage.getItem("user"); //from backend threw to frontend
      if (token) {
        var decoded = jwt_decode(token);  //decode the packet from backend
        user_category.value = decoded.user_category;  //var name same as backend
        user_email.value = decoded.user_email;
        user_ID.value = decoded.user_id;  //backend: user_id --> frontend declare: user_ID
        console.log(decoded);
      }

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
      options, series, search, logout, user_category, user_email, user_ID
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

