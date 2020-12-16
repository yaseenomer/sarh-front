<template>
  <v-card flat>
    <v-row>
      <v-col>
        <v-select
          v-model="main"
          :items="activities"
          item-text="name"
          item-value="id"
          @change="setSubs"
        ></v-select>
      </v-col>
      <v-col>
        <v-select
          v-model="sub"
          :items="subs"
          item-text="name"
          item-value="id"
        ></v-select>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      main: 0,
      sub: 0,
      subs: [],
    }
  },
  created() {
    this.$store.dispatch('activity/getActivities')
  },
  computed: {
    ...mapGetters({ activities: 'activity/activities' }),
  },
  methods: {
    async setSubs() {
      const { sub_activity } = await this.activities.find(
        (m) => m.id == this.main
      )
      this.subs = sub_activity
    },
  },
}
</script>

<style scoped></style>
