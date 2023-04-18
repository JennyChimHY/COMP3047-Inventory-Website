<template>
   <div class="inventory">
        <div class="row">
            <div class="col-11">
                <nav style="--bs-breadcrumb-divider: '/';" aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Gifts</li>
                    </ol>
                </nav>
            </div>
            <div class="col-1">
                <!-- use router-link instead of a : not sending web request but locally change the page -->
                <router-link to="/gift/detail"
                    class="btn btn-primary me-md-2" role="button">Add</router-link>
                    <!-- style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;" -->
            </div>
        </div>
    </div>
    <PaginatedBookings type="gift"/>
    <!-- element changed to be Image caps -->
</template>
  
<script>
// @ is an alias to /src
import PaginatedBookings from '@/components/PaginatedBookings.vue'

export default {
    name: 'GiftView',
    components: {
        PaginatedBookings
    }
}
</script>







