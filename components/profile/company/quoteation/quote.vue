<template>
  <v-container>
    <v-row>
      <v-tabs vertical background-color="#eeeeee">
        <v-tab>
          <v-icon left>mdi-arrow-top-right-thick</v-icon>
          Sent Quote
        </v-tab>
        <v-tab>
          <v-icon left>mdi-arrow-bottom-left-thick</v-icon>
          Received Quote
        </v-tab>
        <v-tab-item>
          <v-container>
            <v-row>
              <v-col v-for="i in 9" :key="i" cols="12" md="4">
                <v-card>
                  <v-card-title>
                    <span class="title font-weight-light">Twitter</span>
                  </v-card-title>

                  <v-card-text class="font-weight-bold">
                    "Turns out semicolon-less style is easier and safer in TS
                    because most gotcha edge cases are type invalid as well."
                  </v-card-text>

                  <v-card-actions>
                    <v-list-item class="grow">
                      <v-list-item-avatar color="grey darken-3">
                        <!--                        <v-img-->
                        <!--                          class="elevation-6"-->
                        <!--                          alt=""-->
                        <!--                          src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"-->
                        <!--                        ></v-img>-->
                        <v-icon>mdi-account-group-outline</v-icon>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>to multi</v-list-item-title>
                      </v-list-item-content>

                      <v-row align="center" justify="end">
                        <v-icon class="mr-1">mdi-paperclip</v-icon>
                        <span class="subheading mr-2">256</span>
                        <span class="mr-1">·</span>
                        <v-icon class="mr-1"> mdi-share-variant </v-icon>
                        <span class="subheading">45</span>
                      </v-row>
                    </v-list-item>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-row>
  </v-container>
</template>

<script>
export default {}
</script>

<style scoped></style>
