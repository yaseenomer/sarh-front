export const state = () => ({
  activites: [],
  selectedActivity: null,
  userActivity: null,
  userMainActivity: null,
})

export const getters = {
  activites(state) {
    return state.activites
  },
  selectedActivity(state) {
    return state.selectedActivity
  },

  subActivities(state) {
    if (state.selectedActivity) return state.selectedActivity.sub_activity
    return []
  },

  userActivity(state) {
    return state.userActivity
  },

  userMainActivity: (state) => state.userMainActivity,
}

export const mutations = {
  setActivites(state, activites) {
    state.activites = activites
  },
  setSelectedActivity(state, id) {
    // eslint-disable-next-line eqeqeq
    state.selectedActivity = state.activites.find((r) => r.id == id)
  },

  setUserActivities(state, userActivity) {
    state.userActivity = userActivity[0]
  },
  setDeleteUserActivities(state, id) {
    state.userActivity.user_activities.filter((t) => t.id == !id)
  },

  setUserMainActivity(state, userMainActivit) {
    return (state.userMainActivity = userMainActivit)
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

  async getSelectedActivity({ commit }, id) {
    commit('setSelectedActivity', id)
  },
  async getUserActivity({ commit }) {
    const userActivity = await this.$axios.get('operation/apiUserActivities')
    commit('setUserActivities', userActivity.data.data)
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
