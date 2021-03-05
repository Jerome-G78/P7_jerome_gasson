<template>
    <footer class="bg-light text-center">
        <p class="col-sm-12">&copy; {{Footer}} </p>
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

<style scoped>
    /* Ajustement du Design Mobile 320px à 574px */
    @media screen and (min-width:360px) and (max-width:574px) and (orientation: portrait)       /* 20em - Mobiles           */
    {
        p
        {
            font-size : 0.926em;
        }
    }
    @media screen and (min-width:320px) and (max-width:359px) and (orientation: portrait)       /* 20em - Mobiles           */
    {
        p
        {
            font-size : 0.803em;
        }
    }
</style>