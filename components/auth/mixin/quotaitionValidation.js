export default {
  computed: {
    subjectErrors() {
      const errors = []
      if (!this.$v.subject.$dirty) return errors
      !this.$v.subject.required && errors.push('subject is required.')
      return errors
    },
    bodyErrors() {
      const errors = []
      if (!this.$v.body.$dirty) return errors
      !this.$v.body.required && errors.push('body is required.')
      return errors
    },
    sendToErrors() {
      const errors = []
      if (!this.$v.send_to.$dirty) return errors
      !this.$v.send_to.required && errors.push('send_to is required.')
      return errors
    },
    activityErrors() {
      const errors = []
      if (!this.$v.activity_id.$dirty) return errors
      !this.$v.activity_id.required && errors.push('activity_id is required.')
      return errors
    },
  },
}
