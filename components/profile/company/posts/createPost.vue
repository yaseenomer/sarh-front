<template>
  <v-card>
    <v-card-title>
      <p>create post <span v-if="title != null">with </span>{{ title }}</p>
      <v-spacer />
      <v-btn icon @click="closeWindow">
        <v-icon>mdi-window-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-text-field label="title" outlined></v-text-field>
      <v-textarea label="content" outlined></v-textarea>
      <v-file-input label="image"></v-file-input>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" dark elevation="0">save</v-btn>
      <v-spacer />
      <v-btn elevation="0" @click="closeWindow">cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['title'],
  methods: {
    closeWindow() {
      this.$emit('close-create-post')
    },
  },
}
</script>

<style scoped></style>
