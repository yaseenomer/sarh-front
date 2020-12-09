export const state = () => ({
  myRequestQuotationsSent: [],
  myReqestQuotationDetails: null,
})

export const getters = {
  myRequestQuotationsSent: (state) => state.myRequestQuotationsSent,
  myReqestQuotationDetails: (state) => state.myReqestQuotationDetails,
}

export const mutations = {
  SET_NEW_REQUEST_QUOTATION: (state, RQ) =>
    state.myRequestQuotationsSent.push(RQ),

  SET_MY_REQUEST_QUOTATIONS_SENT: (state, RQs) =>
    (state.myRequestQuotationsSent = RQs),

  SET_MY_REQUEST_QUOTATION_DETAILS: (state, RQ) =>
    (state.myReqestQuotationDetails = RQ),

  SET_NEW_QUOTATION: (state, Q) =>
    //  state.myReqestQuotationDetails.quotation.push(Q),
    console.log(Q),
}

export const actions = {
  async getMyRequestQuotationsSent({ commit }) {
    const RQs = await this.$axios.get('operation/apiSentInquiry')
    commit('SET_MY_REQUEST_QUOTATIONS_SENT', RQs.data.data)
  },

  async getMyRequestQuotationDetails({ commit }, id) {
    const RQ = await this.$axios.get('operation/apiRecivedInquiryDetails/' + id)
    commit('SET_MY_REQUEST_QUOTATION_DETAILS', RQ.data.data)
  },

  async sendRequestQuotation({ commit }, reqQuotation) {
    const RQ = await this.$axios.post('operation/apiAddInquiry', reqQuotation)
    commit('SET_NEW_REQUEST_QUOTATION', RQ.data.data)
  },
  async sendQuotation({ commit }, quotation) {
    const Q = await this.$axios.post('operation/apiAddQuotation', quotation)
    commit('SET_NEW_QUOTATION', Q.data.data)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
