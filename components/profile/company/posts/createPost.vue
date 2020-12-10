<template>
  <v-card>
    <v-card-title>
      <p>
        {{ $t('posts.addpost') }} <span v-if="postType">with </span
        >{{ postType }}
      </p>
      <v-spacer />
      <v-btn icon @click="closeWindow">
        <v-icon>mdi-window-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-text-field
        v-model="title"
        :label="$t('posts.title')"
        outlined
        :error-messages="titleErrors"
        required
        @input="$v.title.$touch()"
        @blur="$v.title.$touch()"
      ></v-text-field>

      <v-textarea
        v-model="content"
        :label="$t('posts.content')"
        outlined
        :error-messages="contentErrors"
        required
        @input="$v.content.$touch()"
        @blur="$v.content.$touch()"
      ></v-textarea>
      <v-file-input
        v-if="postType"
        v-model="file"
        :label="postType"
      ></v-file-input>
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
      <v-btn elevation="0" @click="closeWindow">{{
        $t('buttons.cancel')
      }}</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
export default {
  mixins: [validationMixin],
  props: ['postType'],
  data() {
    return {
      title: '',
      content: '',
      file: '',
      saving: false,
    }
  },
  computed: {
    titleErrors() {
      const errors = []
      if (!this.$v.title.$dirty) return errors
      !this.$v.title.required && errors.push('title is required.')
      return errors
    },
    contentErrors() {
      const errors = []
      if (!this.$v.content.$dirty) return errors
      !this.$v.content.required && errors.push('content is required.')
      return errors
    },
  },
  validations: {
    title: { required },
    content: { required },
  },
  methods: {
    closeWindow() {
      this.$emit('close-create-post')
    },

    async savePost() {
      await this.$v.$touch()
      if (!this.$v.$invalid) {
        const post = {
          title: this.title,
          content: this.content,
          type: (await this.postType) ? this.postType : 'post',
        }
        if (await this.postType) {
          post.file = this.file
        }
        try {
          this.saving = true
          await this.$store.dispatch('post/createPost', post)
          this.saving = false
          this.closeWindow()
        } catch (e) {
          this.$toast.error(e.response.data)
          this.saving = false
        }
      }
    },
  },
}
</script>

<style scoped></style>
