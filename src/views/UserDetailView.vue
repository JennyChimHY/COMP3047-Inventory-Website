<template>
    <div class="user">

        <nav style="--bs-breadcrumb-divider: '/';" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Home</a></li>
                <li class="breadcrumb-item"><a href="/users">Users</a></li>
                <li class="breadcrumb-item active" aria-current="page">User Detail</li>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                </div>
            </ol>
        </nav>
        <!-- Form -->
        <div class="container">
            <form>
                <!-- two column in a row -->
                <div class="row mb-3">
                    <div class="col">
                        <label for="exampleFormControlInput1" class="col-sm-2 col-form-label">Email</label>
                        <input v-model="user.email" type="email" class="form-control" id="exampleFormControlInput1"
                            placeholder="email">
                    </div>
                    <div class="col">
                        <label for="exampleFormControlInput1" class="col-sm-2 col-form-label">Full Name</label>
                        <input v-model="user.fullName" type="text" class="form-control"
                            id="exampleFormControlInput1" placeholder="full name">
                    </div>
                </div>

                <!-- Three column in a row -->
                <div class="row mb-3">
                    <div class="col">
                        <label for="exampleFormControlInput1" class="col-sm-2 col-form-label">Password</label>
                        <input v-model="user.password" type="password" class="form-control"
                            id="exampleFormControlInput1" placeholder="Password">
                    </div>
                    <div class="col">
                        <label for="exampleFormControlInput1" class="col-sm-2 col-form-label">Type</label>
                        <select v-model="user.category" class="form-select" aria-label="Default select example">
                            <option selected>Open this select menu</option>
                            <option value="Admin">Admin</option>
                            <option value="Customer">Customer</option>
                        </select>
                    </div>
                    <div class="col">
                        <label for="exampleFormControlInput1" class="col-sm-2 col-form-label">Phone</label>
                        <input v-model="user.location" type="text" class="form-control"
                            id="exampleFormControlInput1" placeholder="Phone">
                        <!-- INPUT VALUE, lab06 v-booking.html-->
                    </div>
                </div>

                <!-- col-6 *2 + text align right delete -->
                <!-- use v-if******, $ == truthy value, delete button text-end -->
                <div class="row mb-3">
                    <div class="col-11">
                        <button type="button" class="btn btn-primary" v-if="$route.params.id"
                            @click="updateUser()">Save</button>
                        <button class="btn btn-primary" type="submit" v-if="!$route.params.id"
                            @click="addUser()">Add</button>
                    </div>
                    <div class="col-1">
                        <button type="button" class="btn btn-danger" v-if="$route.params.id"
                            @click="deleteUser()">Delete</button>
                    </div>
                </div>
            </form>
        </div>
        <!-- form END -->
    </div>
</template>
  
<script>
// @ is an alias to /src
// import reference for book
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue"; //define those three

// create book{} object 
// export default: vue default code
export default {
    name: 'userDetail',
    components: {

    },
    setup() {
        const route = useRoute(); //call route
        // TODO: ype definition: book, game, gift, material
        // no need to define indeed, the program will create it automatically
        const user = ref({

        })

        onMounted(async () => {

            if (route.params.id) { //if hv id then check; if no id then no alert

                var response = await fetch("/api/user/" + route.params.id);

                if (response.ok) {
                    user.value = await response.json();
                } else {
                    alert(response.statusText);
                }
            }
        })

        // option api --> composition api, for update
        // function return

        const updateUser = async function () {
            // event.preventDefault();
            delete user.value._id;

            var response = await fetch("/api/user/" + route.params.id, {
                method: "put",
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Type': 'application/json'
                },

                // body: new URLSearchParams(new FormData(event.target))
                body: JSON.stringify(this.user)
            });

            if (response.ok) {

                var text = await response.text();
                alert(text);
                location.assign("/users")
            } else {
                alert(response.statusText)
            }
        }

        const addUser = async function () {
            // hardcode the type

            var response = await fetch("/api/user/", {
                method: "post",
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Type': 'application/json'
                },

                // body: new URLSearchParams(new FormData(event.target))
                body: JSON.stringify(user.value)

            });
            if (response.ok) {

                var text = await response.text();
                alert(text);
                location.assign("/users")
            } else {
                alert(response.statusText)
            }

        }

        const deleteUser = async function () {
            var response = await fetch("/api/user/" + route.params.id, {
                method: "delete",
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Type': 'application/json'
                },

                // body: new URLSearchParams(new FormData(event.target))
                body: JSON.stringify(user.value)

            });
            if (response.ok) {

                var text = await response.text();
                alert(text);
                location.assign("/users")
            } else {
                alert(response.statusText)
            }
        }

        return {
            updateUser,
            addUser,
            deleteUser,
            user
        }

    }
}
</script>







