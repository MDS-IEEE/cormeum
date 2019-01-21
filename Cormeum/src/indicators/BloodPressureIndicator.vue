<template>
  <v-card hover class="mt-3 ml-2 mb-3">
    <v-container>
      <p class="display-1 light-blue--text text--darken-1">Blood Pressure</p>
      <v-layout row>
        <v-flex shrink>
          <v-img :src="image.src" width="45px" height="45px"></v-img>
        </v-flex>
        <v-flex grow class="ml-2">
          <!--REPLACE 62 WITH {BPM}-->
          <span class="display-1">
            122
            <span class="grey--text text--darken-2 headline">/88 mmHg</span>
          </span>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import Pressure from "../shared/PressureIcon.vue";

export default {
  name: "BloodPressureIndicator",
  components: {
    Pressure: Pressure
  },
  data() {
    return {
      image: { src: require("@/assets/pressure.png") }
    };
  }
};
</script>

<style>
</style>