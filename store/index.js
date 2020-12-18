import user from './user'
import post from './post'
import them from './them'
import activity from './activity'
import quote from './quote'
import comment from './comment'
export default {
  namespaced: true,
  strict: false,
  modules: {
    activity,
    comment,
    quote,
    user,
    post,
    them,
  },
}
