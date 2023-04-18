<template>
    <div class="inventory">
        <div class="row">
            <div class="col-11">
                <nav style="--bs-breadcrumb-divider: '/';" aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Users</li>
                    </ol>
                </nav>
            </div>
            <div class="col-1">
                <!-- use router-link instead of a : not sending web request but locally change the page -->
                <router-link to="/user/detail" class="btn btn-primary me-md-2" role="button">Add</router-link>
                <!-- style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;" -->
            </div>
        </div>
    </div>
    <UserPaginated type="user" />
    <!-- element changed to be Image caps -->
</template>
  
<script>
// @ is an alias to /src
import UserPaginated from '@/components/UserPaginated.vue'

export default {
    name: 'UsersView',
    components: {
        UserPaginated
    }
}
</script>







