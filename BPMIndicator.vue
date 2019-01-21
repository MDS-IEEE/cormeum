<template>
  <v-card hover class="mt-3 mb-3">
    <v-container>
      <p class="display-1 red--text text--darken-1">Heart Rate</p>
      <v-layout row>
        <v-flex shrink>
          <v-img :src="image.src" width="45px" height="45px"></v-img>
        </v-flex>
        <v-flex grow class="ml-2">
          <!--REPLACE 62 WITH {BPM}-->
          <span id="bpm" class="display-1">62&nbsp;</span>
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

var frequency = function(
  maxFrequency,
  milliseconds,
  updateFrequency,
  callback
) {
  var timeTotal = 0;
  var clickTimes = [];
  var numberOfMilliseconds = milliseconds;

  document.addEventListener("click", function() {
    var currentTime = new Date().getTime(); //get time in ms

    //add the current time to the array and the counter
    timeTotal += currentTime;
    clickTimes.push(currentTime);
  });

  setInterval(function() {
    var currentTime = new Date().getTime(); //get time in ms

    //remove any items that occurred more than milliseconds limit ago
    while (clickTimes.length && currentTime - clickTimes[0] > milliseconds) {
      timeTotal -= clickTimes.shift();
    }

    if (clickTimes.length > 0) {
      numberOfMilliseconds = clickTimes[clickTimes.length - 1] - clickTimes[0];
    } else {
      numberOfMilliseconds = milliseconds;
    }

    callback(
      numberOfMilliseconds,
      clickTimes.length,
      ((clickTimes.length * 100) / maxFrequency).toFixed(0)
    );
  }, updateFrequency);
};

frequency(10, 60000, 100, function(
  milliseconds,
  numberOfClicks,
  targetPercentage
) {
  document.getElementById("bpm").innerHTML = Math.floor(
    (numberOfClicks / (milliseconds / 1000)) * 60
  );
});
</script>

<style>
</style>