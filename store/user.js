export const state = () => ({
  user: null,
  questions: [],
  answers: [],
  favoriteCompany: [],
  registerType: 0,
  registerForm: false,
  loginForm: false,
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  updateUser(state, user) {
    state.user = user
  },
  setQuestions(state, questions) {
    state.questions = questions
  },
  setAnswers(state, answers) {
    state.answers = answers
  },
  setFavforiteCompany(state, favoriteCompany) {
    state.favoriteCompany = favoriteCompany
  },
  setRegisterForm(state, data) {
    state.registerForm = data.status
    state.registerType = data.type
  },
  setLoginForm(state, status) {
    state.loginForm = status
  },
}

export const getters = {
  user(state) {
    return state.user
  },
  questions(state) {
    return state.questions
  },
  answers(state) {
    return state.answers
  },
  registerType(state) {
    return state.registerType
  },
}

export const actions = {
  async getUser({ commit }) {
    const user = await this.$axios.get('user/apiProfiles/user')
    commit('setUser', user.data.data)
  },

  async getFavoriteCompany({ commit }) {
    const fav = await this.$axios.get('operation/apiUserFavorite')
    commit('setFavforiteCompany', fav.data.data)
  },

  async changePassword(context, data) {
    await this.$axios
      .post('user/apiUsers/change-password', data)
      .then((response) => this.$toast.success(response.data.message))
      .catch(() => this.$toast.error('The given data was invalid'))
  },

  async updateProfile({ commit }, data) {
    const profile = await this.$axios.put('user/apiProfiles/user', data)
    commit('updateUser', profile.data.data)
  },

  async uploadAvatar({ dispatch }, avatar) {
    const fd = await new FormData()
    await fd.append('avatar', avatar, avatar.name)
    await this.$axios.post('user/apiProfiles/user/update-avatar', fd)
    dispatch('getUser')
  },

  async uploadCover({ dispatch }, avatar) {
    const fd = await new FormData()
    await fd.append('file', avatar, avatar.name)
    await this.$axios.post('user/apiProfiles/user/update-cover', fd)
    dispatch('getUser')
  },

  async getQuestions({ commit }) {
    const quesitons = await this.$axios.get('user/apiQuestions')
    commit('setQuestions', quesitons.data.data)
  },

  async getAnswers({ commit }) {
    const answers = await this.$axios.get('user/apiAnswers')
    commit('setAnswers', answers.data.data)
  },

  async storeAnswer({ dispatch }, data) {
    await this.$axios.post('user/apiAnswers', data) // user/apiAnswers
    dispatch('getAnswers')
  },

  async updateAnswer({ dispatch }, answer) {
    await this.$axios.put('user/apiAnswers/' + answer.id, answer)
    dispatch('getAnswers')
  },
  // eslint-disable-next-line no-unused-vars
  async register({ commit }, registrationInfo) {
    try {
      const user = await this.$axios.post('user/apiRegisters', registrationInfo)
      return user.data
    } catch (e) {
      for (const [key, value] of Object.entries(e.response.data.errors)) {
        this.$toast.error(key + ':' + value[0])
        return { error: true }
      }
    }
  },
  // eslint-disable-next-line no-unused-vars
  loginWithSocial({ commit }, service) {
    window.location.href = 'https://back.sarh.ae/api/auth/login/' + service //
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
