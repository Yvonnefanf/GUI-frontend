<template>
  <div class="app-container documentation-container">
    <iframe style="width: 100%; height: calc(100vh - 100px);" :src=docSrc ></iframe>
    
  </div>
</template>

<script>
const ZH_DOC_SRC = 'https://depintel.com/documentation/v087_chinese/_build/html/index.html'
const EN_DOC_SRC = 'https://depintel.com/documentation/v087/_build/html/usage/learning/silas_ml.html'
import DropdownMenu from '@/components/Share/DropdownMenu'

export default {
  name: 'Documentation',
  components: { DropdownMenu },
  data() {
    return {
    }
  },
  computed:{
    language() {
        return this.$store.getters.language
      },
    docSrc() {
      // 根据 currentLang 返回对应的文档 URL
      return this.language === 'zh'
        ? ZH_DOC_SRC
        : EN_DOC_SRC;
    },
  }
}
</script>

<style lang="scss" scoped>
.documentation-container {
  margin: 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .document-btn {
    flex-shrink: 0;
    display: block;
    cursor: pointer;
    background: black;
    color: white;
    height: 60px;
    padding: 0 16px;
    margin: 16px;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
  }
}
</style>
