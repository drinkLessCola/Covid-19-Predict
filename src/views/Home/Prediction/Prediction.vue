<template>
  <div>
    <div class="theBiggestBox">
      <PredictTitle />
      <LatestPredict style="margin-top:19px"></LatestPredict>
      <PredictTitle style="margin-top:25px"></PredictTitle>

      <div class="H-PredictBox">
        <HistoryPredict></HistoryPredict>
        <HistoryPredict></HistoryPredict>
        <HistoryPredict></HistoryPredict>
      </div>
    </div>
  </div>
</template>
  
<script>
import LatestPredict from './LatestPredict'
import PredictTitle from './PredictTitle'
import HistoryPredict from './HistoryPredict'

export default {
  name: "Prediction",
  components: {
    LatestPredict,
    HistoryPredict,
    PredictTitle
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.theBiggestBox {
  display: flex;
  flex-direction: column;
  width: 1453px;
  height: 923px;
  border: 1px solid rgba(170, 170, 170, 0.5);
  /* background-color: #c9d2d7; */
}

.H-PredictBox {
  display: flex;
  justify-content: space-between;
  margin-top: 19px;
  margin-left: 20px;
  width: 1308px;
  height: 374px;
  /* background-color: yellowGreen; */
}
</style>