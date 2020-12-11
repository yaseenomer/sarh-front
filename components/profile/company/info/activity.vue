<template>
  <v-container>
    <v-row>
      <v-col>
        <v-simple-table v-if="activity" dense>
          <thead>
            <tr>
              <th>{{ $t('company.activity') }}</th>
              <th>{{ $t('company.operation') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in activity.user_activities" :key="i">
              <td>{{ item.sub_activity.name }}</td>
              <td>
                <v-btn icon @click="deleteUserActivity(item.sub_activity.id)">
                  <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({ activity: 'activity/userActivity' }),
  },
  created() {
    this.$store.dispatch('activity/getUserActivity')
  },
  methods: {
    deleteUserActivity(id) {
      this.$store.dispatch('activity/deleteUserActivity', id)
    },
  },
}
</script>

<style scoped></style>
