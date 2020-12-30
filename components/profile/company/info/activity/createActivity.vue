<template>
  <v-card flat>
    <v-row>
      <v-col>
        <v-select
          v-model="main"
          :items="activities"
          item-text="name"
          item-value="id"
          required
          :error-messages="mainErrors"
          @change="setSubs"
          @input="$v.main.$touch()"
          @blur="$v.main.$touch()"
        ></v-select>
      </v-col>
      <v-col>
        <v-select
          v-model="subIds"
          :items="subs"
          multiple
          chips
          item-text="name"
          item-value="id"
          :error-messages="subIdsErrors"
          @input="$v.subIds.$touch()"
          @blur="$v.subIds.$touch()"
        ></v-select>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
export default {
  mixins: [validationMixin],
  data() {
    return {
      main: '',
      subIds: [],
      subs: [],
    }
  },
  validations: {
    main: { required },
    subIds: { required },
  },
  computed: {
    ...mapGetters({ activities: 'activity/activities' }),
    mainErrors() {
      const errors = []
      if (!this.$v.main.$dirty) return errors
      !this.$v.main.required && errors.push('main activity is required.')
      return errors
    },
    subIdsErrors() {
      const errors = []
      if (!this.$v.subIds.$dirty) return errors
      !this.$v.subIds.required && errors.push('sub activities is required.')
      return errors
    },
  },
  created() {
    this.$store.dispatch('activity/getActivities')
  },
  methods: {
    async saveActivity() {
      await this.$v.$touch()
      if (this.$v.$invalid) return false
      if (!this.subIds.length) return false

      const data = {
        activity_id: this.main,
        sub_activity_id: this.subIds,
      }
      await this.$store.dispatch('activity/storeUserActivity', data)
    },
    async setSubs() {
      this.subIds = []
      const { sub_activity } = await this.activities.find(
        (m) => m.id == this.main
      )
      this.subs = sub_activity
    },
  },
}
</script>

<style scoped></style>
