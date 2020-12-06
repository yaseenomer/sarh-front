export const state = () => ({
  myRequestQuotationsSent: [],
})

export const getters = {
  myRequestQuotationsSent: (state) => state.myRequestQuotationsSent,
}

export const mutations = {
  SET_NEW_REQUEST_QUOTATION: (state, RQ) =>
    state.myRequestQuotationsSent.push(RQ),

  SET_MY_REQUEST_QUOTATIONS_SENT: (state, RQs) =>
    (state.myRequestQuotationsSent = RQs),
}

export const actions = {
  async getMyRequestQuotationsSent({ commit }) {
    const RQs = await this.$axios.get('operation/apiSentInquiry')
    commit('SET_MY_REQUEST_QUOTATIONS_SENT', RQs.data.data)
  },
  async sendRequestQuotation({ commit }, reqQuotation) {
    const RQ = await this.$axios.post('operation/apiAddInquiry', reqQuotation)
    commit('SET_NEW_REQUEST_QUOTATION', RQ.data.data)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
