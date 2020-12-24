<template>
  <div>
    <v-row justify="center">
      <v-icon size="100">mdi-folder-open-outline</v-icon>
    </v-row>
    <v-row justify="center">
      <p class="font-weight-light" v-text="msg"></p>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    msg: { type: String, required: true },
  },
}
</script>
