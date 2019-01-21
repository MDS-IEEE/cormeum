<template>
  <v-card hover class="mt-3 mr-2 mb-3">
    <v-container>
      <p class="display-1 red--text text--darken-1">Heart Rate</p>
      <v-layout row>
        <v-flex shrink>
          <v-img :src="image.src" width="45px" height="45px"></v-img>
        </v-flex>
        <v-flex grow class="ml-2">
          <!--REPLACE 62 WITH {BPM}-->
          <span class="display-1">62&nbsp;</span>
          <span class="grey--text text--darken-2 headline">BPM</span>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import Heart from "../shared/HeartIcon.vue";

export default {
  name: "BPMIndicator",
  components: {
    Heart: Heart
  },
  data() {
    return {
      image: { src: require("@/assets/heart.png") }
    };
  }
};
</script>

<style>
</style>