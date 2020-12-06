export const state = () => ({
  posts: [],
  videos: [],
  images: [],
  myPosts: null,
})

export const getters = {
  posts: (state) => state.posts,
  videos: (state) => state.videos,
  images: (state) => state.images,
  myPosts: (state) => state.myPosts,
}

export const mutations = {
  SET_POSTS: (state, posts) => {
    state.posts = posts.filter((post) => post.type === 'post')
    state.videos = posts.filter((post) => post.type === 'video')
    state.images = posts.filter((post) => post.type === 'image')
  },
  SET_MY_POSTS: (state, posts) => (state.myPosts = posts),
  SET_NEW_POST: (state, post) => {
    if (post.type === 'post') {
      state.myPosts.posts.push(post)
    }
    if (post.type === 'image') {
      state.myPosts.images.push(post)
    }
    if (post.type === 'video') {
      state.myPosts.videos.push(post)
    }
  },
}

export const actions = {
  async getPosts({ commit }) {
    const posts = await this.$axios.get('operation/apiGetPost/20')
    commit('SET_POSTS', posts.data.data)
  },

  async getMyPosts({ commit }) {
    const posts = await this.$axios.get('operation/apiPost/companyPost')
    commit('SET_MY_POSTS', posts.data.data)
  },

  async createPost({ commit }, post) {
    const newPost = await this.$axios.post('operation/apiPost', post)
    commit('SET_NEW_POST', newPost.data.data)
  },

  async likePost(context, post) {
    if (this.$auth.loggedIn) {
      const status = post.is_Like ? 0 : 1
      post.is_Like = !post.is_Like
      await this.$axios.post('operation/apiLike', { post_id: post.id, status })
    } else {
      this.$toast.error('please login ...')
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
