var Graph = {
  max_y: 100,
  max_t: 100
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
    min_y: Graph.max_y * 0.2,
    max_y: Graph.max_y * 0.5,
    min_t: Graph.max_t * 0.1,
    max_t: Graph.max_t * 0.14
  }
};

var Heartbeat = [];

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
