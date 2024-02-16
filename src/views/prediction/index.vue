<template>
  <div class="icons-container">
  <aside><i class="el-icon-info"></i> {{ $t('predpage.intro') }} <a :href="refSrc" target="_blank" style="text-decoration: underline;">{{ $t('global.reference') }}</a></aside>
  <el-button class="tutorial_btn" type="warning" icon="el-icon-guide"  @click.prevent.stop="guide">{{ $t('global.guide') }}</el-button>
    <aside id="parameter-panel">
      <h3>{{$t('global.parameterSetting')}}</h3>
  <div style="display:flex; align-items: center; margin-bottom: 10px;">
    <span>Model Path: </span>
    <el-select v-model="modelPath" style="margin-left: 10px; margin-right:20px;">
      <el-tooltip class="item" effect="dark" content="path: silas-temp/results/model" placement="right-start">
        <el-option value="silas-temp/results/model" label="Trained model">
        </el-option>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="path: silas-temp/validation-results/model" placement="right-start">
        <el-option value="silas-temp/validation-results/model" label="Validated model">
        </el-option>
      </el-tooltip>
    </el-select>
  
    <!-- <span>{{$t('global.unlabeledFile')}}:</span> -->
    <el-upload class="upload-demo" :data="{'fileName':'unlabeled.csv'}"
    action="http://127.0.0.1:3333/SilasGUI/uploadFile" :file-list="fileList" :limit="1" accept=".csv"
    :on-success="handleSuccess" :on-remove="handleRemove" style="margin-left: 10px;">
    <el-button size="small" type="primary" v-if="!canClick"><i class="el-icon-upload"></i> {{$t('global.unlabeledFile')}}</el-button>
    <el-button size="small" type="primary" v-else slot='tip' disabled ><i class="el-icon-upload"></i> {{$t('global.unlabeledFile')}}</el-button>
    <!-- <div slot="tip" class="el-upload__tip">最多可上传5个，文件大小不超过50MB</div> -->
   </el-upload>
   <el-button style="margin-left: 30px;" @click="startPrediction" type="success" plain>{{$t('global.prediction')}}</el-button>
  </div>
  </aside>
  <el-divider></el-divider>
  <div id="predRes" class="result-container" v-loading="showLoading" element-loading-background="rgba(0, 0, 0, 0.2)">
    <h3>{{$t('global.predictionRes')}}</h3>
    <div class="prediction-res">
      <Empty v-if="list.length==0"/>
      <!-- <el-button size="mini" style="position: absolute; right: 40px;"><i class="el-icon-download"></i> Download</el-button> -->
      <div v-for="(item,index) in list" :key="index" v-html="item"></div>
    </div>

  </div>
    
  </div>
</template>

<script>
import { prediction, getPredRes } from '@/api/silas'
import  Empty from '@/components/Empty';
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
// import steps from './steps'
import getSteps from './steps';

export default {
  components: {
    Empty
  },
  name: 'Prediction',
  data() {
    return {
      modelPath:'silas-temp/results/model',
      list:[],
      showLoading:false,
      canClick:false,
      fileList:[],
    }
  },
  mounted(){
    this.driver = new Driver()
  },
  computed:{
    language() {
        return this.$store.getters.language
      },
    refSrc() {
      // 根据 currentLang 返回对应的文档 URL
      return this.language === 'zh'
        ? 'https://depintel.com/documentation/v087_chinese/_build/html/usage/learning/predict.html'
        : 'https://depintel.com/documentation/v087/_build/html/usage/learning/predict.html';
    },
  },
  methods: {
    guide() {
      const steps = getSteps(this.$i18n); // 获取当前语言的步骤
      this.driver.defineSteps(steps)
      this.driver.start()
    },
    uploadeUnlabeled(){
        document.getElementById("unlabelledfile").click()
      },
      handleSuccess(res, file, fileList) {
        console.info(fileList, res, file, "fileList")
        this.canClick = true
      },
      handleRemove(){
        this.canClick = false
      },
    
    startPrediction(){
      let that = this
      let type = 'train'

      this.showLoading = true
      
      if (this.modelPath =='silas-temp/validation-results/model'){
          type = 'validation'
        }
      prediction({ "model_path": that.modelPath}).then((res)=>{
        console.log(res)
        this.getPredictionRes()
      })
    },
    getPredictionRes(){
        let that = this
        let type = 'train'

        this.showLoading = true
        if (this.modelPath =='silas-temp/validation-results/model'){
          type = 'validation'
        }
        getPredRes({'type':type}).then((res)=>{
          that.list = res.final_list
          that.showLoading = false
        })
    
      },
  }
}
</script>

<style lang="scss" scoped>

.tutorial_btn{
  position: fixed;
  right: 0;
  font-size: 14px;
  z-index: 999;
  height: 48px;
}
.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;

  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .icon-item {
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }

  .result-container{
    text-align: center;
    min-height: 200px;
  }
}
</style>
