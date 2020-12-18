export const state = () => ({
  comments: [],
})

export const getters = {
  comments: (state) => state.comments,
}

export const mutations = {
  setComments(state, comments) {
    state.comments = comments
  },

  setComment(state, comment) {
    state.comments.unshift(comment)
  },

  setCommentLike(state, data) {
    const comment = state.comments.find((comment) => comment.id === data.id)

    if (comment.is_Like) {
      comment.is_Like = false
      comment.likes--
    } else {
      comment.is_Like = true
      comment.likes++
    }
  },
  setCommentReplay(state, data) {
    const comment = state.comments.find((comment) => comment.id === data.id)
    comment.replay.unshift(data.com)
  },
}

export const actions = {
  async getCommentsByCompanyId({ commit }, id) {
    if (this.$auth.loggedIn) {
      const comments = await this.$axios.get(
        'operation/apiCompanyComments/' + id
      )
      commit('setComments', comments.data.data)
    } else {
      const comments = await this.$axios.get(
        'operation/apiAllCompanyComments/' + id
      )
      commit('setComments', comments.data.data)
    }
  },

  async getMyComments({ commit }) {
    const comments = await this.$axios.get('operation/apiMyComments')
    commit('setComments', comments.data.data)
  },
  async addComment({ commit }, comment) {
    const newComment = await this.$axios.post(
      'operation/apiComment',
      comment.comment
    )
    if (comment.replay) {
      commit('setCommentReplay', {
        com: newComment.data.data,
        id: comment.comment.parent,
      })
    } else {
      commit('setComment', newComment.data.data)
    }
  },

  async commentLike({ commit }, data) {
    if (this.$auth.loggedIn) {
      const status = (await data.is_Like) ? 0 : 1
      this.$axios.post('operation/apiCommentLike', {
        comment_id: data.id,
        status: status,
      })
      commit('setCommentLike', data)
    } else {
      this.$toast.info('plase login to do that')
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
