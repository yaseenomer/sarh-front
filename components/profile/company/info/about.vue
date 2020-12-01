<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      disabled: true,
      loading: false,
    }
  },
  computed: {
    ...mapGetters({ profile: 'user/user' }),
    updateData() {
      return {
        full_name: this.profile.full_name,
        phone: this.profile.phone,
        employee_number: this.profile.employee_number,
        about: this.profile.about,
        email_cc: this.profile.email_cc,
        web_site: this.profile.web_site,
      }
    },
  },
  methods: {
    async update() {
      this.loading = true
      await this.$store.dispatch('user/updateProfile', this.updateData)
      this.$auth.fetchUser()
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
        <v-icon>mdi-information-outline</v-icon>
        <span> {{ $t('company.aboutcompany') }}</span>
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
        @click="update"
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
        <span>{{ $t('company.cancel') }} </span>
      </v-btn>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="profile.full_name"
              :disabled="disabled"
              :label="$t('company.CompanyName')"
              prepend-icon="mdi-account-circle-outline"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="$auth.user.email"
              prepend-icon="mdi-email-open-outline"
              :label="$t('company.email')"
              disabled
            />
          </v-col>
          <v-col cols="12" md="6">
            <!--            <label for="">Phone</label>-->
            <!--            <vue-tel-input v-model="profile.phone" :disabled="disabled" />-->
            <v-text-field
              v-model="profile.phone"
              :label="$t('company.phone')"
              prepend-icon="mdi-phone-outline"
              :disabled="disabled"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="profile.employee_number"
              :label="$t('company.EmployeesNumber')"
              prepend-icon="mdi-account-group-outline"
              :disabled="disabled"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="profile.email_cc"
              :label="$t('company.ccemail')"
              :disabled="disabled"
              prepend-icon="mdi-email-outline"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="profile.web_site"
              :label="$t('company.website')"
              :disabled="disabled"
              prepend-icon="mdi-web"
            />
          </v-col>

          <v-col cols="12" md="12">
            <v-textarea
              v-model="profile.about"
              :disabled="disabled"
              :label="$t('company.aboutcompany')"
              prepend-icon="mdi-information-variant"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
