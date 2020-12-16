export const state = () => ({
  activites: [],
  userMainActivity: null,
  userSubActivities: [],
})

export const getters = {
  activites: (state) => state.activites,
  userMainActivity: (state) => state.userMainActivity,
  userSubActivities: (state) => state.userSubActivities,
}

export const mutations = {
  setActivites(state, activites) {
    state.activites = activites
  },
  setDeleteUserActivities(state, id) {
    state.userActivity.user_activities.filter((t) => t.id == !id)
  },

  setUserMainActivity(state, userMainActivit) {
    return (state.userMainActivity = userMainActivit)
  },

  setUserSubActivities(state, subs) {
    return (state.userSubActivities = subs)
  },

  setNewSub(state, sub) {
    state.selectedActivity.sub_activity.push(sub)
  },
}

export const actions = {
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

  async deleteUserActivity({ commit }, id) {
    await this.$axios.delete('operation/apiUserActivities/' + id)
    commit('setDeleteUserActivities', id)
  },

  async storeUserActivity({ dispatch }, activity) {
    await this.$axios.post('operation/apiUserActivities', activity)
    dispatch('getUserActivity')
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
    dispatch('getUserActivity')
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
