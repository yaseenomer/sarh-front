import _ from 'lodash'
export const state = () => ({
  company: null,
  companies: [],
  recentlyAdded: [],
  recommendedByUs: [],
  searchedCompanies: [],
  favoriteCompany: [],
  topRating: [],
  sharing: {},
  reportCompany: 0,
  reports: [],
})

export const getters = {
  companies: (state) => state.companies,
  recentlyAdded: (state) => _.orderBy(state.companies, 'created_at', 'desc'),
  topRating: (state) => _.orderBy(state.companies, 'rate', 'desc'),
  recommendedByUs: (state) => state.recommendedByUs,
  company: (state) => state.company,
  comments: (state) => state.comments,
  posts: (state) => state.posts,
  sharing: (state) => state.sharing,
  reports: (state) => state.reports,
  favoriteCompany: (state) => state.favoriteCompany,
}

export const mutations = {
  setCompanies(state, companies) {
    state.companies = companies.filter((company) => company.type === 2)
  },
  setRecentlyAdded(state, recentlyAdded) {
    state.recentlyAdded = recentlyAdded
  },
  setRecommendedByUs(state, recommendedByUs) {
    state.recommendedByUs = recommendedByUs
  },

  setFavoriteCompany(state, favs) {
    state.favoriteCompany = favs
  },
  setCompany(state, company) {
    state.company = company
  },

  setCompaniesByActivity(state, ac) {
    const coms = []
    state.companies.forEach((company) => {
      if (company.activity) {
        if (company.activity.id == ac) {
          coms.push(company)
        }
      }
    })
    state.searchedCompanies = coms
  },

  setLike(state, data) {
    return data
  },

  setReport(state, company) {
    return (state.reportCompany = company)
  },
  setReports(state, reports) {
    return (state.reports = reports)
  },
  setSharing(state, data) {
    state.sharing = data
  },
}

export const actions = {
  async getCompanies({ commit }) {
    if (this.$auth.loggedIn) {
      const companies = await this.$axios.get('user/apiCompanies') // user/apiAllCompanies
      commit('setCompanies', companies.data.data)
    } else {
      const companies = await this.$axios.get('user/apiAllCompanies')
      commit('setCompanies', companies.data.data)
    }
  },

  async getRecentlyAdded({ commit }) {
    const companies = await this.$axios.get('user/apiRecentlyAdded')
    commit('setRecentlyAdded', companies.data.data)
  },
  async getRecommendedByUs({ commit }) {
    const companies = await this.$axios.get('user/apiRecommended')
    commit('setRecommendedByUs', companies.data.data)
  },

  async getFavoriteCompany({ commit }) {
    const companies = await this.$axios.get('operation/apiUserFavorite')
    commit('setFavoriteCompany', companies.data.data)
  },

  async getCompany({ commit }, id) {
    const company = await this.$axios.get('user/showCompany/' + id)
    commit('setCompany', company.data.data)
  },

  getCompaniesByActivity({ commit }, activity) {
    commit('setCompaniesByActivity', activity)
  },
  async getMyReports({ commit }) {
    const reports = await this.$axios.get('operation/apiReport/getCompany')
    commit('setReports', reports.data)
  },

  async favorite(context, data) {
    if (this.$auth.loggedIn) {
      const status = (await data.is_Favorite) ? 0 : 1
      data.is_Favorite = !data.is_Favorite
      await this.$axios.post('operation/apiUserFavorite', {
        company_id: data.id,
        status: status,
      })
    } else {
      this.$toast.info('plase login to do that')
    }
  },

  profile({ commit }, data) {
    if (this.$auth.loggedIn) {
      commit('setProfile', data)
    } else {
      this.$toast.info('plase login to do that')
    }
  },

  like({ commit }, data) {
    if (this.$auth.loggedIn) {
      commit('setFollow', data)
    } else {
      this.$toast.info('plase login to do that')
    }
  },

  report({ commit }, data) {
    if (this.$auth.loggedIn) {
      commit('setReport', data)
    } else {
      return this.$toast.info('plase login to do that')
    }
  },

  async sendReport(context, data) {
    await this.$axios.post('operation/apiReport/company', data)
    return true
  },

  rating(context, data) {
    this.$axios.post('operation/apiUserRate', {
      user_id: data.id,
      rate: data.rate,
    })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
