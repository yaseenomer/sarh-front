<template>
  <v-card flat>
    <v-card-title>
      <v-btn text color="primary" readonly>
        <v-icon>mdi-tag-multiple-outline</v-icon>
        <span>company activities</span>
      </v-btn>
      <v-spacer />

      <v-btn
        v-if="!main"
        :loading="saving"
        color="primary"
        roundedr
        elevation="0"
        rounded
        @click="saveActivity"
      >
        save
      </v-btn>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <template v-if="main">
        <p>
          <span class="primary--text">main activity: </span>
          <span>{{ main.name }}</span>
        </p>
        <v-row>
          <p class="primary--text">sub activities :</p>
          <v-btn icon color="primary" @click="createSubActivity = true">
            <v-icon>mdi-pencil-outline</v-icon>
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
              <td>{{ item.sub_activity.name }}</td>
              <td>
                <v-btn
                  :loading="deleting === item.sub_activity_id"
                  icon
                  @click="deleteUserActivity(item.sub_activity_id)"
                >
                  <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <div justify="center">
          <v-dialog v-model="createSubActivity" max-width="400px" persistent>
            <form-create-sub-activity
              :activity-id="main.id.toString()"
              @close-add-sub-form="createSubActivity = false"
            />
          </v-dialog>
        </div>
      </template>
      <template v-else>
        <create-activity ref="createActivityForm" />
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
      saving: false,
      deleting: 0,
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
    async deleteUserActivity(id) {
      this.deleting = id
      await this.$store.dispatch('activity/deleteUserActivity', id)
      this.deleting = 0
    },

    async saveActivity() {
      this.saving = true
      await this.$refs.createActivityForm.saveActivity()
      this.saving = false
    },
  },
}
</script>

<style scoped></style>
