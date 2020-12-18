<template>
  <v-row id="scrolling-techniques-4" class="overflow-y-auto">
    <v-col cols="12">
      <p
        v-if="hasTitel"
        class="primary--text text-center text-uppercase font-weight-bold"
      >
        {{ $t('home.Latestposts') }}
      </p>
    </v-col>
    <v-col>
      <v-tabs centered background-color="#f5f5f5">
        <v-tab>{{ $t('home.Photos') }}</v-tab>
        <v-tab>{{ $t('home.Videos') }}</v-tab>
        <v-tab>{{ $t('home.Posts') }}</v-tab>
        <v-tab v-if="hasComments">comments</v-tab>
        <v-tab-item>
          <v-container style="background-color: #f5f5f5">
            <template v-if="images.length">
              <photo :images="images" />
            </template>
            <template v-else>
              <v-row>
                <v-col v-for="i in 6" :key="i" cols="12" md="4">
                  <v-skeleton-loader
                    class="mx-auto rounded-xl"
                    type="image"
                  ></v-skeleton-loader>
                </v-col>
              </v-row>
            </template>
            <v-row>
              <v-col cols="12">
                <p class="text-center">
                  <v-btn
                    nuxt
                    color="primary"
                    outlined
                    rounded
                    small
                    @click="
                      $router.replace({
                        name: 'posts',
                        query: { type: 'image' },
                      })
                    "
                    >{{ $t('home.showallphotos') }}
                    <v-icon>mdi-arrow-right</v-icon>
                  </v-btn>
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
        <v-tab-item>
          <v-container style="background-color: #f5f5f5">
            <videos :videos="videos" />
            <v-row>
              <v-col cols="12">
                <p class="text-center">
                  <v-btn
                    color="primary"
                    outlined
                    rounded
                    small
                    @click="
                      $router.replace({
                        name: 'posts',
                        query: { type: 'video' },
                      })
                    "
                    >{{ $t('home.showallvideos') }}
                    <v-icon>mdi-arrow-right</v-icon>
                  </v-btn>
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
        <v-tab-item>
          <v-container style="background-color: #f5f5f5">
            <posts :posts="posts" />
            <v-row>
              <v-col cols="12">
                <p class="text-center">
                  <v-btn
                    color="primary"
                    outlined
                    rounded
                    small
                    @click="
                      $router.replace({
                        name: 'posts',
                        query: { type: 'post' },
                      })
                    "
                  >
                    {{ $t('home.showallposts') }}
                    <v-icon>mdi-arrow-right</v-icon>
                  </v-btn>
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
        <v-tab-item v-if="hasComments">
          <create-comment :company-id="companyId" />
          <comments :company-id="companyId" />
        </v-tab-item>
      </v-tabs>
    </v-col>
  </v-row>
</template>

<script>
import photo from '~/components/widget/post/photo'
import videos from '~/components/widget/post/video'
import posts from '~/components/widget/post/posts'
import comments from '~/components/company/comments'
import createComment from '~/components/widget/comment/createComment'
export default {
  components: { photo, videos, posts, comments, createComment },
  props: {
    posts: { type: Array, required: true },
    videos: { type: Array, required: true },
    images: { type: Array, required: true },
    hasTitel: { type: Boolean, required: false },
    hasComments: { type: Boolean, required: false },
    companyId: { type: String, required: false },
  },
}
</script>

<style scoped></style>
