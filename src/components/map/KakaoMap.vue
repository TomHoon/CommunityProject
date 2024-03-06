<template>
  <div class="map-container">
    <div id="map" style="width:100%;height:100vh;"></div>
    <div class="place-list">
      <div class="place-item" v-for="(place, index) in places" :key="index" :ref="`place-${index}`"
           :class="{ 'selected': place === selectedPlace }">
        <h4 class="place-name">{{ place.place_name }}</h4>
        <p class="place-address">{{ place.road_address_name }}</p>
        <p class="place-address">{{ place.phone }}</p>
      </div>
    </div>
  </div>
</template>
<script>


export default {
  data() {
    return {
      map: null,
      marker: null,
      places: [],
      latitude: 0,
      longitude: 0,
      selectedPlace: null,
      markers: [],
      infowindow: null,

    };
  },

  mounted() {
    if (!window.kakao || !window.kakao.maps) {
      setTimeout(this.initMap, 500); // 500ms 후에 다시 시도
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.initMap(lat, lng);
        this.searchPlaces(lat, lng);

        kakao.maps.load(() => {
          const geocoder = new kakao.maps.services.Geocoder();

          const latlng = new kakao.maps.LatLng(lat, lng);

          geocoder.coord2Address(latlng.getLng(), latlng.getLat(), (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              console.log('주소:', result[0].address.address_name);

            } else {
              console.error('주소를 가져오지 못했습니다.', status);
            }
          });
        });


      }, () => {
        console.log('Failed to get user location.');
      });
    }
  },

  methods: {
    initMap(lat, lng) {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 3
      };

      this.map = new window.kakao.maps.Map(container, options);


      console.log('this.map: ', this.map);
      console.log('options.center: ', options.center);

    },

// 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
 displayCenterInfo(result, status) {
  if (status === kakao.maps.services.Status.OK) {
    var infoDiv = document.getElementById('centerAddr');

    for(var i = 0; i < result.length; i++) {
      // 행정동의 region_type 값은 'H' 이므로
      if (result[i].region_type === 'H') {
        infoDiv.innerHTML = result[i].address_name;
        break;
      }
    }
  }
},
    displayMarker(place, index) {
      const locPosition = new window.kakao.maps.LatLng(place.y, place.x);

      const marker = new window.kakao.maps.Marker({
        map: this.map,
        position: locPosition
      });
      window.kakao.maps.event.addListener(marker, 'click', () => {
        this.selectedPlace = place;
        this.$refs[`place-${index}`][0].scrollIntoView({behavior: 'smooth'});  // 스크롤 조정
        if (this.infowindow) {  // 이전에 열린 인포윈도우가 있다면 닫기
          this.infowindow.close();
          this.infowindow.setMap(null);
        }
        setTimeout(() => {
          // 장소 이름, 도로명 주소, 전화번호를 표시하는 HTML 문자열
          const content = `
        <div style="margin:-10px; padding:10px; background:white; border:1px solid #ccc; border-radius:5px; box-shadow:0 0 10px rgba(0, 0, 0, 0.1);">
        <h4 style="margin:0; padding:0; font-size:16px; color:#2BAE66; font-weight:bold; margin-bottom:5px;">${place.place_name}</h4>
        <p style="margin:0; padding:0; font-size:14px; color:#666;">${place.road_address_name}</p>
        <p style="margin:0; padding:0; font-size:14px; color:#666;">${place.phone}</p>
      </div>
    `;

          this.infowindow = new window.kakao.maps.CustomOverlay({
            position: locPosition,
            content: content,
            zIndex: 1
          });
          // 인포윈도우 생성 및 설정
          this.infowindow = new window.kakao.maps.InfoWindow({
            position: locPosition,
            content: content
          });
          // 인포윈도우 열기
          this.infowindow.open(this.map, marker);
        }, 200);
        // 지도 이동
        this.map.panTo(locPosition);

      });
      // 지도를 클릭했을 때 인포윈도우 닫기
      window.kakao.maps.event.addListener(this.map, 'click', () => {
        if (this.infowindow) {
          this.infowindow.setMap(null);
        }
      });
      this.markers.push(marker);
    },
    searchPlaces(lat, lng) {
      const ps = new window.kakao.maps.services.Places();

      ps.keywordSearch('맛집', (data, status, pagination) => {
        if (status === window.kakao.maps.services.Status.OK) {
          this.places = data;
          for (let i = 0; i < data.length; i++) {
            this.displayMarker(data[i], i);
          }
        } else {
          console.log('Failed to load places.');
        }
      }, {
        location: new window.kakao.maps.LatLng(lat, lng)
      });
    },

  }, // methods

};
</script>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 350px;
}

.place-list {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 230px;
  max-height: 450px;
  overflow-y: auto;
  padding: 0;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
  opacity: 0.9;

}

.place-item {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.place-item:last-child {
  border-bottom: none;
}

.place-name {
  margin: 0;
  font-size: 14px;
  font-weight: bold;
}

.place-address {
  margin: 5px 0 0;
  font-size: 12px;
  color: #888;
}

.selected {
  color: #2BAE66;
}
</style>