export const state = () => ({
  user: null,
  registerType: 0,
})

export const mutations = {
  setRegisterType(state, type) {
    state.registerType = type
  },
}

export const getters = {
  registerType(state) {
    return state.registerType
  },
}

export const actions = {
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
  async uploadLicence({ commit }, file) {
    try {
      const fd = new FormData()
      fd.append('file', file, file.name)
      await this.$axios.post('user/apiProfiles/user/update-licence', fd)
    } catch (e) {
      for (const [key, value] of Object.entries(e.response.data.errors)) {
        this.$toast.error(key + ':' + value[0])
      }
    }
  },

  // eslint-disable-next-line no-unused-vars
  async resetPassword({ commit }, email) {
    try {
      const res = await this.$axios.post('user/apiResetPasswords/email', {
        email,
      })
      return res.data
    } catch (e) {
      this.$toast.error(e.response.error)
      return { error: true }
    }
  },

  async sendReport(context, data) {
    const url = data.company ? 'company' : 'post'
    await this.$axios
      .post(`operation/apiReport/${url}`, data)
      .then(() => this.$toast.success('send report success'))
      .catch(() => this.$toast.error('something error '))
    return true
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
