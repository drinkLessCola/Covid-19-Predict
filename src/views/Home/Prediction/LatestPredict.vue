<template>
    <div>
        <div class="latestContainer">
            <div class="infoBox">
                <div class="latestChart">图片</div>
                    <div class="latestInfo">
                        <div class="infoSquare">
                            <ul class="locBox">
                                <li class="locIcon"></li>
                                <li class="locName">广州</li>
                                <li class="arrow"></li>
                            </ul>
                                
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
                    </div>
            </div>
        </div>
    </div>
</template>
  
  <script>
  export default {
    name: 'LatestPredict',
  }
  </script>

  <style>
    *{
        margin: 0;
        padding: 0;
    }
    li{
        list-style: none;
    }
    .latestContainer{
        display: flex;
        width: 1453px;
        height: 400px;
        /* background: blue; */
    }
    .infoBox{
        display: flex;
        justify-content: space-between;
        margin-left: 20px;
        width: 1200px;
        height: 400px;
        border-radius: 10px 10px 10px 10px;
        opacity: 1;
        border: 1px solid rgba(170,170,170,0.5);
        /* background-color: green; */
    }
    .latestChart{
        width: 1200px;
        height: 400px;
        border-radius: 10px 10px 10px 10px;
        opacity: 1;
        border: 1px solid rgba(170,170,170,0.5);
        /* background-color: yellow; */
    }
    .latestInfo{
        flex-shrink: 0;
        width: 400px;
        height: 400px;
        background: linear-gradient(227deg, #C6CFFF 0%, #E8D3FF 100%);
        border-radius: 0px 10px 10px 0px;
        opacity: 1;
    }
    .infoSquare{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 28px;
        width: 344px;
        height: 344px;
        /* background-color: yellowGreen; */
    }
    .locBox{
        display: flex;
        /* flex-direction: row; */
        /* justify-content: space-between; */
        width: 344px;
        height: 40px;
        /* background-color: #652; */
    }
    .locName{
        flex: 1 1 auto;
        width: 80px;
        height: 40px;
        margin-left: 10px;
        font-size: 40px;
        font-family: PingFang SC Bold;
        font-weight: normal;
        color: #333333;
        line-height: 40px;
        /* background-color: yellow; */
    }
    .locIcon{
        margin-top:2px;
        margin-left: 2px;
        width: 36px;
        height: 36px;
        background: #000000;
        opacity: 1;
    }
    .arrow{
        margin-right: 25px;
        width: 40px;
        height: 40px;
        background: #000000;
        opacity: 1;
    }
    .time{
        flex: 1 1 auto;
        width: 165px;
        height: 25px;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: normal;
        color: #555555;
        /* background-color: red; */
        line-height: 25px;
    }
    .info{
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
        margin-top: 10px;
        width: 296px;
        height: 88px;
        font-size: 24px;
        font-weight: normal;
        color: #000000;
        line-height: 44px;
    }
    
</style>