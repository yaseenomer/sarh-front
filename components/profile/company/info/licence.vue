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
        await this.$store.dispatch('user/uploadLicence', this.file)
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
        <span> {{ $t('company.LicenceCompany') }}</span>
      </v-btn>
      <v-spacer />
      <v-btn
        v-if="disabled"
        text
        color="primary"
        @click.prevent="disabled = !disabled"
      >
        <v-icon>mdi-pencil-outline</v-icon>
        <span>{{ $t('buttons.edit') }}</span>
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
        <span>{{ $t('buttons.savechanges') }} </span>
      </v-btn>
      <v-btn
        v-if="!disabled"
        text
        color="primary"
        :disabled="loading"
        @click.prevent="disabled = !disabled"
      >
        <v-icon>mdi-cancel</v-icon>
        <span>{{ $t('buttons.cancel') }} </span>
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
              :label="$t('company.LicenceNumber')"
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
                  :label="$t('company.CreationDate')"
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
                  :label="$t('company.ExpirationDate')"
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
              :label="$t('company.UploadLicence')"
            />
            <v-btn
              v-else
              text
              class="mt-5"
              :href="profile.licence_file"
              target="_blank"
            >
              <v-icon class="mx-2">mdi-cloud-download-outline</v-icon>
              <span>{{ $t('company.licencefile') }}</span>
            </v-btn>
          </v-col>

          <!--          <v-col cols="12" md="6">-->
          <!--            <a :href="profile.licence_file" target="_blank">Read more</a>-->
          <!--          </v-col>-->
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
