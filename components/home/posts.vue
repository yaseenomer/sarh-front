<template>
  <v-row id="scrolling-techniques-4" class="overflow-y-auto">
    <v-col cols="12">
      <p
        v-if="!isProfile"
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
        <v-tab v-if="isProfile">map location</v-tab>
        <v-tab v-if="isProfile">comments</v-tab>
        <v-tab-item>
          <v-container style="background-color: #f5f5f5">
            <photo v-if="images.length" :images="images" />
            <empty-component v-else msg="There are no pictures to display" />
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
            <videos v-if="videos.length" :videos="videos" />
            <empty-component v-else msg="There are no videos to display" />
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
            <posts v-if="posts.length" :posts="posts" />
            <empty-component v-else msg="There are no posts to display" />
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
        <v-tab-item v-if="isProfile">
          <v-container style="background-color: #f5f5f5">
            <v-row>
              <v-col>
                <div v-if="company.profile.location">
                  <show-map :location="company.profile.location" />
                </div>
                <div v-else>
                  <v-row justify="center">
                    <v-icon size="100">mdi-map-marker-off</v-icon>
                  </v-row>
                  <v-row justify="center">
                    <p class="font-weight-light">not have any location yet</p>
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
        <v-tab-item v-if="isProfile">
          <create-comment :company-id="company.id.toString()" />
          <comments :company-id="company.id.toString()" />
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
import showMap from '~/components/profile/company/map/show'
import emptyComponent from '~/components/widget/empty'
export default {
  components: {
    photo,
    videos,
    posts,
    comments,
    createComment,
    showMap,
    emptyComponent,
  },
  props: {
    posts: { type: Array, required: true },
    videos: { type: Array, required: true },
    images: { type: Array, required: true },
    isProfile: { type: Boolean, required: true },
    company: { type: Object, required: false },
  },
}
</script>

<style scoped></style>
