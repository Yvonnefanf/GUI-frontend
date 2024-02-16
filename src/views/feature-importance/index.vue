<template>
    <div style="margin: 20px;">
        <aside><i class="el-icon-info"></i> {{ $t('featurepage.intro') }} <a href="https://github.com/Yunkun-Zhang/MUC-Silas"  target="_blank" style="text-decoration: underline;" >{{ $t('global.sourcecode') }}</a></aside>
        <el-button class="tutorial_btn" type="warning" icon="el-icon-guide"  @click.prevent.stop="guide">{{ $t('global.guide') }}</el-button>
        <div class="feature-importance-page">
        <div class="feature-importance" style="width: 48%;">
            <el-card id="featureImportanceSetting">
                <h3>{{$t('global.parameterSetting')}}</h3>
                <el-divider/>

                <el-form class="model-explanaton-form" label-width="150px" style="margin-bottom: 50px;">
                    <div style="display:flex; justify-content: space-around;" id="featureImportanceUpload">
                    <el-form-item label="Model Path:">
                      <el-select v-model="modelPath">
                        <el-tooltip class="item" effect="dark" content="path: silas-temp/results/model" placement="right-start">
                          <el-option value="silas-temp/results/model" label="Trained model">
                          </el-option>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="path: silas-temp/validation-results/model" placement="right-start">
                          <el-option value="silas-temp/validation-results/model" label="Validated model">
                          </el-option>
                        </el-tooltip>
      
                        <el-tooltip class="item" effect="dark" content="path: OptExplain/optexplain-example/models" placement="right-start">
                        <el-option value="OptExplain/optexplain-example/models" label="Example model">
                        </el-option>
                        </el-tooltip>
                      </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('global.testingFile')+': ' ">
                      <!-- <el-input v-model="testFilePath"></el-input> -->
                      <el-upload class="upload-demo" style="text-align:left;" :data="{'fileName':'featureImportance_test.csv'}"
                      action="http://127.0.0.1:3333/SilasGUI/uploadFile" :file-list="fileList" :limit="1" accept=".csv"
                      :on-success="handleSuccess" :on-remove="handleRemove">
                      <el-button size="small" type="primary" v-if="!canFeaClick"><i class="el-icon-upload"></i> {{ $t('global.testingFile') }}</el-button>
                      <el-button size="small" type="primary" v-else slot='tip' disabled><i class="el-icon-upload"></i> {{ $t('global.testingFile') }}</el-button>
                      <!-- <div slot="tip" class="el-upload__tip">最多可上传5个，文件大小不超过50MB</div> -->
                     </el-upload>
                    </el-form-item>
                    </div>
                    <!-- <el-sdivider dashed></el-divider> -->
                    <el-button class="feature-im-btn" @click="explaination('feature')" style="float: right; " id="featureImportance">{{ $t('featurepage.featureimportancetitle') }}
                    </el-button >
                    <!-- <el-button style="width:100%" type="primary" @click="explaination('feature')">Feature Importance
                    </el-button> -->
                  </el-form>
                </el-card>  
            <div style="margin-top: 30px; text-align:center;" id="featureImportanceRes" v-loading="showLoading"> 
            
            <h3>{{ $t('global.result') }}</h3>
            <el-divider></el-divider>
            <div style="height: calc(100vh - 360px); overflow: auto;">
                <el-table class="sub-table" :data="featureImportanceList">
                  <el-table-column type="expand">
                    <template slot-scope="scope">
                      <el-table :data="scope.row.details">
                        <el-table-column label="Feature Name" prop="name">
                        </el-table-column>
                        <el-table-column label="Importantce Value" prop="value">
                        </el-table-column>
                      </el-table>
  
                    </template>
                  </el-table-column>
                  <el-table-column label="Class Name" prop="class">
                  </el-table-column>
                  <el-table-column label="Sub Feature Number" prop="sublenght">
                  </el-table-column>
  
                </el-table>
              </div>
        </div>
    </div>
        <el-divider direction="vertical" style=" margin-left: 30px; height: calc(100vh - 200px);"></el-divider>
        <div class="adversary-sample" style="width: 48%; margin-left: 20px;">
      <el-card id="advSampleSetting">
                <h3>{{$t('global.parameterSetting')}}</h3>
                <el-divider/>
                <el-form class="model-explanaton-form" label-width="150px" style="margin-bottom: 50px;">
                    <div style="display:flex; justify-content: space-around;" id="advSampleUpload">
                    <el-form-item label="Model Path:">
                      <el-select v-model="modelPath_for_adv">
                        <el-tooltip class="item" effect="dark" content="path: silas-temp/results/model" placement="right-start">
                          <el-option value="silas-temp/results/model" label="Trained model">
                          </el-option>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="path: silas-temp/validation-results/model" placement="right-start">
                          <el-option value="silas-temp/validation-results/model" label="Validated model">
                          </el-option>
                        </el-tooltip>
      
                        <el-tooltip class="item" effect="dark" content="path: OptExplain/optexplain-example/models" placement="right-start">
                        <el-option value="OptExplain/optexplain-example/models" label="Example model">
                        </el-option>
                        </el-tooltip>
                      </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('global.testingFile')+': '">
                      <el-upload class="upload-demo" style="text-align:left;" :data="{'fileName':'adversial_test.csv'}"
                      action="http://127.0.0.1:3333/SilasGUI/uploadFile" :file-list="fileList" :limit="1" accept=".csv"
                      :on-success="handleAdvSuccess" :on-remove="handleAdvRemove">
                      <el-button size="small" type="primary" v-if="!canAdvClick"><i class="el-icon-upload"></i> {{ $t('global.testingFile') }}</el-button>
                      <el-button size="small" type="primary" v-else slot='tip' disabled><i class="el-icon-upload"></i> {{ $t('global.testingFile') }}</el-button>
                      <!-- <div slot="tip" class="el-upload__tip">最多可上传5个，文件大小不超过50MB</div> -->
                     </el-upload>
                      <!-- <el-input v-model="testFilePath"></el-input> -->
                    </el-form-item>
                </div>
                    <el-button id="advSample" class="feature-im-btn" @click="explaination('adversarial')" style="float: right; ">{{ $t('advpage.advtitle') }}
                    </el-button>
                  </el-form>
    
            </el-card>   
            <div style="margin-top: 30px; text-align:center;" id="advSampleRes" v-loading="showAdvLoading">
                <h3>{{ $t('global.result') }}</h3>
                <el-divider></el-divider>
                <div style="display: flex; margin-top: 20px; justify-content: space-around;">
                  <el-card class="res-card">
                    <span style="font-size: 12px;" >Original class:</span>
                    <br/>
                    <span style="line-height: 50px;" v-html="adversarialObj.orgClass"></span>
                  </el-card>
                  <el-card class="res-card" style="margin: 0 10px;">
                    <span style="font-size: 12px;">Adv sample class:</span>
                    <br/>
                    <span style="line-height: 50px;" v-html="adversarialObj.advSamClass"></span>
                  </el-card>
                  <el-card class="res-card">
                    <span style="font-size: 12px;">Distance</span><br/>
                    <span style="line-height: 50px;" v-html="adversarialObj.Distance"></span>
                  </el-card>
                </div>
                 
  
              </div>
        </div>
    </div>
      
    </div>
</template>
<script>
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import getSteps from './steps';
import {featureImportance} from '@/api/silas'
export default {
    data() {
      return {
        modelPath: "OptExplain/optexplain-example/models",
        modelPath_for_adv: "OptExplain/optexplain-example/models",
        testFilePath: "OptExplain/optexplain-example/test.csv",
        PSOIterationsNum: 20,
        PSOParticlesNum: 20,
        accWeight: 0.5,
        conjunction: 'yes',
        explanationData: [],
        showPSO: false,
        showLoading: false,
        showAdvLoading: false,
        fileList:[],
        // posList:[1,2,4]
        // posStr: '',
        performance: {
          "Coverage": '-',
          "EX AUC": '-',
          "EX accuracy": "-",
          "Overlap": "-",
          "Performance": '-',
          "RF AUC": "-",
          "RF accuracy": "-",
          "Sample size": '-'
        },
        featureImportanceList: [],
        adversarialObj: {
          "Distance": "0.0",
          "advSamClass": 0,
          "opt_sample": [
            6.0,
            147.64441628529508,
            72.0,
            35.0,
            0.0,
            26.210932884657822,
            0.6387911514805615,
            49.92216384827193
          ],
          "orgClass": "1",
          "x": [
            6,
            148,
            72,
            35,
            0,
            33.6,
            0.627,
            50
          ]
        }
        ,
        canAdvClick:false,
        canFeaClick:false,
        posStr: "1   10  [0.681 0.103 0.347 1.833]\t 0.81770833  4   fitness: 0.89736548\n2   6   [0.292 0.124 0.267 1.   ]\t 0.81770833  4   fitness: 0.89736548\n3   4   [0.674 0.133 0.344 1.768]\t 0.81770833  4   fitness: 0.89736548\n4   4   [0.758 0.104 0.344 1.23 ]\t 0.81770833  4   fitness: 0.89736548\n5   11  [0.608 0.106 0.422 1.   ]\t 0.83203125  4   fitness: 0.90452694\n6   11  [0.604 0.099 0.432 1.   ]\t 0.83203125  4   fitness: 0.90452694\n7   0   [0.589 0.106 0.497 1.   ]\t 0.83203125  4   fitness: 0.90452694\n8   0   [0.536 0.105 0.55  1.   ]\t 0.81770833  4   fitness: 0.89736548\n9   2   [0.64  0.098 0.417 1.   ]\t 0.81770833  4   fitness: 0.89736548\n10  5   [0.617 0.094 0.37  1.   ]\t 0.85807292  4   fitness: 0.91754777\n11  0   [0.607 0.089 0.379 1.   ]\t 0.85807292  4   fitness: 0.91754777\n12  5   [0.59  0.099 0.395 1.   ]\t 0.81770833  4   fitness: 0.89736548\n13  10  [0.646 0.091 0.335 1.   ]\t 0.85807292  4   fitness: 0.91754777\n14  5   [0.64  0.089 0.35  1.   ]\t 0.85807292  4   fitness: 0.91754777\n15  0   [0.615 0.093 0.375 1.   ]\t 0.85807292  4   fitness: 0.91754777\n16  1   [0.611 0.093 0.378 1.   ]\t 0.85807292  4   fitness: 0.91754777\n17  11  [0.622 0.091 0.346 1.   ]\t 0.85807292  4   fitness: 0.91754777\n18  0   [0.611 0.092 0.379 1.   ]\t 0.85807292  4   fitness: 0.91754777\n19  0   [0.616 0.094 0.373 1.   ]\t 0.85807292  4   fitness: 0.91754777\n20  0   [0.613 0.092 0.373 1.   ]\t 0.85807292  4   fitness: 0.91754777\nOptimal parameters: [0.617 0.094 0.37  1.   ]\n20  0   [0.613 0.092 0.373 1.   ]\t 0.85807292  4   fitness: 0.91754777"
      }
    },
    methods: {
      guide() {
        const steps = getSteps(this.$i18n); // 获取当前语言的步骤
        this.driver.defineSteps(steps)
        this.driver.start()
        },
      handleSuccess(){
        this.canFeaClick = true
      },
      handleRemove(){
        this.canFeaClick = false
      },
      handleAdvSuccess(){
        this.canAdvClick = true
      },
      handleAdvRemove(){
        this.canAdvClick = false
      },
      explaination(type) {
        console.log("type", type)
        let that = this
        
        let model_path = that.modelPath

        if(type === 'adversarial'){
          model_path = that.modelPath_for_adv
          this.showAdvLoading = true
        }else{
          this.showLoading = true
        }
        featureImportance({
            "type": type,
            "model_path": model_path,
            "test_file_path": that.testFilePath
          }).then((result)=>{
            if (type == 'feature') {
              console.log("resss", result)
              that.featureImportanceList = result.featureImportance
            } else {
              that.adversarialObj = result.adversarialObj
            }

            that.showLoading = false
            that.showAdvLoading = false
        })
      },
    },

    mounted() {
        this.driver = new Driver()
    },
}
</script>
<style scope>
.feature-importance-page{
    display: flex;
   
}
.tutorial_btn{
    position: fixed;
    right: 0;
    font-size: 14px;
    z-index: 999;
    height: 48px;
  }
.el-divider--vertical {
    margin-left: 30px; 
    height: calc(100vh - 200px);
}
.res-card{
    min-width: 150px;
}
</style>