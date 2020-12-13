<script>
import navBar from '../header/navBar'
import { mapGetters } from 'vuex'
export default {
  components: { navBar },
  data() {
    return {
      rating: 3,
    }
  },
  computed: {
    ...mapGetters({ company: 'company/company' }),
  },
  created() {},
}
</script>
<template>
  <v-img
    src="/img/bg-header.jpg"
    aspect-ratio="4"
    gradient="to top, rgba(220, 221, 225,1.0), rgba(64, 115, 158, .7)"
  >
    <nav-bar />
    <v-container>
      <v-row class="justify-center">
        <v-col v-if="company" cols="12" md="12">
          <v-card class="my-15 rounded-xl" flat>
            <v-card-text>
              <v-row>
                <v-spacer />
                <!-- <share-company
                  :company="company"
                  :them="{ color: '#d1d8e0', small: true, x_small: false }"
                /> -->
                <v-btn
                  fab
                  color="#d1d8e0"
                  elevation="0"
                  small
                  class="mx-1"
                  @click="$store.dispatch('company/favorite', company)"
                  ><v-icon color="#ff3838">{{
                    company.is_Favorite ? 'mdi-heart' : 'mdi-heart-outline'
                  }}</v-icon></v-btn
                >
              </v-row>
              <v-row>
                <v-col cols="12" md="4">
                  <v-card flat>
                    <v-card-text>
                      <v-row class="justify-center">
                        <v-avatar color="#182C61" size="100">
                          <v-img :src="company.profile.avatar"></v-img>
                        </v-avatar>
                      </v-row>
                      <v-row class="justify-center">
                        <p class="font-weight-bold my-2">
                          {{ company.profile.full_name }}
                        </p>
                      </v-row>
                      <v-row class="justify-center">
                        <p>
                          <v-btn color="primary" rounded elevation="0">
                            <v-icon>mdi-message-text-outline</v-icon>
                            inquery
                          </v-btn>
                          <v-btn color="primary" outlined elevation="0" rounded>
                            <nuxt-link
                              :to="{
                                name: 'community',
                                params: { isNew: true, user_id: company.id },
                              }"
                            >
                              <v-icon>mdi-chat-outline</v-icon>
                              message
                            </nuxt-link>
                          </v-btn>
                        </p>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>

                <v-col cols="12" md="5">
                  <v-card flat>
                    <v-card-text>
                      <p class="primary--text font-weight-bold">
                        about company
                      </p>
                      <p
                        v-text="
                          company.profile.about == null
                            ? 'Information about the company will appear here after adding it'
                            : company.profile.about
                        "
                      ></p>
                      <p class="primary--text font-weight-bold">activities</p>
                      <v-chip
                        v-for="activity in company.user_Activities"
                        :key="activity.id"
                        class="ma-2"
                        v-text="activity.sub_activity.name"
                      ></v-chip>
                      <v-chip class="ma-2"> consultant </v-chip>
                    </v-card-text>
                  </v-card>
                </v-col>

                <v-col cols="12" md="3">
                  <v-card flat>
                    <v-card-text>
                      <p class="primary--text font-weight-bold">
                        Contact Information
                      </p>
                      <p>
                        <v-icon>mdi-phone-outline</v-icon>
                        <span v-text="company.profile.phone"></span>
                      </p>
                      <p>
                        <v-icon>mdi-cellphone-iphone</v-icon>
                        <span v-text="company.profile.phone"></span>
                      </p>
                      <p>
                        <v-icon>mdi-email-outline</v-icon>
                        <span v-text="company.email"></span>
                      </p>
                      <p>
                        <v-icon>mdi-web</v-icon>
                        <span v-text="company.profile.web_site"></span>
                      </p>
                      <p class="primary--text font-weight-bold">Rating</p>
                      <v-rating
                        v-model="company.rate"
                        half-increments
                        background-color="orange lighten-3"
                        color="orange"
                        dense
                      ></v-rating>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col v-else cols="12" md="12">
          <v-skeleton-loader type="image" />
        </v-col>
      </v-row>
    </v-container>
  </v-img>
</template>
