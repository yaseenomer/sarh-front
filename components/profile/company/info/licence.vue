<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      file: null,
      disabled: true,
      loading: false,
      menu: false,
      menu2: false,
    }
  },
  computed: {
    ...mapGetters({
      profile: 'user/user',
    }),
  },
  methods: {
    ...mapActions({
      updateProfile: 'user/updateProfile',
    }),
    async updateLicence() {
      this.loading = true
      const data = {
        licence_number: this.profile.licence_number,
        creation_date: this.profile.creation_date, // moment(this.creation_date).format('YYYY-MM-DD'),
        expiration_date: this.profile.expiration_date, //  moment(this.expiration_date).format('YYYY-MM-DD')
      }
      if (this.file) {
        await this.$store.dispatch('account/uploadLicence', this.file)
      }
      await this.updateProfile(data)
      this.loading = false
      this.disabled = true
    },
  },
}
</script>

<template>
  <v-card v-if="profile" flat rounded :loading="loading">
    <v-card-title>
      <v-btn text color="primary" readonly>
        <v-icon>mdi-license</v-icon>
        <span> Licence Company</span>
      </v-btn>
      <v-spacer />
      <v-btn
        v-if="disabled"
        text
        color="primary"
        @click.prevent="disabled = !disabled"
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
        @click="updateLicence"
      >
        <v-icon>mdi-content-save-all-outline</v-icon>
        <span>save changes </span>
      </v-btn>
      <v-btn
        v-if="!disabled"
        text
        color="primary"
        :disabled="loading"
        @click.prevent="disabled = !disabled"
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
              v-model="profile.licence_number"
              :disabled="disabled"
              label="Licence Number"
              prepend-icon="mdi-license"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="profile.creation_date"
                  :disabled="disabled"
                  label="Creation Date"
                  prepend-icon="mdi-calendar-heart"
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="profile.creation_date"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" md="6">
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="profile.expiration_date"
                  :disabled="disabled"
                  label="Expiration Date"
                  prepend-icon="mdi-calendar-remove-outline"
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="profile.expiration_date"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" md="6">
            <v-file-input
              v-if="!disabled"
              v-model="file"
              small-chips
              label="Upload Licence"
            />
            <v-btn
              v-else
              text
              class="mt-5"
              :href="profile.licence_file"
              target="_blank"
            >
              <v-icon class="mx-2">mdi-cloud-download-outline</v-icon>
              <span>licence file</span>
            </v-btn>
          </v-col>

          <!--          <v-col cols="12" md="6">-->
          <!--            <a :href="profile.licence_file" target="_blank">Read more</a>-->
          <!--          </v-col>-->
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
  <!--  <div v-if="profile" class="panel">-->
  <!--    <h6 class="title">-->
  <!--      Licence Company-->
  <!--    </h6>-->
  <!--    <form action="" class="row licence">-->
  <!--      <div class="form-group col-md-6">-->
  <!--        <label for="">Licence Number</label>-->
  <!--        <input-->
  <!--          v-model="profile.licence_number"-->
  <!--          type="text"-->
  <!--          :disabled="disabled"-->
  <!--          class="form-control"-->
  <!--        />-->
  <!--      </div>-->
  <!--      <div class="form-group col-md-6">-->
  <!--        <label for="">Creation Date</label>-->

  <!--        <input-->
  <!--          v-if="disabled"-->
  <!--          v-model="profile.creation_date"-->
  <!--          type="text"-->
  <!--          :disabled="disabled"-->
  <!--          class="form-control"-->
  <!--        />-->
  <!--        <DatePicker-->
  <!--          v-else-->
  <!--          v-model="creation_date"-->
  <!--          :popover="{ placement: 'bottom', visibility: 'click' }"-->
  <!--          :masks="{ L: 'YYYY-MM-DD' }"-->
  <!--        />-->
  <!--      </div>-->
  <!--      <div class="form-group col-md-6">-->
  <!--        <label for="">Expiration Date</label>-->
  <!--        <input-->
  <!--          v-if="disabled"-->
  <!--          v-model="profile.expiration_date"-->
  <!--          type="text"-->
  <!--          :disabled="disabled"-->
  <!--          class="form-control "-->
  <!--        />-->

  <!--        <DatePicker-->
  <!--          v-else-->
  <!--          v-model="expiration_date"-->
  <!--          :popover="{ placement: 'bottom', visibility: 'click' }"-->
  <!--          :masks="{ L: 'YYYY-MM-DD' }"-->
  <!--        />-->
  <!--      </div>-->

  <!--      <div v-if="disabled" class="col-md-6">-->
  <!--        <br />-->
  <!--        <span>licence file</span>-->
  <!--        <a v-b-modal.show-licence-file href="javascript:;">-->
  <!--          <b-img-->
  <!--            v-bind="{ width: 200, height: 50 }"-->
  <!--            :src="profile.licence_file"-->
  <!--            right-->
  <!--            rounded-->
  <!--            alt="Rounded image"-->
  <!--          />-->
  <!--        </a>-->
  <!--      </div>-->

  <!--      <div v-if="!disabled" class="form-group col-md-6">-->
  <!--        <label for="">Upload Licence</label>-->
  <!--        <b-form-group>-->
  <!--          <b-form-file-->
  <!--            v-model="file"-->
  <!--            placeholder="Upload Licence"-->
  <!--            drop-placeholder="Drop file here..."-->
  <!--          />-->
  <!--        </b-form-group>-->
  <!--      </div>-->
  <!--      <div class="col-sm-12">-->
  <!--        <button v-if="!disabled" :disabled="loading" @click.prevent="update">-->
  <!--          <i v-if="loading" class="fa fa-spinner fa-spin" />-->
  <!--          Save Changes-->
  <!--        </button>-->
  <!--        <button v-if="disabled" @click.prevent="disabled = !disabled">-->
  <!--          Edit Data-->
  <!--        </button>-->

  <!--        <button v-if="!disabled" @click.prevent="disabled = !disabled">-->
  <!--          cancel-->
  <!--        </button>-->
  <!--      </div>-->
  <!--    </form>-->

  <!--    <b-modal-->
  <!--      id="show-licence-file"-->
  <!--      hide-footer-->
  <!--      hide-header-->
  <!--      title="BootstrapVue"-->
  <!--    >-->
  <!--      <p class="my-4">-->
  <!--        <b-img-->
  <!--          v-bind="{ fluidGrow: true }"-->
  <!--          :src="profile.licence_file"-->
  <!--          rounded-->
  <!--          alt="Rounded image"-->
  <!--        />-->
  <!--      </p>-->
  <!--    </b-modal>-->
  <!--  </div>-->
</template>
