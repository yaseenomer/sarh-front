export const state = () => ({
  countries: [],
  states: [],
  filterStates: [],
  cities: [],
  filterCities: [],
})

export const getters = {
  countries: (state) => state.countries,
  states: (state) => state.states,
  cities: (state) => state.cities,

  filterStates: (state) => state.filterStates,
  filterCities: (state) => state.filterCities,
}

export const mutations = {
  setCountries: (state, countries) => (state.countries = countries),
  setStates(state, states) {
    state.states = states
    state.filterStates = states
  },
  setCities(state, cities) {
    state.cities = cities
    state.filterCities = cities
  },

  filterStates(state, country_id) {
    state.filterStates = state.states.filter(
      (item) => item.country_id === country_id
    )
  },

  filterCities(state, state_id) {
    state.filterCities = state.cities.filter(
      (item) => item.state_id === state_id
    )
  },
}

export const actions = {
  async getCountries({ commit }) {
    const countries = await this.$axios.get('countries/countries')
    commit('setCountries', countries.data.data)
  },
  async getStates({ commit }) {
    const states = await this.$axios.get('countries/states')
    commit('setStates', states.data.data)
  },
  async getCities({ commit }) {
    const c = await this.$axios.get('countries/cities')

    commit('setCities', c.data.data)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
