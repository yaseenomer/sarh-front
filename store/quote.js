export const state = () => ({
  myRequestQuotationsSent: [],
  myRequestQuotationsReceived: [],
  quotations: [],
  myReqestQuotationDetails: null,
})

export const getters = {
  myRequestQuotationsSent: (state) => state.myRequestQuotationsSent,
  myRequestQuotationsReceived: (state) => state.myRequestQuotationsReceived,
  myReqestQuotationDetails: (state) => state.myReqestQuotationDetails,
  quotations: (state) => state.quotations,
}

export const mutations = {
  SET_NEW_REQUEST_QUOTATION: (state, RQ) =>
    state.myRequestQuotationsSent.push(RQ),

  SET_MY_REQUEST_QUOTATIONS_SENT: (state, RQs) =>
    (state.myRequestQuotationsSent = RQs),

  SET_MY_REQUEST_QUOTATIONS_RECEIVED: (state, RQs) =>
    (state.myRequestQuotationsReceived = RQs),

  SET_MY_REQUEST_QUOTATION_DETAILS: (state, RQ) =>
    (state.myReqestQuotationDetails = RQ),

  SET_QUOTATIONS: (state, Qs) => (state.quotations = Qs),

  SET_NEW_QUOTATION: (state, Q) => state.quotations.unshift(Q),
}

export const actions = {
  async getMyRequestQuotationsSent({ commit }) {
    const RQs = await this.$axios.get('operation/apiSentInquiry')
    commit('SET_MY_REQUEST_QUOTATIONS_SENT', RQs.data.data)
  },
  async getMyRequestQuotationsReceived({ commit }) {
    const RQs = await this.$axios.get('operation/apiRecivedInquiry')
    commit('SET_MY_REQUEST_QUOTATIONS_RECEIVED', RQs.data.data)
  },

  async getMyRequestQuotationDetails({ commit }, id) {
    const RQ = await this.$axios.get('operation/apiRecivedInquiryDetails/' + id)
    commit('SET_MY_REQUEST_QUOTATION_DETAILS', RQ.data.data)
  },

  async getQuotations({ commit }, id) {
    const Qs = await this.$axios.get('operation/apiInquiryQuotation/' + id)
    commit('SET_QUOTATIONS', Qs.data.data)
  },

  async sendRequestQuotation({ dispatch }, reqQuotation) {
    await this.$axios.post('operation/apiAddInquiry', reqQuotation)
    dispatch('getMyRequestQuotationsSent')
  },
  async sendQuotation({ commit }, quotation) {
    const Q = await this.$axios.post('operation/apiAddQuotation', quotation)
    commit('SET_NEW_QUOTATION', Q.data.data)
  },

  // eslint-disable-next-line no-unused-vars
  async downloadFile({ commit }, id) {
    const Q = await this.$axios.get('operation/apiDwonload/quotation/' + id)
    return Q.data
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
