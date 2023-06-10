<template>
  <div class="literatureContainer">
    <SubHeading title="参考文献"></SubHeading>
    <section class="literatures">
      <el-link
        v-for="{ id, title, url, index }, idx in sortedLiteratures"
        :key="id"
        :href="url"
        class="literature-link"
      >
        <span>[{{ index }}]</span>
        <span>{{ title }}</span>      
      </el-link>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { getLiteratureList } from '@/api/literature';
import SubHeading from '@/components/SubHeading.vue';
import { computed } from 'vue';


interface ILiterature {
  id: number
  index: string
  title: string
  url: string
}
const literatures = (await getLiteratureList()) as unknown as ILiterature[]
const sortedLiteratures = computed(() => {
  literatures.sort((a, b) => Number(a.index) - Number(b.index))
  console.log('literatures', literatures)
  return literatures
})
</script>

<style lang="scss">
.literatureContainer {
  width: 100%;
  display: flex; 
  flex-direction: column; 
  align-items: flex-start;
  box-sizing: border-box;
  padding: 0 100px;
}
.literatures {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .literature-link {
    margin: 10px;
    font-size: 16px;
  }
}
</style>