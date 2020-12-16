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
      <template v-if="main && main[0].acivity">
        <p>
          <span class="primary--text">main activity: </span>
          <span>{{ main[0].activity.name }}</span>
        </p>
        <v-row>
          <p class="primary--text">sub activities :</p>
          <v-spacer />
          <v-btn
            text
            outlined
            rounded
            color="primary"
            @click="createSubActivity = true"
          >
            add sub activity
          </v-btn>
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
                <v-btn icon @click="deleteUserActivity(item.sub_activity_id)">
                  <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <div justify="center">
          <v-dialog v-model="createSubActivity" max-width="400px">
            <form-create-sub-activity
              :activity-id="main[0].activity_id.toString()"
            />
          </v-dialog>
        </div>
      </template>
      <template v-else>
        <create-activity />
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import formCreateSubActivity from './addSubActivity'
import createActivity from './createActivity'
export default {
  components: { formCreateSubActivity, createActivity },
  data() {
    return {
      createSubActivity: false,
    }
  },
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
