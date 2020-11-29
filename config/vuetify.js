import colors from 'vuetify/es5/util/colors'
import VueI18n from 'vue-i18n'

const i18n = new VueI18n({
  locale: 'en',
})

export default {
  customVariables: ['~/assets/variables.scss'],
  lang: {
    t: (key, ...params) => i18n.t(key, params),
  },
  theme: {
    dark: false,
    themes: {
      dark: {
        primary: colors.blue.darken2,
        accent: colors.grey.darken3,
        secondary: colors.amber.darken3,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3,
      },
      light: {
        primary: colors.blue.darken2,
        accent: colors.grey.darken3,
        secondary: colors.amber.darken3,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3,
      },
    },
  },
}
