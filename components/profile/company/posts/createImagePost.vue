<template>
  <v-card>
    <v-card-title>publish image</v-card-title>
    <v-card-text>
      <v-file-input :rules="rules" label="image"></v-file-input>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        elevation="0"
        :loading="saving"
        :disabled="saving"
        @click="savePost"
        >{{ $t('buttons.save') }}</v-btn
      >
      <v-spacer />
      <v-btn elevation="0" @click="$emit('close-create-image-post')">
        {{ $t('buttons.cancel') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      saving: false,
      rules: [(v) => !!v || 'File is required'],
    }
  },
  methods: {
    savePost() {
      console.log(this.rules)
    },
  },
}
</script>

<style scoped></style>
