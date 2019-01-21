<template>
  <v-layout row wrap>
    <v-flex xs12 class="display-2 font-weight-medium">
      <p>Your ECG</p>
      <v-divider class="mb-4"></v-divider>
    </v-flex>
    <v-flex xs4>
      <v-card hover class="mt-3 mb-3">
        <v-container>
          <p class="title green--text text--darken-1">Connection</p>
          <v-layout row>
            <v-flex shrink>
              <v-img :src="images.wifi.src" width="32px" height="32px"></v-img>
            </v-flex>
            <v-flex grow class="ml-1">
              <!--REPLACE 62 WITH {BPM}-->
              <span class="grey--text text--darken-2 headline">Great</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
    <v-flex xs4>
      <v-card hover class="mt-3 mb-3">
        <v-container>
          <p class="title red--text text--darken-1">Heart Rate</p>
          <v-layout row>
            <v-flex shrink>
              <v-img :src="images.heart.src" width="32px" height="32px"></v-img>
            </v-flex>
            <v-flex grow class="ml-1">
              <!--REPLACE 62 WITH {BPM}-->
              <span class="headline">62&nbsp;</span>
              <span class="grey--text text--darken-2 title">BPM</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
    <v-flex xs4>
      <v-card hover class="mt-3 mb-3">
        <v-container>
          <p class="title light-blue--text text--darken-1">Pressure</p>
          <v-layout row>
            <v-flex shrink>
              <v-img :src="images.pressure.src" width="32px" height="32px"></v-img>
            </v-flex>
            <v-flex grow class="ml-2">
              <!--REPLACE 62 WITH {BPM}-->
              <span class="headline">
                122
                <span class="grey--text text--darken-2 title">/88</span>
              </span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card hover class="font-weight-medium headline text-xs-center">
        <v-card-text>Your ECG</v-card-text>
        <!--REPLACE 27/01/2005 WITH {ECG.DATE}-->
        <div id="chart" class="mx-4 my-4"></div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import BPMIndicator from "../indicators/BPMIndicator.vue";
import BloodPressureIndicator from "../indicators/BloodPressureIndicator.vue";
import Heart from "../shared/HeartIcon.vue";

export default {
  name: "CardioDiagram",
  components: {
    BPMIndicator: BPMIndicator,
    BloodPressureIndicator: BloodPressureIndicator,
    Heart: Heart
  },
  data() {
    return {
      images: {
        heart: { src: require("@/assets/heart.png") },
        pressure: { src: require("@/assets/pressure.png") },
        wifi: { src: require("@/assets/wifi.jpg") }
      }
    };
  }
};

var Graph = {
  max_y: 100,
  max_t: 100,
  interval: 75,
  totalDuration: 1000
};

var BeatCharacteristics = {
  //Voltage and time ranges of heartbeat periods P, Q, R, S, T
  p: {
    sign: 1,
    min_y: Graph.max_y * 0.05,
    max_y: Graph.max_y * 0.2,
    min_t: Graph.max_t * 0.12,
    max_t: Graph.max_t * 0.2
  },
  pq: {
    min_y: 0,
    max_y: 0,
    min_t: Graph.max_t * 0.05,
    max_t: Graph.max_t * 0.13
  },
  q: {
    sign: -1,
    min_y: Graph.max_y * 0.05,
    max_y: Graph.max_y * 0.2,
    min_t: Graph.max_t * 0.04,
    max_t: Graph.max_t * 0.08
  },
  r: {
    sign: 1,
    min_y: Graph.max_y * 0.5,
    max_y: Graph.max_y * 1,
    min_t: Graph.max_t * 0.1,
    max_t: Graph.max_t * 0.17
  },
  s: {
    sign: -1,
    min_y: Graph.max_y * 0.2,
    max_y: Graph.max_y * 0.5,
    min_t: Graph.max_t * 0.04,
    max_t: Graph.max_t * 0.08
  },
  st: {
    min_t: Graph.max_t * 0.1,
    max_t: Graph.max_t * 0.2
  },
  t: {
    sign: 1,
    min_y: Graph.max_y * 0.1,
    max_y: Graph.max_y * 0.3,
    min_t: Graph.max_t * 0.1,
    max_t: Graph.max_t * 0.14
  }
};

var Heartbeat = [];
var Cardiogram = [];

function randomValue(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function generateTimes() {
  Heartbeat.push({ t: 0 });
  var last_t = 0;

  for (var letter in BeatCharacteristics) {
    var period = BeatCharacteristics[letter];
    var duration = randomValue(period.min_t, period.max_t);

    if (letter != "pq" && letter != "st" && letter != "q" && letter != "s") {
      var peak_t = randomValue(0, duration);

      Heartbeat.push({
        t: last_t + peak_t
      });

      Heartbeat.push({
        t: last_t + duration
      });

      last_t += duration;
    } else {
      Heartbeat.push({
        t: last_t + duration
      });

      last_t += duration;
    }
  }
}

function generateVoltages() {
  var j = 0;
  var heartbeatPattern = [0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0];

  for (var i = 0; i < heartbeatPattern.length; i++) {
    if (heartbeatPattern[i]) {
      var period;
      var letter = Object.keys(BeatCharacteristics)[j];

      if (letter == "pq" || letter == "st") {
        j++;
      }

      letter = Object.keys(BeatCharacteristics)[j];
      period = BeatCharacteristics[letter];

      Heartbeat[i].y = period.sign * randomValue(period.min_y, period.max_y);

      j++;
    } else {
      Heartbeat[i].y = 0;
    }
  }
}

generateTimes();
generateVoltages();

function generateCardiogram(heartbeat) {
  var last_t = 0;
  var beats = 0;
  while (last_t <= Graph.totalDuration) {
    for (var i = 0; i < Heartbeat.length; i++) {
      var current_t = Heartbeat[i].t + beats * (Graph.max_t + Graph.interval);
      console.log(current_t);
      Cardiogram.push({
        y: Heartbeat[i].y,
        t: current_t
      });
      last_t = current_t;
    }

    beats++;
  }
}

generateCardiogram(Heartbeat);

var chart = new Taucharts.Chart({
  data: Cardiogram,
  type: "line",
  x: "t",
  y: "y",
  guide: {
    x: {
      label: { text: "Voltage", padding: 16 },
      min: 0,
      max: 1000,
      nice: false
    },
    y: {
      label: { text: "Time", padding: 16 },
      min: -100,
      max: 100,
      nice: false
    },
    showGridLines: "xy"
  }
});

document.onclick = function() {
  chart.renderTo("#chart");
};
</script>

<style>
</style>