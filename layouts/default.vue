<template>
  <v-app>
    <v-app-bar
      app
      color="#6A76AB"
      dark
      prominent
      src="/img/sarh.cover.jpg"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-3"
      height="100"
      extension-height="400"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(212, 230, 241,.5), rgba(127, 179, 213,.5)"
        ></v-img>
      </template>
      <img src="/logo/logo.png" />
      <v-row>
        <v-btn text dark @click="$router.push({ name: 'community' })">
          <v-icon color="primary" class="mx-1">mdi-chat-outline</v-icon>
          community
        </v-btn>

        <v-btn text dark>
          <v-icon color="primary" class="mx-1">mdi-message-text-outline</v-icon>
          quotations
        </v-btn>
      </v-row>
      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ on, attrs }">
          <v-btn value="justify" v-bind="attrs" text dark v-on="on">
            <v-icon color="primary" class="mx-1">mdi-web</v-icon>
            language
            <v-icon color="primary" class="mx-1">mdi-arrow-down</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item-group color="primary">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-abjad-arabic</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>عربي</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-alpha-e</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>english</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>

      <v-btn value="ty" text dark @click="login = true">
        <v-icon color="primary" class="mx-1">mdi-login</v-icon>
        login
      </v-btn>
      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            value="justify"
            v-bind="attrs"
            :loading="logOutLoading"
            :disabled="logOutLoading"
            text
            dark
            v-on="on"
          >
            <v-icon color="primary" class="mx-1"
              >mdi-account-circle-outline</v-icon
            >
            user name
            <v-icon color="primary" class="mx-1">mdi-arrow-down</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item-group color="primary">
            <v-list-item
              route
              :to="true ? '/company/profile' : '/user/profile'"
            >
              <v-list-item-icon>
                <v-icon>mdi-account-cog-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ profileTitle }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="logOut">
              <v-list-item-icon>
                <v-icon>mdi-logout-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>

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
          <v-row class="mx-auto">
            <v-col cols="12" md="8" offset-md="2">
              <v-icon color="primary">mdi-format-quote-open</v-icon>
              <h1 class="primary--text text-uppercase font-weight-bold">
                everything you need
              </h1>
              <h3 class="primary--text text-uppercase font-weight-bold">
                find best company and professionals consulting on sarh
              </h3>
              <p class="text-center">
                <v-btn
                  color="primary"
                  elevation="0"
                  rounded
                  @click="userType(1)"
                >
                  <v-icon class="mx-1">mdi-account-plus-outline</v-icon>
                  just register now</v-btn
                >
              </p>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" md="5" offset-md="3">
              <v-text-field
                autofocus
                color="primary"
                rounded
                outlined
                placeholder="search"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="1">
              <v-btn dark rounded color="primary" large>
                <v-icon>mdi-magnify</v-icon>
                search
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-app-bar>
  </v-app>
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
