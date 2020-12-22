<template>
  <v-card>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="$auth.user.profile.full_name"
              label="user name"
              prepend-icon="mdi-account-circle-outline"
              readonly
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="$auth.user.email"
              label="email"
              prepend-icon="mdi-email-outline"
              readonly
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {}
</script>

<style scoped></style>
