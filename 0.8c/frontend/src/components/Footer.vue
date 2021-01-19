<template>
    <footer class="bg-light text-center">
        <p class="col-sm-12"> {{footer}} </p>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
    data(){
        return {
            footer:this.$store.state.footer
        }
    }
}
</script>