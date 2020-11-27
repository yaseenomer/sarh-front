<template>
  <v-container>
    <v-row>
      <v-tabs vertical>
        <v-tab>
          <v-icon left>mdi-tag-multiple-outline</v-icon>
          activity
        </v-tab>
        <v-tab>
          <v-icon left>mdi-information-variant</v-icon>
          info
        </v-tab>
        <v-tab>
          <v-icon left>mdi-map-marker-multiple-outline</v-icon>
          address
        </v-tab>
        <v-tab>
          <v-icon left>mdi-license</v-icon>
          license
        </v-tab>
        <v-tab>
          <v-icon left>mdi-map-marker-radius-outline</v-icon>
          map
        </v-tab>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <p>
                Sed aliquam ultrices mauris. Donec posuere vulputate arcu. Morbi
                ac felis. Etiam feugiat lorem non metus. Sed a libero.
              </p>

              <p>
                Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel,
                lacus. Aenean tellus metus, bibendum sed, posuere ac, mattis
                non, nunc. Aliquam lobortis. Aliquam lobortis. Suspendisse non
                nisl sit amet velit hendrerit rutrum.
              </p>

              <p class="mb-0">
                Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu.
                Pellentesque libero tortor, tincidunt et, tincidunt eget, semper
                nec, quam. Phasellus blandit leo ut odio.
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-row>
  </v-container>
</template>

<script>
export default {}
</script>

<style scoped></style>
