<template>
    <div>
        <component 
            :is="getMainLayer"
            :pageParams="getMainPageInfo"
            :transferObj="getTransferObj"
        >
        </component>
        <NoteFrame v-if="isShowNote"></NoteFrame>
    </div>
</template>

<script>
export default {
    computed: {
        isShowNote() {
            return this.$store.state.showNote;
        },
        getMainLayer() {
            return this.$store.state.mainLayer[this.$store.state.mainLayer.length-1].pageName;
        },
        getMainPageInfo() {
            return this.$store.state.mainLayer[this.$store.state.mainLayer.length-1].pageInfo
        },
        getTransferObj() {
            return this.$store.state.mainLayer[this.$store.state.mainLayer.length-1].transferObj
        },
    },
    mounted(){
        console.log(this.$store.state.mainLayer[this.$store.state.mainLayer.length-1]);
    },
    methods: {
    }

}
</script>

<style>

</style>