export default {
    install(Vue) {
        Vue.config.globalProperties.$pushContents = function(layerName) {
            this.$store.state.mainLayer.push(layerName);
        },
        Vue.config.globalProperties.$backPage = function() {
            this.$store.state.mainLayer.pop();
        },
        Vue.config.globalProperties.$clearLayer = function() {
            this.$store.state.mainLayer = ['Login'];
        }
    }
}