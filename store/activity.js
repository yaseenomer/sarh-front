export const state = () => ({
  activites: [],
  activity: null,
  userMainActivity: null,
  userSubActivities: [],
})

export const getters = {
  activity: (state) => state.activity,
  activities: (state) => state.activites,
  userMainActivity: (state) => state.userMainActivity,
  userSubActivities: (state) => state.userSubActivities,
}

export const mutations = {
  setActivity: (state, activity) => (state.activity = activity),
  setActivites: (state, activites) => (state.activites = activites),
  setUserMainActivity: (state, main) =>
    (state.userMainActivity = main[0].activity),
  setUserSubActivities: (state, subs) => (state.userSubActivities = subs),
}

export const actions = {
  async getActivity({ commit }, id) {
    const res = await this.$axios.get('operation/apiActivities/' + id)
    commit('setActivity', res.data.data)
  },

  async getActivities({ commit }) {
    const res = await this.$axios.get('operation/apiAllActivities')
    commit('setActivites', res.data.data)
  },

  async getUserMainActivity({ commit }) {
    const res = await this.$axios.get('operation/apiUserActivities/main')
    commit('setUserMainActivity', res.data.data)
  },

  async getUserSubActivities({ commit }) {
    const res = await this.$axios.get('operation/apiUserActivities/sub')
    commit('setUserSubActivities', res.data.data)
  },

  async deleteUserActivity({ dispatch }, id) {
    await this.$axios.delete('operation/apiUserActivities/' + id)
    dispatch('getUserMainActivity')
    dispatch('getUserSubActivities')
  },

  async storeUserActivity({ dispatch }, activity) {
    await this.$axios.post('operation/apiUserActivities', activity)
    dispatch('getUserMainActivity')
    dispatch('getUserSubActivities')
  },

  async newSubActivity({ commit, state }, name) {
    const newSub = await this.$axios.post('operation/apiSubActivities', {
      name,
      activity_id: state.selectedActivity.id,
    })
    commit('setNewSub', newSub.data.data)
  },
  async updateUserActivity({ dispatch }, activity) {
    await this.$axios.put('operation/apiUserActivities', activity)
    dispatch('getUserMainActivity')
    dispatch('getUserSubActivities')
  },

  async userHasActivity({ dispatch, state }) {
    if (state.userActivity.activity) {
      return dispatch('getSelectedActivity', state.userActivity.activity.id)
    }
    return true
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
