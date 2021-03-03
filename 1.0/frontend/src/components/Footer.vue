<template>
    <footer class="bg-light text-center">
        <p class="col-sm-12"> {{Footer}} </p>
    </footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Footer',

    computed:{
        ...mapGetters([
            'Footer'
        ])
    }
}
</script>