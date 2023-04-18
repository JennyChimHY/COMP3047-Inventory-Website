<template>
    <div class="inventory">

        <nav style="--bs-breadcrumb-divider: '/';" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">Search</li>
            </ol>
        </nav>
    </div>
    <PaginatedBookings type= "search_type"/>
    <!-- element changed to be Image caps -->
</template>
  
<script>
// @ is an alias to /src
import { ref } from "vue";
import PaginatedBookings from '@/components/PaginatedBookings.vue'

export default {
    name: 'SearchView',
    components: {
        PaginatedBookings
    },
    setup() {
        const inventory = ref([]);
        const lastPage = ref(0);
        const perPage = ref(6);
        const current = ref(1);
        const search_type = ref({});
        
        return {
            inventory,
            lastPage,
            perPage,
            current,
            search_type
        }
    }
}
</script>









