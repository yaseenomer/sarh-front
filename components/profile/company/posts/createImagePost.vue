<template>
  <v-card>
    <v-card-title>publish image</v-card-title>
    <v-card-text>
<<<<<<< HEAD
      <v-file-input
        ref="myfile"
        v-model="file"
        :rules="rules"
        label="image"
      ></v-file-input>
=======
      <v-file-input :rules="rules" label="image"></v-file-input>
>>>>>>> 76ddb4e69c370d1df3e45f2f3875b167ac8230b0
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
      rules: [(v) => !!v || 'file is required ...'],
      file: null,
    }
  },
  methods: {
    async savePost() {
      if (this.$refs.myfile.valid) {
        this.saving = true
        const fd = new FormData()
        fd.append('type', 'image')
        fd.append('file', this.file)
        try {
          await this.$store.dispatch('post/createPost', fd)
          this.saving = false
          this.$emit('close-create-image-post')
        } catch (e) {
          this.saving = false
          this.$toast.error('something error ... :(')
        }
      } else {
        this.$toast.error('file is required ...')
      }
    },
  },
}
</script>

<style scoped></style>
