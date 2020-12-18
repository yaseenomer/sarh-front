<template>
  <v-card>
    <v-card-text>
      <v-select
        v-model="subIds"
        :loading="!$store.state.activity.activity"
        :items="items"
        multiple
        chips
        item-text="name"
        item-value="id"
      ></v-select>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        :loading="updating"
        rounded
        elevation="0"
        @click="add"
        >update</v-btn
      >
      <v-spacer />
      <v-btn @click="$emit('close-add-sub-form')" elevation="0" rounded>
        cancel
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    activityId: { type: String, required: true },
  },
  data() {
    return {
      subIds: [],
      updating: false,
    }
  },
  computed: {
    ...mapGetters({
      activity: 'activity/activity',
    }),
    items() {
      if (this.activity) {
        return this.activity.sub_activity
      }
      return []
    },
  },
  created() {
    this.$store.dispatch('activity/getActivity', this.activityId)
    this.$store.dispatch('activity/getActivities')
  },

  methods: {
    async add() {
      this.updating = true
      await this.$store.dispatch('activity/updateUserActivity', {
        sub_activity_id: this.subIds,
        activity_id: this.activity.id,
      })
      this.updating = false
      this.$emit('close-add-sub-form')
    },
  },
}
</script>

<style scoped></style>
