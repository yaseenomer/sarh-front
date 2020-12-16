<template>
  <v-card flat>
    <v-card-title>
      <v-btn text color="primary" readonly>
        <v-icon>mdi-tag-multiple-outline</v-icon>
        <span>company activities</span>
      </v-btn>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <p>
        <span class="primary--text">main activity: </span>
        <span v-if="main.length">{{ main[0].activity.name }}</span>
      </p>
      <v-row>
        <p class="primary--text">sub activities :</p>
        <v-spacer />
        <v-btn text outlined rounded color="primary"> add sub activity </v-btn>
      </v-row>

      <v-simple-table dense>
        <thead>
          <tr>
            <th>{{ $t('company.activity') }}</th>
            <th>{{ $t('company.operation') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in subs" :key="i">
            <td>{{ item.sub_activity_id }}</td>
            <td>
              <v-btn icon @click="deleteUserActivity(item.sub_activity.id)">
                <v-icon>mdi-delete-outline</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      main: 'activity/userMainActivity',
      subs: 'activity/userSubActivities',
    }),
  },
  created() {
    this.$store.dispatch('activity/getUserMainActivity')
    this.$store.dispatch('activity/getUserSubActivities')
  },
  methods: {
    deleteUserActivity(id) {
      this.$store.dispatch('activity/deleteUserActivity', id)
    },
  },
}
</script>

<style scoped></style>
