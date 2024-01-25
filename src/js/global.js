export default {
  install(Vue) {
    Vue.config.globalProperties.$pushContents = function(layerName, payload = {}) {
      let changed = {
        pageName: layerName,
        pageInfo: payload,
        transferObj: {}
      }
      this.$store.state.mainLayer.push(changed);
    },
    Vue.config.globalProperties.$backPage = function(payload = {}) {
      this.$store.state.mainLayer.pop();
      this.$store.state.mainLayer[this.$store.state.mainLayer.length - 1].transferObj = payload;
      // this.$emit('transferObj', payload);
      this.$propsWatch();
    },
    Vue.config.globalProperties.$clearLayer = function(payload= {}) {
      // this.$store.state.mainLayer = ['Login'];
      this.$store.state.mainLayer = [
        {
          pageName: 'Board',
          pageInfo: {temp: '1234'},
          transferObj: payload,
        }
      ];
    }
    Vue.config.globalProperties.$getTransferObj = function() {
      return this.$store.state.mainLayer[this.$store.state.mainLayer.length - 1].transferObj;
    },
    Vue.config.globalProperties.$propsWatch = function() {
      if (!this.$store.state.mainLayer[this.$store.state.mainLayer.length - 1].transferObj) return;
      let obj = this.$store.state.mainLayer[this.$store.state.mainLayer.length - 1].transferObj;
      let keys = Object.keys(obj);

      let changedTransferObj = {};
      let watchList = [];

      keys.forEach(key => {
        const watcher = this.$watch(key, (newVal, oldVal) => {
          console.log(newVal);
          console.log(oldVal)
          changedTransferObj[key] = newVal;
        });
        watchList.push(watcher);
      });
            
      watchList.forEach(watcher => watcher());
      setTimeout(this.propsChanged, 100);
    }
  }
}