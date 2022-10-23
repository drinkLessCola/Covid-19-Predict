<template>
    <div class="Box">
        <div class="chart">
            预测图
            <!-- <img src="" alt=""> -->
            <div class="mask">
                <h3>深圳·20221015</h3>
                <h4>查看详情</h4>
                <div class="arrow">></div>
            </div>
        </div>
        <h3 class="location">深圳</h3>
        <h4 class="time">2022/10/15</h4>
        
    </div>
   
</template>
  
  <script>
  export default {
    name: 'HistoryPredict',
  }
  </script>

  <style>
    *{
        margin: 0;
        padding: 0;
    }
    .Box{
        position: relative;
        left: 20px;
        width: 400px;
        height: 374px;
        text-align: center;
        border-radius: 0px 0px 0px 0px;
        opacity: 1;
        /* background-color: yellow; */
    }


    .chart{
        position: relative;
        width: 400px;
        height: 300px;
        border-radius: 10px 10px 10px 10px;
        opacity: 1;
        border: 1px solid rgba(170,170,170,0.5);
        /* background-color: red; */
    }

    .chart img{
        width: 100%;
        height: 100%;
    }

    .mask{
        position: absolute;
        left: 0;
        top: 0;
        width: 400px;
        height: 300px;
        background: rgba(65,80,255,0.8);
        border-radius: 10px 10px 10px 10px;
        opacity: 0; 
    }

    .chart:hover .mask{
        opacity: 1;
    }


    .mask h3{
        position: absolute;
        top: 128px;
        bottom: 201px;
        left: 100px;
        width: 200px;
        height: 45px;
        font-size: 20px;
        /* font-family: PingFang SC-粗体, PingFang SC; */
        font-weight: normal;
        color: #fff;
        line-height: 45px;
    }
    
    .mask h4{
        position: absolute;
        top: 183px;
        left: 155px;
        width: 72px;
        height: 25px;
        font-size: 18px;
        /* font-family: PingFang SC-中等, PingFang SC; */
        font-weight: normal;
        color: #FFFFFF;
        line-height: 25px;
    }

    .arrow{
        position: absolute;
        top: 185px;              /*这里的位置调的感觉和原型图不太对，可能是position设置问题 或者是字体？？*/
        left: 237px;           
        width: 9px;
        height: 15px;
        color: #FFFFFF  ;
        opacity: 1;
    }
    
    .location{
        position: absolute;
        top: 310px;
        left: 10px;
        width: 48px;
        height: 34px;
        font-size: 24px;
        font-family: PingFang SC-中等, PingFang SC;
        font-weight: normal;
        color: #555555;
        line-height: 34px;
    }
    .time{
        position: absolute;
        left: 297px;
        top: 316px;
        width: 92px;
        height: 21px;
        font-size: 18px;
        font-family: Gilroy-Regular, Gilroy;
        font-weight: 400;
        color: #888888;
        line-height: 21px;
    }
</style>