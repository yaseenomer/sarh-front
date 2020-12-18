<script>
export default {
  props: {
    location: { type: String, required: true },
  },
  data() {
    return {
      marker: null,
      latLng: null,
    }
  },
  mounted() {
    const map = new this.$google.maps.Map(document.getElementById('map'), {
      center: JSON.parse(this.location),
      zoom: 8,
    })

    const marker = new this.$google.maps.Marker({
      position: JSON.parse(this.location),
      map,
    })

    const infoWindow = new this.$google.maps.InfoWindow({
      content: `

                   <p class="mx-5 text-primary">${this.$auth.user.profile.full_name}</p>
                   <hr />
                   <p class="mx-5">${this.$auth.user.profile.email}</p>
                   <p class="mx-5">${this.$auth.user.profile.web_site}</p>
                   <p class="mx-5">${this.$auth.user.profile.phone}</p>

`,
    })

    marker.addListener('click', () => {
      infoWindow.open(map, marker)
    })

    map.addListener('zoom_changed', () => map.panTo(JSON.parse(this.location)))
  },
}
</script>
<template>
  <div>
    <div id="map" />
  </div>
</template>
<style scoped>
#map {
  height: 250px;
  width: 100%;
}
</style>
