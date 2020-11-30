<script>
import { mapGetters } from 'vuex'
// import saveCountry from './country/add'
export default {
  // components: { saveCountry },
  data() {
    return {
      disabled: true,
      loading: false,
    }
  },
  computed: {
    ...mapGetters({
      profile: 'user/user',
    }),
    profileData() {
      return {
        address_1: this.profile.address_1,
        address_2: this.profile.address_2,
        country_id: this.profile.country_id,
        state: this.$refs.regin.state,
        city_id: this.$refs.regin.city,
      }
    },
  },

  created() {
    this.$store.dispatch('country/getCountries')
    this.$store.dispatch('country/getStates')
    // this.$getLocation({}).then((coordinates) => {
    //   console.log(coordinates)
    // })
  },
  methods: {
    async updateMyProfile() {
      this.loading = true
      await this.$store.dispatch('user/updateProfile', this.profileData)
      this.loading = false
      this.changeDisable()
    },
    changeDisable() {
      this.disabled = !this.disabled
      this.$refs.regin.changeDisable()
    },
  },
}
</script>

<template>
  <v-card v-if="profile" flat rounded :loading="loading">
    <v-card-title>
      <v-btn text color="primary" readonly>
        <v-icon>mdi-map-marker-multiple</v-icon>
        <span> Address</span>
      </v-btn>
      <v-spacer />
      <v-btn
        v-if="disabled"
        text
        color="primary"
        @click.prevent="changeDisable"
      >
        <v-icon>mdi-pencil-outline</v-icon>
        <span>edit</span>
      </v-btn>

      <v-btn
        v-if="!disabled"
        text
        color="primary"
        :disabled="loading"
        :loading="loading"
        @click="updateMyProfile"
      >
        <v-icon>mdi-content-save-all-outline</v-icon>
        <span>save changes </span>
      </v-btn>
      <v-btn
        v-if="!disabled"
        text
        color="primary"
        :disabled="loading"
        @click.prevent="changeDisable"
      >
        <v-icon>mdi-cancel</v-icon>
        <span>cancel </span>
      </v-btn>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="profile.address_1"
              label="Address 1"
              :disabled="disabled"
              prepend-icon="mdi-map-marker-outline"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="profile.address_2"
              label="Address 2"
              :disabled="disabled"
              prepend-icon="mdi-map-marker-plus"
            />
          </v-col>
          <!--          <save-country ref="regin" />-->
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
  <!--  <div v-if="profile" class="panel">-->
  <!--    <h6 class="title">-->
  <!--      Address-->
  <!--    </h6>-->
  <!--    <div action="" class="row">-->
  <!--      <div class="form-group col-md-6">-->
  <!--        <label>Address 1</label>-->
  <!--        <input-->
  <!--          v-model="profile.address_1"-->
  <!--          :disabled="disabled"-->
  <!--          type="text"-->
  <!--          class="form-control"-->
  <!--        />-->
  <!--      </div>-->
  <!--      <div class="form-group col-md-6">-->
  <!--        <label>Address 2</label>-->
  <!--        <input-->
  <!--          v-model="profile.address_2"-->
  <!--          :disabled="disabled"-->
  <!--          type="text"-->
  <!--          class="form-control"-->
  <!--        />-->
  <!--      </div>-->
  <!--    </div>-->

  <!--    <showCountry v-if="disabled" />-->

  <!--    <saveCountry v-else />-->

  <!--    <div class="row">-->
  <!--      <div class="col-sm-12">-->
  <!--        <button-->
  <!--          v-if="!disabled"-->
  <!--          class="btn btn-primary"-->
  <!--          :disabled="loading"-->
  <!--          type="button"-->
  <!--          @click="updateMyProfile"-->
  <!--        >-->
  <!--          <i v-if="loading" class="fa fa-spinner fa-spin" />-->
  <!--          Save Changes-->
  <!--        </button>-->

  <!--        <button-->
  <!--          v-if="disabled"-->
  <!--          class="btn btn-primary"-->
  <!--          type="button"-->
  <!--          @click="disabled = !disabled"-->
  <!--        >-->
  <!--          Edit Data-->
  <!--        </button>-->

  <!--        <button-->
  <!--          v-if="!disabled"-->
  <!--          type="button"-->
  <!--          class="btn btn-light"-->
  <!--          @click="disabled = !disabled"-->
  <!--        >-->
  <!--          cancel-->
  <!--        </button>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
</template>
