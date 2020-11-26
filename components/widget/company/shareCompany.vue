<script>
export default {
  props: {
    data: { type: Object, required: true },
    them: { type: Object, required: true },
  },
  data() {
    return {
      networks: [
        {
          network: 'facebook',
          color: '#4267B2',
          bg: 'blue lighten-3',
        },
        {
          network: 'whatsapp',
          color: 'teal',
          bg: 'teal lighten-4',
        },
        {
          network: 'twitter',
          color: '#1DA1F2',
          bg: 'blue lighten-4',
        },
      ],
    }
  },
}
</script>
<template>
  <v-menu top left rounded="xl">
    <template #activator="{ on, attrs }">
      <v-btn
        fab
        :color="them.color"
        elevation="0"
        :small="them.small"
        :x-small="them.x_small"
        class="mx-2"
        v-bind="attrs"
        v-on="on"
        ><v-icon color="primary">mdi-share-variant</v-icon>
      </v-btn>
    </template>
    <v-sheet class="justify-center pa-1" rounded="xl" color="grey lighten-3">
      <ShareNetwork
        v-for="network in networks"
        :key="network.network"
        :network="network.network"
        url="https://sarh.ae"
        :title="data.title"
        :description="data.description"
        quote="FIND BEST COMPANY AND PROFESSIONALS CONSULTING ON SARH"
        hashtags="sarh, EVERYTHING YOU NEED"
      >
        <v-btn fab x-small :color="network.bg" elevation="0" class="mx-1">
          <v-icon :color="network.color">{{ 'mdi-' + network.network }}</v-icon>
        </v-btn>
      </ShareNetwork>
    </v-sheet>
  </v-menu>
</template>
