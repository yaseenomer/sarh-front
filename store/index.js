import user from './user'
import post from './post'
import them from './them'
import activity from './activity'
export default {
  namespaced: true,
  strict: false,
  modules: {
    activity,
    user,
    post,
    them,
  },
}
