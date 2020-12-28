<script>
export default {
  props: {
    videos: { type: Array, required: true },
  }
}
</script>
<template>
  <v-row>
    <v-col v-for="post in videos" :key="post.id" cols="12" md="4">
      <v-card class="rounded-xl" outlined height="400" elevation="0">
        <video width="100%" height="100%" controls poster="/img/sarh.cover.jpg">
          <source :src="post.file + '#t=0.1'" type="video/*" />
        </video>
      </v-card>
    </v-col>
  </v-row>
</template>
