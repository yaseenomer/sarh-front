<template>
  <div>
    <v-list three-line>
      <div v-for="(item, index) in comments" :key="index">
        <v-list-item>
          <v-list-item-avatar>
            <v-avatar color="blue lighten-4">u</v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              <span>{{ item.user.name }}</span>
              <span class="mx-2 primary--text">{{ item.created_at }}</span>
            </v-list-item-title>
            <v-list-item-subtitle v-text="item.comment"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider inset />
      </div>
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
