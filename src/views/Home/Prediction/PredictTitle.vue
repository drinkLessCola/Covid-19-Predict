<template>
    <div class="little_circle">
      <h2 class="title">最新预测</h2>
    </div>
   
</template>
  
  <script>
  export default {
    name: 'PredictTitle',
  }
  </script>

  <style>
    *{
        margin: 0;
        padding: 0;
    }
    .title{
        position: absolute;
        left: 20px;
        top: 7px;
        z-index: 101;
        width: 128px;
        height: 45px;
        font-size: 32px;
        font-family: PingFang SC-中等, PingFang SC;
        font-weight: normal;
        color: #3D3D3D;
        line-height: 45px;
    }

    .little_circle{
        position: relative;
        z-index: 100;
        width: 40px;
        height: 40px;
        border-radius:50%;  
        background: linear-gradient(180deg, #C6CFFF 0%, #E8D3FF 100%);
        opacity: 1;
    }
</style>