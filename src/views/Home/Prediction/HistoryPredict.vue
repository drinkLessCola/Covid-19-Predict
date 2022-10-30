<template>
  <div>
    <div class="H-Box">
      <div class="chart">
        <!-- <img src="" alt=""> -->
        <div class="maskBox">
          <div style="opacity:0;width: 400px;height: 300px;"></div>
            <div class="mask">
              <h3>深圳·20221015</h3>
              <div class="linkBox">
                <h4>查看详情</h4>
                <div class="H-arrow">></div>
              </div>
            </div>          
        </div>
      </div>
      <div class="H-infoBox">
        <div class="H-location">深圳</div>
        <div class="H-time">2022/10/15</div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'HistoryPredict',
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.H-Box {
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 374px;
  text-align: center;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  /* background-color: yellow; */
}


.chart {
  width: 400px;
  height: 300px;
  border-radius: 10px 10px 10px 10px;
  opacity: 1;
  border: 1px solid rgba(170, 170, 170, 0.5);
  /* background-color: red; */
  overflow: hidden;
}

.chart img {
  width: 100%;
  height: 100%;
}

.maskBox {
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 600px;
  opacity: 0;
  transition: all 0.4s;
}

.mask {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 300px;
  background: rgba(65, 80, 255, 0.8);
  border-radius: 10px 10px 10px 10px;
}

.chart:hover .maskBox {
  margin-top: -300px;
  opacity: 1;
}

.H-infoBox {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 34px;
  /* background-color: green; */
}


.mask h3 {
  /* width: 200px; */
  height: 45px;
  font-size: 32px;
  font-family: PingFang SC Bold;
  font-weight: normal;
  color: #fff;
  line-height: 45px;
  /* background-color: #982; */
}

.mask h4 {
  width: 72px;
  height: 25px;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: normal;
  color: #FFFFFF;
  line-height: 25px;
  /* background-color: #856; */
}

.linkBox {
  height: 25px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.H-arrow {
  margin-left: 10px;
  /* width: 9px;
        height: 15px; */
  color: #FFFFFF;
  opacity: 1;
}

.H-location {
  margin-left: 10px;
  width: 48px;
  height: 34px;
  font-size: 24px;
  font-family: PingFang SC;
  font-weight: normal;
  color: #555555;
  line-height: 34px;
  /* background-color: blue; */
}

.H-time {
  margin-right: 11px;
  height: 21px;
  font-size: 18px;
  font-family: Gilroy;
  font-weight: 400;
  color: #888888;
  line-height: 21px;
  /* background-color: blueViolet; */
}
</style>