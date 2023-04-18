<!-- TODO BUG: cannot get id -->
<template>
    <div class="inventory">
        <nav style="--bs-breadcrumb-divider: '/';" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Home</a></li>
                <li class="breadcrumb-item"><a href="/books">Books</a></li>
                <li class="breadcrumb-item active" aria-current="page">Book Detail</li>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                </div>
            </ol>
        </nav>

        <div class="container">
            <!-- no need form, but div -->
            <form>
                <!-- two column in a row -->
                <div class="row mb-3">
                    <div class="col">
                        <label for="exampleFormControlInput1" class="col-sm-2 col-form-label">Title</label>
                        <input v-model="inventory.title" type="title" class="form-control" id="exampleFormControlInput1"
                            placeholder="title">
                    </div>
                    <div class="col">
                        <label for="exampleFormControlInput1" class="col-sm-2 col-form-label">Category</label>
                        <select v-model="inventory.category" class="form-select" aria-label="Default select example">
                            <option selected>Open this select menu</option>
                            <option value="Classics">Classics</option>
                            <option value="Comic Book">Comic Book</option>
                            <option value="Fantasy">Fantasy</option>
                        </select>
                    </div>
                </div>
                <!-- two column in a row -->
                <div class="row mb-3">
                    <div class="col">
                        <label for="exampleFormControlInput1" class="col-sm-2 col-form-label">Author</label>
                        <input v-model="inventory.author" type="title" class="form-control"
                            id="exampleFormControlInput1" placeholder="author">
                    </div>

                    <div class="col">
                        <label for="exampleFormControlInput1" class="col-sm-2 col-form-label">Publisher</label>
                        <input v-model="inventory.publisher" type="title" class="form-control"
                            id="exampleFormControlInput1" placeholder="publisher">
                    </div>
                    <!-- two column in a row -->
                    <div class="row mb-3">
                        <div class="col">
                            <label for="exampleFormControlInput1" class="col-sm-2 col-form-label">Year</label>
                            <input v-model="inventory.year" type="number" class="form-control"
                                id="exampleFormControlInput1" placeholder="year">
                        </div>

                        <div class="col">
                            <label for="exampleFormControlInput1" class="col-sm-2 col-form-label">Location</label>
                            <input v-model="inventory.location" type="title" class="form-control"
                                id="exampleFormControlInput1" placeholder="location name in warehouse">
                            <!-- INPUT VALUE, lab06 v-booking.html-->
                        </div>
                    </div>
                </div>

                <!-- ISBN TYPE -->
                <div class="row mb-3">
                    <div class="col">
                        <label for="exampleFormControlInput1" class="col-sm-2 col-form-label">ISBN</label>
                        <input v-model="inventory.isbn" type="text" class="form-control" id="exampleFormControlInput1"
                            placeholder="ISBN number">
                    </div>
                    <div class="col">
                        <label for="exampleFormControlInput1" class="col-sm-2 col-form-label">Image</label>
                        <input v-model="inventory.image" type="url" class="form-control" id="exampleFormControlInput1"
                            placeholder="Image URL">
                    </div>
                </div>
                <!-- two column in a row -->
                <div class="row mb-3">
                    <div class="col">
                        <label for="exampleFormControlTextarea1" class="col-sm-2 col-form-label">Description</label>
                        <textarea v-model="inventory.description" class="form-control" id="exampleFormControlTextarea1"
                            rows="3" placeholder="Description show on listing page"></textarea>
                    </div>
                    <div class="col">
                        <label for="exampleFormControlTextarea1" class="col-sm-2 col-form-label">Remark</label>
                        <textarea v-model="inventory.remark" class="form-control" id="exampleFormControlTextarea1"
                            rows="3" placeholder="Internal remarks"></textarea>
                    </div>
                </div>

                <!-- col-6 *2 + text align right delete -->
                <!-- use v-if******, $ == truthy value, delete button text-end -->
                <div class="row mb-3">
                    <div class="col-11">
                        <button type="button" class="btn btn-primary" v-if="$route.params.id"
                            @click="updateInventory()">Save</button>
                        <button class="btn btn-primary" type="submit" v-if="!$route.params.id"
                            @click="addInventory()">Add</button>
                    </div>
                    <div class="col-1">
                        <button type="button" class="btn btn-danger" v-if="$route.params.id"
                            @click="deleteInventory()">Delete</button>
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
    name: 'bookDetail',
    components: {

    },
    setup() {
        const route = useRoute(); //call route
        // TODO: ype definition: book, game, gift, material
        // no need to define indeed, the program will create it automatically
        const inventory = ref({
            title: '',
            category: '',
            author: '',
            publisher: '',
            year: '',
            location: '',
            isbn: '',
            image: '',
            description: '',
            remark: ''
        })


        onMounted(async () => {

            if (route.params.id) { //if hv id then check; if no id then no alert

                var response = await fetch("/api/inventory/" + route.params.id);

                if (response.ok) {
                    inventory.value = await response.json();
                } else {
                    alert(response.statusText);
                }
            }
        })

        // option api --> composition api, for update
        // function return

        const updateInventory = async function () {
            // event.preventDefault();
            delete inventory.value._id;

            var response = await fetch("/api/inventory/" + route.params.id, {
                method: "put",
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Type': 'application/json'
                },

                // body: new URLSearchParams(new FormData(event.target))
                body: JSON.stringify(this.inventory)
            });

            if (response.ok) {

                var text = await response.text();
                alert(text);
                location.assign("/books")
            } else {
                alert(response.statusText)
            }
        }

        const addInventory = async function () {
            // hardcode the type
            inventory.value.type = "book";

            var response = await fetch("/api/inventory/", {
                method: "post",
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Type': 'application/json'
                },

                // body: new URLSearchParams(new FormData(event.target))
                body: JSON.stringify(inventory.value)

            });
            if (response.ok) {

                var text = await response.text();
                alert(text);
                location.assign("/books")
            } else {
                alert(response.statusText)
            }

        }

        const deleteInventory = async function () {
            var response = await fetch("/api/inventory/" + route.params.id, {
                method: "delete",
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Type': 'application/json'
                },

                // body: new URLSearchParams(new FormData(event.target))
                body: JSON.stringify(inventory.value)

            });
            if (response.ok) {

                var text = await response.text();
                alert(text);
                location.assign("/books")
            } else {
                alert(response.statusText)
            }
        }

        return {
            updateInventory,
            addInventory,
            deleteInventory,
            inventory
        }

    }
}
</script>







