<template>
  <div id="ecg-display"></div>
</template>

<script>
export default {
  name: "ECGDisplay",
  data() {
    return {
      Graph: {
        max_y: 100,
        max_t: 100,
        interval: 75,
        totalDuration: 1000
      },
      Heartbeat: [],
      Cardiogram: []
    };
  },
  computed: {
    randomValue: function(min, max) {
      return Math.floor(Math.random() * max) + min;
    },
    BeatCharacteristics: function() {
      return {
        //Voltage and time ranges of heartbeat periods P, Q, R, S, T
        p: {
          sign: 1,
          min_y: this.Graph.max_y * 0.05,
          max_y: this.Graph.max_y * 0.2,
          min_t: this.Graph.max_t * 0.12,
          max_t: this.Graph.max_t * 0.2
        },
        pq: {
          min_y: 0,
          max_y: 0,
          min_t: this.Graph.max_t * 0.05,
          max_t: this.Graph.max_t * 0.13
        },
        q: {
          sign: -1,
          min_y: this.Graph.max_y * 0.05,
          max_y: this.Graph.max_y * 0.2,
          min_t: this.Graph.max_t * 0.04,
          max_t: this.Graph.max_t * 0.08
        },
        r: {
          sign: 1,
          min_y: this.Graph.max_y * 0.5,
          max_y: this.Graph.max_y * 1,
          min_t: this.Graph.max_t * 0.1,
          max_t: this.Graph.max_t * 0.17
        },
        s: {
          sign: -1,
          min_y: this.Graph.max_y * 0.2,
          max_y: this.Graph.max_y * 0.5,
          min_t: this.Graph.max_t * 0.04,
          max_t: this.Graph.max_t * 0.08
        },
        st: {
          min_t: this.Graph.max_t * 0.1,
          max_t: this.Graph.max_t * 0.2
        },
        t: {
          sign: 1,
          min_y: this.Graph.max_y * 0.1,
          max_y: this.Graph.max_y * 0.3,
          min_t: this.Graph.max_t * 0.1,
          max_t: this.Graph.max_t * 0.14
        }
      };
    },
    Times() {
      this.Heartbeat.push({ t: 0 });
      var last_t = 0;

      for (var letter in this.BeatCharacteristics) {
        var period = this.BeatCharacteristics[letter];
        var duration = this.randomValue(period.min_t, period.max_t);

        if (
          letter != "pq" &&
          letter != "st" &&
          letter != "q" &&
          letter != "s"
        ) {
          var peak_t = this.randomValue(0, duration);

          this.Heartbeat.push({
            t: last_t + peak_t
          });

          this.Heartbeat.push({
            t: last_t + duration
          });

          last_t += duration;
        } else {
          this.Heartbeat.push({
            t: last_t + duration
          });

          last_t += duration;
        }
      }
    },
    Voltages() {
      var j = 0;
      var heartbeatPattern = [0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0];

      for (var i = 0; i < heartbeatPattern.length; i++) {
        if (heartbeatPattern[i]) {
          var period;
          var letter = Object.keys(this.BeatCharacteristics)[j];

          if (letter == "pq" || letter == "st") {
            j++;
          }

          letter = Object.keys(this.BeatCharacteristics)[j];
          period = this.BeatCharacteristics[letter];

          this.Heartbeat[i].y =
            period.sign * this.randomValue(period.min_y, period.max_y);

          j++;
        } else {
          this.Heartbeat[i].y = 0;
        }
      }
    },
    Cardiogram(heartbeat) {
      var last_t = 0;
      var beats = 0;
      while (last_t <= this.Graph.totalDuration) {
        for (var i = 0; i < this.Heartbeat.length; i++) {
          var current_t =
            this.Heartbeat[i].t +
            beats * (this.Graph.max_t + this.Graph.interval);
          this.Cardiogram.push({
            y: this.Heartbeat[i].y,
            t: current_t
          });
          last_t = current_t;
        }

        beats++;
      }
    },
    Chart() {
      return new Taucharts.Chart({
        data: Cardiogram,
        type: "line",
        x: "t",
        y: "y",
        guide: {
          x: {
            label: { text: "Time", padding: 16 },
            min: 0,
            max: 1000,
            nice: false
          },
          y: {
            label: { text: "Voltage" },
            min: -100,
            max: 100,
            nice: false
          },
          showGridLines: "xy"
        }
      });
    }
  }
};
</script>

<style>
</style>