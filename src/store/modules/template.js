import api from '@/api'

const template = {
  state: {
    tags: [],
    options: [],
    channels: [],
    versions: [],
    categories: []
  },

  mutations: {
    SET_TAGS: (state, tags) => {
      state.tags = tags
    },
    SET_CHANNEL: (state, channels) => {
      state.channels = channels
    },
    SET_VERSION: (state, versions) => {
      state.versions = versions
    },
    SET_CATEGORY: (state, categories) => {
      state.categories = categories
    }
  },

  actions: {
    getTemplateTags ({ commit, state }) {
      return api.template.getOverviewTags()
        .then(res => {
          commit('SET_TAGS', res.data.list)
        })
        .catch(() => {})
    },
    async getTemplateOptions ({ commit, state }, params) {
      const { data: { list } } = await api.template.getOverviewOption(params)
      // 0:渠道 1:版本
      if (params.type === 1) {
        commit('SET_VERSION', list)
      } else {
        commit('SET_CHANNEL', list)
      }
    },
    async getCategoryList ({ commit, state }, params) {
      const { data: { result: { list } } } = await api.template.getCategoryList(params)
      commit('SET_CATEGORY', list)
    }
  }
}

export default template
