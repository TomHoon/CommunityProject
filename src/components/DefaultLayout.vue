<template>
    <div>
        <component :is="getMainLayer">

        </component>
    </div>
</template>

<script>
export default {
    computed: {
        getMainLayer() {
            return this.$store.state.mainLayer[this.$store.state.mainLayer.length-1];
        }
    },
    mounted(){
        console.log(this.$store.state.mainLayer[this.$store.state.mainLayer.length-1]);
    }

}
</script>

<style>

</style>