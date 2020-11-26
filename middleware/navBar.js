export default function ({ store, route }) {
  if (route.name === 'index') {
    store.commit('them/SET_HOME', true)
  } else {
    store.commit('them/SET_HOME', false)
  }
}
