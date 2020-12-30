<template>
  <div>
    <v-list three-line>
      <template v-for="(item, index) in comments">
        <v-list-item :key="index">
          <v-list-item-avatar>
            <v-avatar color="blue lighten-4">u</v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="item.user.name"></v-list-item-title>
            <v-list-item-subtitle v-text="item.comment"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="index" inset />
      </template>
    </v-list>
  </div>
</template>

<script>
export default {
  props: {
    comments: { type: Array, required: true },
  },
}
</script>

<style scoped></style>
