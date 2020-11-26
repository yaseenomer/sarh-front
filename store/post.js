export const state = () => ({
  posts: [],
  videos: [],
  images: [],
})

export const getters = {
  posts: (state) => state.posts,
  videos: (state) => state.videos,
  images: (state) => state.images,
}

export const mutations = {
  SET_POSTS: (state, posts) => {
    state.posts = posts.filter((post) => post.type === 'post')
    state.videos = posts.filter((post) => post.type === 'video')
    state.images = posts.filter((post) => post.type === 'image')
  },
}

export const actions = {
  async getPosts({ commit }) {
    const posts = await this.$axios.get('operation/apiGetPost/20')
    commit('SET_POSTS', posts.data.data)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
