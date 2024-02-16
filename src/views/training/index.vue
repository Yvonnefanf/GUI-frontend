<template>
  <div class="app-container documentation-container">
    <el-button class="tutorial_btn" type="warning" icon="el-icon-guide"  @click.prevent.stop="guide">{{ $t('global.guide') }}</el-button>
    <div class="training_container">
      <aside style="height: 100%; min-width: 300px;" id="parameter-panel">
        <h3>{{$t('global.parameterSetting')}}</h3>
        <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
          <el-form-item label-width="130px" label="Task Mode:" class="postInfo-container-item">
            <el-select v-model="postForm['task-mode']" default-first-option>
              <el-option v-for="(item, index) in taskListOptions" :key="item + index" :label="item" :value="item" />
            </el-select>
          </el-form-item>

          <el-form-item label-width="130px" label="Tree Algorithm:" class="postInfo-container-item">
            <el-select v-model="postForm['tree-algorithm']" default-first-option>
              <el-option v-for="(item, index) in treeAlgorithmOptions" :key="item + index" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label-width="130px" label="Feature Prop:" class="postInfo-container-item">
            <el-select v-model="postForm['feature-proportion']" default-first-option>
              <el-option
                v-for="(item, index) in featureproportionOptions"
                :key="item + index"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label-width="130px" label="Tree Depth:" class="postInfo-container-item">
            <el-input v-model="postForm['max-depth']" />
          </el-form-item>
          <el-form-item label-width="130px" label="Leaf Size:" class="postInfo-container-item">
            <el-input v-model="postForm['desired-leaf-size']" />
          </el-form-item>
          <el-form-item label-width="130px" label="Forest Algorithm:" class="postInfo-container-item">
            <el-select v-model="postForm['forest-algorithm']" default-first-option>
              <el-option
                v-for="(item, index) in forestAlgorithmOptions"
                :key="item + index"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label-width="130px" label="Number of Trees:" class="postInfo-container-item">
            <el-input v-model="postForm['number-of-trees']" />
          </el-form-item>
          <el-form-item label-width="130px" label="Sampling Prop:" class="postInfo-container-item">
            <el-input v-model="postForm['sampling-proportion']" />
          </el-form-item>
          <el-form-item label-width="130px" label="OOB Proportion:" class="postInfo-container-item">
            <el-input v-model="postForm['oob-proportion']" />
          </el-form-item>
          <el-divider />
          <div style="display: flex; justify-content: space-between;" id="uploadFIles">
            <el-upload
              class="upload-demo"
              style="margin-bottom: 20px;"
              :data="{ 'fileName': 'train.csv' }"
              action="http://127.0.0.1:3333/SilasGUI/uploadFile"
              :file-list="fileList"
              :limit="1"
              accept=".csv"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
            >
              <el-button v-if="!canClick" type="primary" style="width: 100%;"><i class="el-icon-upload" />
                {{$t('global.trainingFile')}}</el-button>
              <el-button v-else slot="tip" type="primary" disabled><i class="el-icon-upload" /> {{$t('global.trainingFile')}}</el-button>
            
            </el-upload>
            <el-upload
              class="upload-demo"
              :data="{ 'fileName': 'test.csv' }"
              action="http://127.0.0.1:3333/SilasGUI/uploadFile"
              :file-list="fileList"
              :limit="1"
              accept=".csv"
              :on-success="handleTestSuccess"
              :on-remove="handleTestRemove"
            >
              <el-button v-if="!canTestClick"  type="primary" style="width: 100%;"><i
                class="el-icon-upload"
              /> {{$t('global.testingFile')}}</el-button>
              <el-button v-else slot="tip" type="primary" disabled><i class="el-icon-upload" /> {{$t('global.testingFile')}}</el-button>
             
            </el-upload>
          </div>
          <el-button style="width: 100%;" @click="train" id="trainBtn" type="success" plain>{{$t('global.train')}}</el-button>
        </el-form>
      </aside>
      <div>
        <div class="training_results">
          <el-card id="trainRes"
            style="border:none;text-align: center;height: 184px; width: 100%;    font-family: monospace;
                  text-align: justify; width: 510px; overflow: auto;"
          >
            <h3>{{$t('global.testingRes')}}</h3>
            <div v-for="item in trainResult" style="font-size:14px;white-space:wrap;">
              <span v-for="ele in item" style="display: inline-block; width: 90px" v-html="ele" />

            </div>

          </el-card>
          <el-card id="lastSetting"
            style="border:none;text-align: center; margin-left: 20px;height: 184px; flex:1;font-family: monospace;
                  text-align: justify;"
          >

            <div ref="editorContainer" style="height: 160px;" />

          </el-card>
        </div>
        <el-card
         id="treeModel"
          v-loading="isTreeLoading"
          class="train-reslut-table"
          :element-loading-text="$t('global.loading')"
          style="border:none; text-align: center; margin-top: 20px; margin-left: 20px;"
        >
          <div
            v-if="refresh"
            class="tree-visual-container"
            style="display: flex; height: calc(100vh - 368px); font-family: monospace; min-height: 300px;"
          >
            <el-card
              style="padding:0;color:#000; min-height: 400px;"
            >
              <div style="width: 100px; height: 100%; overflow: auto;">
                
                <div
                  v-for="(item, index) in treeDataList"
                  :key="index"
                  class="tree-item"
                  :class="currentTreeIndex == index ? 'current' : ''"
                  @click="updateCurrentTree(index)"
                >
                  <div style="height:30px; line-height:30px; cursor: pointer;" v-html="`Tree# ${index}`" />
                </div>
              </div>
            </el-card>

            <div style="flex:1; padding: 10px; border: 1px dashed #ccc; position: relative;">
              <h3 style="text-align: center;">{{$t('global.treeModelVis')}} | Tree: {{currentTreeIndex}}   
              </h3>
              <el-divider />
              <div class="node-info">

                <span>{{ nodeInfo }}</span>
              </div>
              <svg id="svgChart" />
            </div>

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
import { startTrain, getTrainTreeData,getTrainResult } from '@/api/silas'
import * as d3 from 'd3'
import ace from 'ace-builds/src-noconflict/ace'

const defaultForm = {
  'task-mode': 'classification',
  'tree-algorithm': 'GreedyNarrow1D',
  'feature-proportion': 'sqrt',
  'max-depth': 12,
  'desired-leaf-size': 64,
  'forest-algorithm': 'ClassicForest',
  'number-of-trees': 8,
  'sampling-proportion': 1.0,
  'oob-proportion': 0.05
}

export default {
  name: 'Training',
  // components: { DropdownMenu },
  data() {
    return {
      driver: null,
      postForm: Object.assign({}, defaultForm),
      lastSettings: { 'desired-leaf-size': '64', 'feature-proportion': 'sqrt', 'file_path_train': 'silas-temp/results/train.csv', 'file_path_valid': 'silas-temp/results/train.csv', 'forest-algorithm': 'ClassicForest', 'max-depth': '64', 'number-of-trees': '2', 'oob-proportion': '0.05', 'sampling-proportion': '1.0', 'task-mode': 'classification', 'tree-algorithm': 'GreedyNarrow1D' },
      loading: false,
      taskListOptions: ['classification', 'regression'],
      treeAlgorithmOptions: ['GreedyNarrow1D', 'RdGreedy1D', 'SimpleTreeGrower', 'RdGreedyReg1D'],
      featureproportionOptions: ['sqrt', 'log', 'log2', 'golden'],
      forestAlgorithmOptions: ['ClassicForest', 'PrototypeSampleForest', 'SimpleForest', 'SimpleValueForest', 'SimpleRegForest', 'SimpleOOBRegForest', 'AdaBoostForest', 'CascadeForest'],
      rules: {
        // image_uri: [{ validator: validateRequire }],
        // title: [{ validator: validateRequire }],
        // content: [{ validator: validateRequire }]
      },
      fileList: [],
      canClick: false,
      canTestClick: false,
      tempRoute: {},
      trainResult: [],
      treeDataList: [],
      refresh: true,
      currentTreeIndex: 0,
      isTreeLoading: false,
      nodeInfo: 'Node Detail:\n-'
    }
  },
  mounted() {
    this.driver = new Driver()
    this.isTreeLoading = true
    this.getTree()
    // this.setEditor()
    this.getRes()
  },
  methods: {
    guide() {
      const steps = getSteps(this.$i18n); // 获取当前语言的步骤
      this.driver.defineSteps(steps)
      this.driver.start()
    },
    handleSuccess(res, file, fileList) {
      console.info(fileList, res, file, 'fileList')
      this.canClick = true
    },
    handleRemove() {
      this.canClick = false
    },
    handleTestSuccess() {
      this.canTestClick = true
    },
    handleTestRemove() {
      this.canTestClick = false
    },

    updateCurrentTree(index) {
      this.currentTreeIndex = index
      this.initTree(this.treeDataList[index])
    },
    getRes(){
      getTrainResult().then((res)=>{
        const result = res.TrainResult
        this.lastSettings = res.setting_data
        this.setEditor()
        for (let i = 0; i < result.length; i++) {
          const str = result[i]
          if (str.includes('──────────────')) {
            this.trainResult.push(this.getArr(result[i + 1]))
            this.trainResult.push(this.getArr(result[i + 2]))
            this.trainResult.push(this.getArr(result[i + 3]))
          }
        }
      })
    },
    getTree() {
      getTrainTreeData().then((res) => {
      this.treeDataList = res.treeDataList
      if (this.treeDataList && this.treeDataList.length) {
        this.initTree(this.treeDataList[this.currentTreeIndex])
      }
      this.isTreeLoading = false
    })
    },
    initTree(data) {
      const that = this

      const width = window.innerWidth - 800
      const height = window.innerHeight - 500

      const svg = d3.select('#svgChart')
        .attr('width', width)
        .attr('height', height)
      console.log(svg._groups[0][0])
      while (svg._groups[0][0]?.firstChild) {
        svg._groups[0][0].removeChild(svg._groups[0][0].lastChild)
      }
      const g = svg.append('g').attr('transform', 'translate(0, 20)')
      function formatTreeData(data) {
        if (data.left && (data.left.left || data.left.right)) {
          formatTreeData(data.left)
        }
        if (data.right && data.right && (data.right.left || data.right.right)) {
          formatTreeData(data.right)
        }

        if (data.right && data.right) {
          data.children = [data.left, data.right]
        } else if (data.right) {
          data.children = [{}, data.right]
        } else {
          data.children = [data.left]
        }
      }
      formatTreeData(data)
      data.name = 'Root'
      const hierarchyData = d3.hierarchy(data)
      const treeLayout = d3.tree()
        .size([width, height - 30])
        .separation((a, b) => {
          return a.parent === b.parent ? 1 : 2
        })
      const nodesData = treeLayout(hierarchyData)

      const links = g.selectAll('.links')
        .data(nodesData.descendants().slice(1))
        .enter().append('path')
        .attr('fill', 'none')
        .attr('stroke', '#000')
        .attr('stroke-width', 1)
        .attr('d', (d) => {
          return `
                M${d.x},${d.y}
                C${d.x},${(d.y + d.parent.y) / 2}
                ${d.parent.x},${(d.y + d.parent.y) / 2.5}
                ${d.parent.x},${d.parent.y}`
        })

      const nodes = g.selectAll('.node')
        .data(nodesData.descendants())
        .enter().append('g')
        .attr('transform', (d) => {
          return `translate(${d.x}, ${d.y})`
        })
      // draw cycle
      nodes.append('circle')
        .style('fill', 'rgb(33, 100, 246)')
        .attr('stroke', '#000')
        .attr('stroke-width', 2)
        .attr('r', 10).on('click', function(event, d) {
          const circles = g.selectAll('circle')?._groups[0]

          for (let i = 0; i < circles.length; i++) {
            circles[i].attributes.style.value = 'fill: rgb(33, 100, 246);'
          }

          if (d3.select(this).style('fill') !== 'rgb(228, 160, 53)') {
            d3.select(this).style('fill', 'rgb(228, 160, 53)')
          }
          that.nodeInfo = `Node Detail:\n`
          console.log('d.data', d, d.data)
          Object.keys(d.data).forEach(key => {
            if (key != 'left' && key !== 'right' && key != 'children' && key != 'partition') {
              that.nodeInfo += `${key}: ${d.data[key]}\n`
            }
          })
        })

      // text
      nodes.append('text')
        .attr('dx', '.6em')
        .attr('fill', '#000')
        .attr('x', 5)
        .text((d) => {
          return d.data.featureIndex ? `${d.data.featureIndex}` : `node`
        })
    },

    setEditor() {
      setTimeout(() => {
        this.editor = ace.edit(this.$refs.editorContainer)
        console.log('this.editor', this.editor)
        this.editor.setValue(JSON.stringify(this.lastSettings, null, 2), -1)
        this.editor.setReadOnly(true)
        // this.editor
      })
    },
    getArr(str) {
      const arr = str.split(' ')
      const newarr = []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== '' && arr[i] !== '\n' && arr[i] !== '0' && arr[i] !== '1' && arr[i] !== 'tested_negative' && arr[i] !== 'tested_positive') {
          newarr.push(arr[i])
        }
      }
      return newarr
    },

    train() {
      const that = this
      startTrain(this.postForm).then(res => {
        const result = res.TrainResult
        that.lastSettings = res.setting_data
        that.setEditor()
        that.getTree()
        for (let i = 0; i < result.length; i++) {
          const str = result[i]
          if (str.includes('──────────────')) {
            that.trainResult.push(that.getArr(result[i + 1]))
            that.trainResult.push(that.getArr(result[i + 2]))
            that.trainResult.push(that.getArr(result[i + 3]))
          }
        }
      }).catch(error => {
        console.log('error', error)
      })
    }
  }
}
</script>
<style>
.el-form-item--medium .el-form-item__label {
  line-height: 24px;
}
</style>
<style lang="scss" scoped>
.el-form-item--medium .el-form-item__label {
  line-height: 20px;
}
.tutorial_btn{
  position: fixed;
  right: 0;
  font-size: 14px;
  z-index: 999;
  font-weight:800;
  height: 48px;
}
.documentation-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .training_container {
    display: flex;
    width: 100%;
  }

  .training_results {
    flex: 1;
    margin-left: 20px;
    display: flex;
  }

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
  .tree-item.current {
    color: #f39500;
    font-weight: 900;
    // background-color: rgb(37, 37, 37);
  }

  .tree-item {
    text-align: center;
    border-bottom: 1px dashed rgb(96, 96, 96);
  }
}
</style>
