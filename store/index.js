import user from './user'
import post from './post'
import them from './them'
import activity from './activity'
import quote from './quote'
export default {
  namespaced: true,
  strict: false,
  modules: {
    activity,
    quote,
    user,
    post,
    them,
  },
}
