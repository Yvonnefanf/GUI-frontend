<template>
    <div style="margin: 20px; display:flex; flex-direction: column;
    height: 100vh;">
    <aside><i class="el-icon-info"></i> {{$t('explainpage.intro')}} <a href="https://github.com/Yunkun-Zhang/OptExplain-Silas" target="_blank" style="text-decoration: underline;" >{{ $t('global.sourcecode') }}</a></aside>
    <el-button class="tutorial_btn" type="warning" icon="el-icon-guide"  @click.prevent.stop="guide">{{ $t('global.guide') }}</el-button>
        <div class="exp-container">
            <aside style="height: calc(100vh - 190px); min-width: 300px;" id="setting-panel">
                <h3>{{$t('global.parameterSetting')}}</h3>
                <el-form class="model-explanaton-form" label-width="120px">
                    <el-form-item label="Model Path:">
                      <!-- <el-input v-model="modelPath"></el-input> -->
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
                    <el-form-item label="PSO Iterations:">
                      <el-input v-model="PSOIterationsNum"></el-input>
                    </el-form-item>
                    <el-form-item label="Acc Proportion:">
                      <el-input v-model="accWeight"></el-input>
                    </el-form-item>
                    <el-form-item label="PSO particles:">
                      <el-input v-model="PSOParticlesNum"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="Output Conjunction:">
                      <el-radio v-model="conjunction" label="true">yes</el-radio>
                      <el-radio v-model="conjunction" label="false">no</el-radio>
                    </el-form-item> -->
                    <div id="uploadBtn">
                    <el-form-item label="Test File:">
                      <!-- <el-input v-model="testFilePath"></el-input> -->
                      <el-upload class="upload-demo" style="text-align:left;"
                        :data="{'fileName':'explanation_test.csv'}" action="http://127.0.0.1:3333/SilasGUI/uploadFile"
                         :limit="1" accept=".csv" :on-success="handleTestSuccess" :on-remove="handleTestRemove">
                        <el-button size="small" type="primary" style="width:174px;" v-if="!canTestClick"><i class="el-icon-upload"></i>{{ $t('global.testingFile') }}</el-button>
                        <el-button size="small" type="primary" style="width:174px;" v-else slot='tip' disabled><i class="el-icon-upload"></i>{{ $t('global.testingFile') }}</el-button>
                        <!-- <div slot="tip" class="el-upload__tip">最多可上传5个，文件大小不超过50MB</div> -->
                      </el-upload>
                      <!-- <el-input v-model="testFilePath"></el-input> -->
                    </el-form-item>
                    <el-form-item label="Prediction File:">
                      <el-upload class="upload-demo" style="text-align:left;"
                      :data="{'fileName':'explanation_prediction.csv'}" action="http://127.0.0.1:3333/SilasGUI/uploadFile"
                      :on-success="handleSuccess" :on-remove="handleRemove"
                       :limit="1" accept=".csv">
                      <el-button size="small" type="primary" style="width:174px;" v-if="!canClick" ><i class="el-icon-upload"></i> {{ $t('global.predFile') }}</el-button>
                      <el-button size="small" type="primary" style="width:174px;" v-else slot='tip' disabled ><i class="el-icon-upload"></i> {{ $t('global.predFile') }}</el-button>
                      <!-- <el-input v-model="predictionFilePath"></el-input> --> </el-upload>
                    </el-form-item>
                  </div>
                   
                    <el-button id="explainBtn" style="width: 100%; margin-top: 10px;" class="silas-btn" @click="explaination" type="success" plain> {{ $t('explainpage.explaintitle') }}
                    </el-button>
                    <!-- <el-button style="width:100%" type="primary" @click="explaination">Start Opt Explain</el-button> -->
                  </el-form>
                </aside>
            <div class="extension-result-container" v-loading="showLoading" element-loading-text="calulating and loading..."
            element-loading-background="rgba(0, 0, 0, 0.2)" id="explainRes">
            <h3><el-icon class="el-icon-s-data"></el-icon> {{ $t('explainpage.performance') }} </h3>
            <el-row :gutter="40" class="panel-group">
                <el-col :xs="6" :sm="6" :lg="3" class="card-panel-col">
                    <div class="card-panel">
                      <div class="card-panel-description">
                        <div class="card-panel-text" style="color:#34bfa3">
                          Sample Size
                        </div>
                        <div class="result">{{ performance['Sample size'] }}</div>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="6" :sm="6" :lg="3" class="card-panel-col">
                    <div class="card-panel">
                      <div class="card-panel-description">
                        <div class="card-panel-text" style="color:#f4516c;">
                        RF accuracy
                        </div>
                        <div class="result"> {{ performance['RF accuracy'] }}</div>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="6" :sm="6" :lg="3" class="card-panel-col">
                    <div class="card-panel">
                      <div class="card-panel-description">
                        <div class="card-panel-text" style="color:#36a3f7">
                          RF AUC
                        </div>
                        <div class="result">{{ performance['RF AUC'] }}</div>
                        
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="6" :sm="6" :lg="3" class="card-panel-col">
                    <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
                      <div class="card-panel-description">
                        <div class="card-panel-text" style="color:#e4a035">
                            EX accuracy
                        </div>
                        <div class="result"> {{ performance['EX accuracy'] }}</div>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="6" :sm="6" :lg="3" class="card-panel-col">
                    <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
                      <div class="card-panel-description">
                        <div class="card-panel-text" style="color:#34bfa3">
                            EX AUC
                        </div>
                        <div class="result">{{ performance['EX AUC'] }}</div>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="6" :sm="6" :lg="3" class="card-panel-col">
                    <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
                      <div class="card-panel-description">
                        <div class="card-panel-text" style="color:#f4516c">
                            Coverage
                        </div>
                        <div class="result"> {{ performance['Coverage'] }}</div>
               
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="6" :sm="6" :lg="3" class="card-panel-col">
                    <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
                      <div class="card-panel-description">
                        <div class="card-panel-text" style="color:#36a3f7">
                            Overlap
                        </div>
                        <div class="result">{{ performance['Overlap'] }}</div>
                     
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="6" :sm="6" :lg="3" class="card-panel-col">
                    <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
                      <div class="card-panel-description">
                        <div class="card-panel-text" style="color:#34bfa3">
                            Performance
                        </div>
                        <div class="result"> {{ performance['Performance'] }}</div>
                       
                      </div>
                    </div>
                  </el-col>
               
              </el-row>
            <el-card
              style="flex:1;">
              <el-table :data="explanationData" style="width:99%;">
                <el-table-column prop="Groups" label="Groups">
                </el-table-column>
                <el-table-column prop="Class" label="Class Signature">
                </el-table-column>
                <el-table-column prop="Rules" label="Rules">
                </el-table-column>
                <!-- <el-table-column prop="Weight" label="Weight">
                </el-table-column> -->
              </el-table>
            </el-card>
            <el-card
            style="flex:1;margin-top: 20px; border-color: rgb(59 65 79 / 50%); width: 100%; font-family: monospace; text-align: center; height: 400px;">
            <div style="text-align: left; padding: 10px 20px"><el-tag></span>{{ $t('global.savedIn') }} : <span v-html="saved_path"></span></el-tag></div>
            <h3>---- P S O ----</h3>
            <div style="white-space: pre-wrap; font-size: 12px; height: 100%; overflow: auto;"> {{ posStr }}
              <!-- P S O
            {{posStr}} -->
            </div>
          </el-card>
          </div>
        </div>
    </div>

    
</template>
<script>
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import getSteps from './steps';
import {startExplanation } from '@/api/silas'
export default {
  name: 'Explaination',
  data() {
  return {
    isLoading: false,
    modelPath: "OptExplain/optexplain-example/models",
    testFilePath: "OptExplain/optexplain-example/test.csv",
    predictionFilePath: "OptExplain/optexplain-example/pred.csv",
    PSOIterationsNum: 20,
    PSOParticlesNum: 20,
    accWeight: 0.5,
    conjunction: 'yes',
    explanationData: [],
    showPSO: false,
    showLoading: false,
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
    posStr: "-",
    saved_path: "",
    canClick:false,
    canTestClick:false
  }
},
mounted() {
    this.driver = new Driver()
  },
methods: {
  guide() {
      const steps = getSteps(this.$i18n); // 获取当前语言的步骤
      this.driver.defineSteps(steps)
      this.driver.start()
  },
  handleSuccess(res, file, fileList) {
    console.info(fileList, res, file, "fileList")
    this.canClick = true
  },
  handleRemove(){
    this.canClick = false
  },
  handleTestSuccess(){
    this.canTestClick = true
  },
  handleTestRemove(){
    this.canTestClick = false
  },
  startTrain() {
    this.isLoading = true

  },
  explaination() {
    let that = this
    this.showLoading = true
    startExplanation({
        "modelPath": that.modelPath,
        "testFilePath": that.testFilePath,
        "predictionFilePath": that.predictionFilePath
      }).then((result)=>{

        that.showLoading = false

        for (let i = 0; i < result.explainRes.length; i++) {
          let item = result.explainRes[i]
          if (item && item.Class && item.Class.length) {
            result.explainRes[i].Class = `[${item.Class[0], item.Class[1]}]`
          }
          result.explainRes[i].Rules.replace('∧', '\n')
        }

        that.explanationData = result.explainRes
        that.posList = result.posList
        that.posStr = that.posList.join('\n')
        that.performance = result.performance
        that.saved_path = result.cur_file

    })
  }
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
.exp-container{
    display: flex;
    flex: 1;
    
}
.model-explanaton-form{
    width: 300px;
}
.extension-result-container{
    flex:1;
    padding: 0 20px;
}
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    .result{
        font-size: 20px;
    }

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: left;
      font-weight: bold;
      margin: 26px;
      margin-left: 20px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>