<template>
  <v-app-bar
    app
    color="#6A76AB"
    dark
    prominent
    src="/img/sarh.cover.jpg"
    fade-img-on-scroll
    scroll-target="#scrolling-techniques-3"
    height="200"
    extension-height="200"
  >
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
      >
      </v-img>
    </template>
    <img src="logo/logo.png" />
    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>

    <template v-slot:extension>
      <v-container>
        <v-row>
          <v-col md="10">
            <v-text-field
              rounded
              outlined
              placeholder="search"
              dense
            ></v-text-field>
          </v-col>
          <v-col md="2">
            <v-btn dark rounded color="primary" large>
              <v-icon>mdi-magnify</v-icon> search
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>
