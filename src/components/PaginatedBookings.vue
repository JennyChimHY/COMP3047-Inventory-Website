<template>
  <div class="hello">

    <!-- Image Caps to display record -->
    <!-- javascript syntax: router-link -->
    <div class="row">

      <!-- <button type="button" class="btn btn-primary text-end"
              @click="borrowInventory()">Borrow</button> -->
      <!-- for testing -->




      <div class="card col-md-6 col-lg-4" v-for="product in inventory" :key="product._id">
      
        <router-link :to="`/${product.type}/detail/${product._id}`">
          <!-- added ${product._id}} -->
          <img :src="`${product.image}`" class="card-img-top" alt="">
        </router-link>
        <div class="card-body" style="text-align: left">
          <h5 class="card-title">{{ product.title }}</h5>
          <p class="card-text">{{ product.description }}</p>
          <p class="card-text" v-if="product.status == 'Borrowed by others' && user_category == 'Customer' && type == 'book' || type == 'game'"><small
              class="text-muted">Borrowed by others</small></p>
          <!-- type == 'book': passed from props (below) but not params -->
          <p class="card-text" v-if="user_category == 'Customer' && type == 'gift' || type == 'material'"><small
              class="text-muted">Remaining</small></p>

          <!-- button borrow or consume + its function/instance method: +- amount and store the borrower's username -->
          <div class="col-1">
            <button type="button" class="btn btn-primary text-end"
              v-if="product.status == 'Available' && user_category == 'Customer' && type == 'book' || type == 'game'"
              @click="borrowInventory(product._id)">Borrow</button>

            <button type="button" class="btn btn-outline-primary text-end"
              v-if="product.status == 'Borrowed by me' && user_category == 'Customer' && type == 'book' || type == 'game'"
              @click="returnInventory(product._id)">Return</button>

            <button type="button" class="btn btn-primary text-end"
              v-if="user_category == 'Customer' && type == 'gift' || type == 'material'"
              @click="consumeInventory()">Consume</button>
          </div>
          <!-- v-if borrowed by a useer -->
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
import jwt_decode from "jwt-decode";

export default {
  name: "PaginatedBookings",
  props: {
    msg: String,
    type: String //for different type of product
  },
  setup(props) {
    // const route = useRoute();
    const inventory = ref([]);
    const lastPage = ref(0);
    const perPage = ref(6);
    const current = ref(1);
    const user_category = ref({});
    const user_email = ref({});
    const user_ID = ref(false);
    const pages = computed(() => {
      var pages = [];
      for (var i = 1; i <= lastPage.value; i++) { //not this.value but lastPage.value
        pages.push(i);
      }
      return pages;
    });
    const fetchPage = async function (page) {
      var response = await fetch("/api/inventory?perPage=" + perPage.value + "&page=" + page + "&type=" + props.type, {

        headers: {
          'x-access-token': localStorage.getItem('user')
        }
      }); //route.params.type    not this.value but perPage.value
      if (response.ok) {
        var data = await response.json();
        inventory.value = data.inventory; //changed in backend -- return res.json({ inventory: results, pages: pages })
        lastPage.value = data.pages;
        current.value = page;
      }
      else {
        alert(response.statusText);
      }
    };

    //asm3: borrow or consume
    onMounted(async () => {

      let token = localStorage.getItem("user"); //from backend threw to frontend
      if (token) {
        var decoded = jwt_decode(token);  //decode the packet from backend
        console.log(decoded)
        user_category.value = decoded.user_category;  //var name same as backend
        user_email.value = decoded.user_email;
        user_ID.value = decoded.user_id;  //backend: user_id --> frontend declare: user_ID
      }
      fetchPage(1); //fetch page after onMounted and receive the data
    });

    const borrowInventory = async function (id) {
      var response = await fetch("/api/inventory/borrow/" + props.type + "/" + id, {
        method: "post",
        headers: {
          'Content-Type': 'application/json',
          "x-access-token": localStorage.getItem("user")
        },

        // body: new URLSearchParams(new FormData(event.target))
        body: JSON.stringify(inventory.value)

      });
      if (response.ok) {
        var text = await response.text();
        alert(text);
        location.assign("/" + props.type + "s");
      } else {
        alert(response.statusText)
      }

    }

    const consumeInventory = async function () {
      // var response = await fetch("/api/inventory/consume/" + props.type + "/" + user_ID.value, {
      //   method: "PUT",

      // if (response.ok) {
      //   alert("Consumed successfully!");
      //   fetchPage(1);
      // }
      // else {
      //   alert(response.statusText);
      // }
    };

    
    const returnInventory = async function () {
      // var response = await fetch("/api/inventory/consume/" + props.type + "/" + user_ID.value, {
      //   method: "PUT",

      // if (response.ok) {
      //   alert("Consumed successfully!");
      //   fetchPage(1);
      // }
      // else {
      //   alert(response.statusText);
      // }
    };


    return {
      inventory,
      borrowInventory,
      consumeInventory,
      returnInventory,
      pages,
      fetchPage,
      current,
      user_category,
      user_email,
      user_ID
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
