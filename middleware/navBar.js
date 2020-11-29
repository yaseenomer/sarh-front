export default function ({ store, route }) {
  if (route.name === 'index___en' || route.name === 'index___ar') {
    store.commit('them/SET_HOME', true)
  } else {
    store.commit('them/SET_HOME', false)
  }
}
