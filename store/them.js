export const state = () => ({
  isApp: false,
  isHome: true,
})

export const mutations = {
  SET_HOME: (state, status) => {
    state.isApp = !status
    state.isHome = status
  },
}

export default {
  state,
  mutations,
}
