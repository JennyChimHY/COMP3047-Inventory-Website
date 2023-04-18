<template>
  <div class="hello">
    <!-- Image Caps to display record -->
    <!-- javascript syntax: router-link -->
    <div class="row">
      <div class="card col-md-6 col-lg-4" v-for="info in user" :key="info._id">
        <div class="card-body" style="text-align: center">
          <h5 class="card-title">{{ info.fullName }}</h5>
          <h6 class="card-text" mb-2 text-muted>{{ info.email }}</h6>
          <router-link :to="`/user/detail/${info._id}`">Update</router-link>

        </div>
      </div>
    </div>

    <!-- button for pagination -->
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item">
          <a class="page-link" @click="fetchPage(current - 1)">Previous</a>
        </li>
        <li class="page-item"><a class="page-link" @click="fetchPage(current)">{{ current }}</a></li>
        <li class="page-item"><a class="page-link" @click="fetchPage(current + 1)">{{ current + 1 }}</a></li>
        <li class="page-item"><a class="page-link" @click="fetchPage(current + 2)">{{ current + 2 }}</a></li>
        <li class="page-item">
          <a class="page-link" @click="fetchPage(current + 1)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
  
<script>
// import useRoute from "vue-router";
import { ref, onMounted, computed } from "vue"; //define those three
export default {
  name: "UserPaginated",
  props: {
    msg: String,
  },
  setup() {
    // const route = useRoute();
    const user = ref([]);
    const lastPage = ref(0);
    const perPage = ref(6);
    const current = ref(1);
    console.log(current);
    const pages = computed(() => {
      var pages = [];
      for (var i = 1; i <= lastPage.value; i++) { //not this.value but lastPage.value
        pages.push(i);
      }
      return pages;
    });
    const fetchPage = async function (page) {
      var response = await fetch("/api/user?perPage=" + perPage.value + "&page=" + page); //no need category: user/admin, route.params.type    not this.value but perPage.value
      if (response.ok) {
        var data = await response.json();
        user.value = data.user; //changed in backend -- return res.json({ inventory: results, pages: pages })
        lastPage.value = data.pages;
        current.value = page;
      }
      else {
        alert(response.statusText);
      }
    };
    // onMounted(() => { fetchPage(1) });
    onMounted(function () {
      fetchPage(1);
      // alert(props.msg)
    });
    return {
      user,
      pages,
      fetchPage,
      current,
    };
  },
  // components: { router }
}

</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
}

a {
  color: #42b983;
  margin: 0 0px;
}
</style>
  