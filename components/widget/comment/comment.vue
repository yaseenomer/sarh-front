<script>
import commentReplay from './commentReplay'
export default {
  components: { commentReplay },
  props: {
    comments: { type: Array, required: true },
    companyId: { type: String, required: true },
  },
  data() {
    return {
      dialog: false,
      commentSelected: null,
      show: 0,
    }
  },
  methods: {
    async creatReplay(comment) {
      this.commentSelected = await comment
      this.dialog = true
    },
    showReplay(id) {
      this.show === 0 ? (this.show = id) : (this.show = 0)
    },
  },
}
</script>
<template>
  <v-card v-if="comments.length" flat class="rounded-xl">
    <v-list three-line>
      <div v-for="(comment, index) in comments" :key="index">
        <v-list-item>
          <v-list-item-avatar color="grey"></v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              {{ comment.user.profile.full_name }}
              <span class="primary--text">
                {{ comment.created_at | moment('from', 'now', true) }}
              </span>
            </v-list-item-title>
            <v-list-item-subtitle>
              <v-rating
                v-model="comment.user.rate"
                readonly
                size="17"
                half-increments
                background-color="orange lighten-3"
                color="orange"
                dense
              ></v-rating>
            </v-list-item-subtitle>
            <v-list-item-subtitle
              v-text="comment.comment"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-row class="justify-center">
          <v-btn
            text
            color="primary"
            @click="$store.dispatch('comment/commentLike', comment)"
          >
            <v-icon>{{
              comment.is_Like ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'
            }}</v-icon>
            <span>{{ comment.likes }}</span>
          </v-btn>
          <v-btn
            text
            :disabled="comment.replay.length == 0"
            color="primary"
            @click="showReplay(comment.id)"
          >
            <v-icon>mdi-forum-outline</v-icon>
            <span>{{ comment.replay.length }}</span>
            <v-icon>{{
              show == comment.id ? 'mdi-chevron-up' : 'mdi-chevron-down'
            }}</v-icon>
          </v-btn>
          <v-btn
            :disabled="!$auth.loggedIn"
            text
            color="primary"
            @click="creatReplay(comment)"
          >
            <v-icon>mdi-message-outline</v-icon>
            leave reply
          </v-btn>
        </v-row>
        <v-expand-transition>
          <v-card
            v-show="show == comment.id"
            class="rounded-xl"
            color="#f5f5f5"
            flat
          >
            <v-row>
              <v-col cols="12" md="12">
                <v-list three-line class="rounded-xl mx-5">
                  <template v-for="(replay, i) in comment.replay">
                    <v-list-item :key="i">
                      <v-list-item-avatar color="grey"></v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>
                          {{ replay.user.name }}
                          <span class="primary--text">
                            {{
                              replay.created_at | moment('from', 'now', true)
                            }}
                          </span>
                        </v-list-item-title>
                        <v-list-item-subtitle
                          v-text="replay.comment"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider
                      v-if="!(i == comment.replay.length - 1)"
                      :key="replay.id"
                      inset
                    />
                  </template>
                </v-list>
              </v-col>
            </v-row>
          </v-card>
        </v-expand-transition>
        <v-divider
          v-if="!(index == comments.length - 1)"
          :key="comment.comment"
        ></v-divider>
      </div>
    </v-list>
    <v-dialog v-model="dialog" width="400" class="rounded-xl">
      <comment-replay
        :comment="commentSelected"
        :company-id="companyId"
        @close-form-add-replay="dialog = false"
      />
    </v-dialog>
  </v-card>
</template>
