<template>
  <div class="diagram">
    <div class="indicators">
      <div class="connection-indicator">
        <img class="connection-status">
        <p class="label connection-label">Connection</p>
      </div>
      <BPMIndicator/>
      <BloodPressureIndicator/>
    </div>
    <ECGDisplay :size="ecgDiagramSize"/>
    <div class="timer">
      <div class="timer-bar">
        <div class="timer-bar-passed"></div>
        <div class="timer-bar-total"></div>
      </div>
      <p class="timer-numeric">30s</p>
      <!--REPLACE 30s WITH {TIME_LEFT}-->
    </div>
  </div>
</template>

<script>
import BPMIndicator from "../indicators/BPMIndicator.vue";
import BloodPressureIndicator from "../indicators/BloodPressureIndicator.vue";
import ECGDisplay from "../shared/ECGDisplay.vue";

export default {
  name: "CardioDiagram",
  components: {
    BPMIndicator: BPMIndicator,
    BloodPressureIndicator: BloodPressureIndicator,
    ECGDisplay: ECGDisplay
  }
};
</script>

<style>
</style>