<template>
    <div class="Box">
        <div class="latestChart"> </div>
        <div class="infoBox"></div>
        <div class="locName">广州</div>
        <div class="locIcon"></div>
        <div class="arrow"></div>
        <div class="time">预测于 2022/10/18</div>
        <div class="info">
            <span class="split1">预测将于</span><br>
            <span class="split2">10.24</span> <span class="split3">新增感染&lt;10人</span>
        </div>
        <div class="endInfo">
            <span class="split1">预测将于</span><br>
            <span class="split2">11.03</span> <span class="split3">结束</span>
        </div>
    </div>
   
</template>
  
  <script>
  export default {
    name: 'LastestPredict',
  }
  </script>

  <style>
    li{
        list-style: none;
    }
    *{
        margin: 0;
        padding: 0;
    }
    .Box{
        position: relative;
        width: 1453px;
        height: 923px;
        border-radius: 0px 0px 0px 0px;
        opacity: 1;
        /* background-color: red; */
    }
    .latestChart{
        position: absolute;
        left: 20px;
        top: 72px;
        width: 1200px;
        height: 400px;
        border-radius: 10px 10px 10px 10px;
        opacity: 1;
        border: 1px solid rgba(170,170,170,0.5);
        /* background-color: yellow; */
    }
    .infoBox{
        position: absolute;
        left: 820px;
        top: 72px;
        width: 400px;
        height: 400px;
        background: linear-gradient(227deg, #C6CFFF 0%, #E8D3FF 100%);
        border-radius: 0px 10px 10px 0px;
        opacity: 1;
    }
    .locName{
        position: absolute;
        top: 100px;
        left: 896px;
        width: 80px;
        height: 40px;
        font-size: 40px;
        font-family: PingFang SC-粗体, PingFang SC;
        font-weight: normal;
        color: #333333;
        line-height: 40px;
    }
    .locIcon{
        position: absolute;
        left: 856px;
        top: 105px;
        width: 25px;
        height: 30px;
        background: #000000;
        opacity: 1;
    }
    .arrow{
        position: absolute;
        left: 1166px;
        top: 105px;
        width: 18px;
        height: 30px;
        background: #000000;
        opacity: 1;
    }
    .time{
        position: absolute;
        left: 850px;
        top: 148px;
        width: 165px;
        height: 25px;
        font-size: 18px;
        font-family: PingFang SC-中等, PingFang SC;
        font-weight: normal;
        color: #555555;
        line-height: 25px;
    }
    .info{
        position: absolute;
        top: 271px;
        left: 850px;
        width: 296px;
        height: 88px;
        font-size: 24px;
        font-weight: normal;
        color: #000000;
        line-height: 44px;
    }
    .split1{
        font-size: 24px;
        font-weight: bold;
        font-family: Gilroy-Bold;
        color: #000000;
        height: 44px;
    }
    .split2{
        font-size: 42px;
        font-weight: bold;
        font-family: D-DIN-Bold;
        color: #5438F5;
        height: 44px;
    }
    .split3{
        font-size: 24px;
        font-weight: bold;
        font-family: Gilroy-Bold;
        color: #000000;
        height: 44px;
    }
    .endInfo{
        position: absolute;
        top: 369px;
        left: 850px;
        width: 296px;
        height: 88px;
        font-size: 24px;
        font-weight: normal;
        color: #000000;
        line-height: 44px;
    }
    
</style>