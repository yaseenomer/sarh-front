<template>
  <v-card>
    <v-card-text>
      {{ $store.state.activity.activity }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    activityId: { type: String, required: true },
  },
  created() {
    this.$store.dispatch('activity/getActivity', this.activityId)
    this.$store.dispatch('activity/getActivities')
  },
}
</script>

<style scoped></style>
