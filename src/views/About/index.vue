<template>
  <div class="aboutContainer">
    <SubHeading title="简介"></SubHeading>
    <section class="about-block">
      {{ brief }}
    </section>
    
    <SubHeading title="人员组成"></SubHeading>
    <section class="about-block">
      {{ composition }}
    </section>

    <SubHeading title="联系我们"></SubHeading>
    <section class="about-block">
      {{ phone }}
    </section>
  </div>
</template>

<script lang="ts" setup>
import { getAboutInfo } from '@/api/about';
import SubHeading from '@/components/SubHeading.vue';
import { computed } from 'vue';


interface ILiterature {
  id: number
  index: string
  title: string
  url: string
}
const aboutInfo = await getAboutInfo()
const brief = computed(() => aboutInfo.brief)
const composition = computed(() => aboutInfo.composition)
const phone = computed(() => aboutInfo.phone)
</script>

<style lang="scss">
.aboutContainer {
  width: 100%;
  display: flex; 
  flex-direction: column; 
  align-items: flex-start;
  box-sizing: border-box;
  padding: 0 100px;
}
.abouts {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .about-link {
    margin: 10px;
    font-size: 16px;
  }
}
</style>