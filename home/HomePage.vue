<template>
  <v-layout row wrap class="home">
    <v-flex xs12 class="display-2 font-weight-medium">
      <p>Your heart</p>
      <v-divider class="mb-4"></v-divider>
    </v-flex>
    <v-flex xs12>
      <v-card hover dark color="green">
        <v-card-text class="headline text-xs-center">
          General condition:
          <span class="font-weight-black text-uppercase">Normal</span>
        </v-card-text>
        <!--REPLACE NORMAL WITH {CONDITION}-->
      </v-card>
    </v-flex>
    <v-flex xs12 sm6>
      <BPMIndicator/>
    </v-flex>
    <v-flex xs12 sm6>
      <BloodPressureIndicator/>
    </v-flex>

    <v-flex xs12>
      <v-card hover class="font-weight-medium headline text-xs-center">
        <v-card-text>
          Previous ECG&nbsp;
          <span class="grey--text title text-xs-right">27/01/2005</span>
        </v-card-text>
        <!--REPLACE 27/01/2005 WITH {ECG.DATE}-->
        <div id="chart" class="mx-4 my-4"></div>
        <v-btn dark large color="blue" id="button" class="font-weight-black mb-4">
          <router-link :to="{ name: 'CardioDiagram' }">Take a new ECG</router-link>
        </v-btn>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import BPMIndicator from "../indicators/BPMIndicator.vue";
import BloodPressureIndicator from "../indicators/BloodPressureIndicator.vue";
import ECGDisplay from "../shared/ECGDisplay.vue";

export default {
  name: "HomePage",
  components: {
    BPMIndicator: BPMIndicator,
    BloodPressureIndicator: BloodPressureIndicator,
    ECGDisplay: ECGDisplay
  },
  data() {
    return {
      image: {
        src: require("@/assets/heartrate.png")
      }
    };
  }
};
</script>

<style>
.home {
  max-width: 960px;
  margin: 0 auto;
}
</style>