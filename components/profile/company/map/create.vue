<script>
export default {
  data() {
    return {
      marker: null,
      latLng: null,
      loc: null,
    }
  },
  mounted() {
    // init map
    const map = new this.$google.maps.Map(document.getElementById('map'), {
      center: { lat: 24.46667, lng: 54.36667 },
      zoom: 8,
    })

    // pick location by marker
    map.addListener('click', (e) => {
      this.latLng = e.latLng.toJSON()
      this.addMarker(e.latLng, map)
    })

    // search location

    const autocomplete = new this.$google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      { componentRestrictions: { country: 'ae' } }
    )

    const infowindow = new this.$google.maps.InfoWindow()
    const infowindowContent = document.getElementById('infowindow-content')
    infowindow.setContent(infowindowContent)

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      this.loc = place.geometry.location
      this.latLng = place.geometry.location.toJSON()
      map.setCenter(place.geometry.location)
      map.setZoom(17)
      const marker = new this.$google.maps.Marker({
        position: place.geometry.location,
        map: map,
        draggable: true,
      })

      let address = ''
      if (place.address_components) {
        address = [
          (place.address_components[0] &&
            place.address_components[0].short_name) ||
            '',
          (place.address_components[1] &&
            place.address_components[1].short_name) ||
            '',
          (place.address_components[2] &&
            place.address_components[2].short_name) ||
            '',
        ].join(' ')
      }

      infowindowContent.children['place-icon'].src = place.icon
      infowindowContent.children['place-name'].textContent = place.name
      infowindowContent.children['place-address'].textContent = address
      infowindow.open(map, marker)
    })

    map.addListener('zoom_changed', () => map.panTo(this.loc))
  },
  methods: {
    // add marker
    addMarker(latLng, map) {
      this.latLng = latLng.toJSON()
      if (this.marker) {
        this.marker.setPosition(latLng)
        map.panTo(latLng)
      } else {
        this.marker = new this.$google.maps.Marker({
          position: latLng,
          map,
        })
        map.panTo(latLng)
      }
    },

    async saveLocation() {
      if (this.latLng) {
        const location = await JSON.stringify(this.latLng)
        await this.$store.dispatch('user/updateProfile', { location })
        return true
      } else {
        this.$toast.error('Select a location')
        return false
      }
    },
  },
}
</script>
<template>
  <div>
    <v-text-field
      id="autocomplete"
      :label="$t('company.enteryouraddress')"
      :placeholder="$t('company.enteryouraddress')"
      type="text"
      prepend-icon="mdi-map-marker-outline"
    />
    <div id="map" />
    <div id="infowindow-content">
      <img id="place-icon" src="" width="16" height="16" />
      <span id="place-name" class="title" /><br />
      <span id="place-address" />
    </div>
  </div>
</template>
<style scoped>
#map {
  height: 300px;
  width: 100%;
}
#infowindow-content .title {
  font-weight: bold;
}

#infowindow-content {
  display: none;
}

#map #infowindow-content {
  display: inline;
}
</style>
