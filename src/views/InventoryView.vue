<template>
    <div class="inventory">
        <!-- Using grid markup, same row with chart -->
        <!-- TOODOO: change the interface -->
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

        <!-- cards are on the same row -->
        <div class="container text-center">
            <div class="row">
                <div class="col card" style="width: 18rem;">
                    <RouterLink to="/books">
                        <img src="../assets/books.jpeg" class="card-img-top">
                    </RouterLink>
                    <div class="card-body">
                        <h5 class="card-text">Books</h5>
                    </div>
                </div>
                <div class="col card" style="width: 18rem;">
                    <RouterLink to="/games">
                        <img src="../assets/Games.jpg" class="card-img-top">
                    </RouterLink>
                    <div class="card-body">
                        <h5 class="card-text">Games</h5>
                    </div>
                </div>
                <div class="col card" style="width: 18rem;">
                    <RouterLink to="/gifts">
                        <img src="../assets/Gift.jpg" class="card-img-top">
                    </RouterLink>
                    <div class="card-body">
                        <h5 class="card-text">Gifts</h5>
                    </div>
                </div>
                <div class="col card" style="width: 18rem;">
                    <RouterLink to="/materials">
                        <img src="../assets/Materials.jpg" class="card-img-top">
                    </RouterLink>
                    <div class="card-body">
                        <h5 class="card-text">Materials</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
// @ is an alias to /src
import ChartView from '@/components/ChartView.vue'

export default {
    name: 'InventoryView',
    components: {
        ChartView
    }
}
</script>







