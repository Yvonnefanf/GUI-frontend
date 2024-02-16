<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetLineChartData="handleSetLineChartData" :finishedTrainings="finishedTrainings" :explanations="explanations" :gridSearchModels="gridSearchModels"/>
    <el-divider></el-divider>
    <!-- <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row> -->

    <el-row v-loading="loading" :gutter="8" style="height:480px; margin-bottom:20px; overflow:hidden;">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
       <span style="line-height: 40px; font-weight: 800;"> {{ $t('dashboard.finishedres') }} <el-tag style="margin-top:10px;">{{$t('global.savedIn')}}: /Silas-GUI/silas-temp/***.tar</el-tag> </span>
        <transaction-table :data="finishedTrainingsList"/>
      </el-col>

      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <span style="line-height: 40px; font-weight: 800;"> {{ $t('dashboard.finishexplainations') }} <el-tag style="margin-top:10px;">{{$t('global.savedIn')}}: /Silas-GUI/explanation</el-tag></span>
        <transaction-table :data="finishedTrainingsList"/>
      </el-col>
      <!-- <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card />
      </el-col> -->
    </el-row>

    <el-divider></el-divider>
    <div class="footer" style=" margin-left: -32px;position:fixed; bottom:0;width:100%;">
      <el-card
        style="border-radius:0;margin-top: 20px; background-color: rgb(43 47 58); border-color: rgba(59, 65, 79, 0.1); color:#fff; height: 100%;text-align: center;">
        <img height="28px"
        style="margin-right: 10px; margin-top: 10px;"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAoCAYAAAC8cqlMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGrWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0wNy0xOVQxOTowMCsxMDowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0wMS0wNlQxNToxOTowNysxMDowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTktMDEtMDZUMTU6MTk6MDcrMTA6MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODNmM2QyMTQtMmJhMC0zMjRhLWI3OTEtMDAzMDhhZTBmNDNmIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6Y2JkNmFmODgtMTNiNy1kZjQ3LWFjYTktYTA1NmRkYWFmZGMyIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZmM4ODU4MjctOGE5NC0xNzQ5LWIxMGMtMDMwNTFmMWQzZjAxIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpmYzg4NTgyNy04YTk0LTE3NDktYjEwYy0wMzA1MWYxZDNmMDEiIHN0RXZ0OndoZW49IjIwMTgtMDctMTlUMTk6MDArMTA6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmMwOGMxOGJhLTA2MjgtN2U0OS1iMzkwLTMwOGRmMDhkYmY0NSIgc3RFdnQ6d2hlbj0iMjAxOC0wNy0xOVQxOTowMCsxMDowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ODNmM2QyMTQtMmJhMC0zMjRhLWI3OTEtMDAzMDhhZTBmNDNmIiBzdEV2dDp3aGVuPSIyMDE5LTAxLTA2VDE1OjE5OjA3KzEwOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkOhW6IAAAJtSURBVFjD3dhLiI1RHADws5BCihQLJXkTFiLDNFKGsrBWygILG8LIIxtWMiGSZxJ5JMnOQhYeE6KI8shk5ZnXCOOV5GfhTL7G7c6933yf7ufUt7n3/M///M7533vOvQGPMQehoM9itAZ8wKICQzbhWcBzbCgwZC8eBLRiZ4Ehp3E94CZOFBhyCWcDzsenqJA7OBxwPO5KUSGP0BywAw9TDNCAoRlOaAympYh7gaaA9XiaYoBruJLxyp5OEfcOC0I8Q96mGGARfqB3BoihfrfGKuP6x3NwVsBcvEffKgfpiW/xZM3iUGtLETcCnzAhYEhcjZ84gvoqBrqAlgwgD3Gsiv6zcSrOux29k7J9eONPu4qlXezUwrgrvbpZVj8xs0yfAViFW4n5vcA2DEYoFdQPy3EjEfQEuzCxU98e+NzN8tqI1yVen4qDeBnn8AOXsQR9OvevJNEMHE3s1hecw/z4/sl4uqaF3MXWxE32Er4nVv0ApnQ1TrVJB2EtbsdEbbFG32BgCsRYfI3fmu1x1a9jWayMisfq7od0HnbjY4RdiefS+DIxk2M53Ywxr2KtN3ZnLlkdZjv83Z5gTyzNRhxK1HuyrctiDllBZkrfxtUSpOOKUW27mlX+LCHbU0DW1iJkRgrI2FqEdPxsrrRleXPOHFJNea2pZUhDFZDRtQzpuMl21VqyzpsHZGsFkNVFgNRXABlVBEjAgzKIy3nkzAvSXAbSVCTI9DKQkUWCBNwvgbiYV748IVtKQFYWETKtBGR4ESEB9xKIC3nmyhuyOQFZUWRIXQIyrMiQEP8leZR3nn8BOYP9/wOkDpPyzvMLDphwAHNEbf0AAAAASUVORK5CYII=">
        <a style="font-size: 20px; color: #ccc; font-family: 'CMUBR', 'Helvetica Neue', Arial, sans-serif" target="_blank"
          href="https://depintel.com/documentation/v087/_build/html/index.html#">Silas {{$t('global.reference')}}</a>
        | <a style="font-size: 20px; color: #ccc; font-family: 'CMUBR', 'Helvetica Neue', Arial, sans-serif" target="_blank"
          href="https://www.depintel.com/silas_download.html">Silas {{$t('route.download')}}</a>
          <br/>
          <br/>
        <!-- <span style="display: inline-block; font-size: 12px; color: rgb(105 105 105);">
          Copyright © 2022 Dependable Intelligence Pty Ltd.<br />
            All rights reserved.<br />
            ABN: 28627562814<br />
        </span> -->
      </el-card>
    </div>
    <!-- <el-row :gutter="32">
      <el-col :xs="36" :sm="36" :lg="12">
        <div class="chart-wrapper">
          <raddar-chart/>
        </div>
      </el-col>
      <el-col :xs="36" :sm="36" :lg="12">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import { getCurStastic } from '@/api/silas'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      show: true,
      finishedTrainingsList:[],
      finishedTrainings:0,
      explanations: 0,
      gridSearchModels: 0,
      loading: false

    }
  },
  mounted() {
    this.updateData()
    // this.show=false
    //     setTimeout(()=>{
    //       this.show=true
    //     })

  },
  methods:{
    updateData(){
      this.loading = true
      getCurStastic().then((res)=>{
        console.log(res)
        this.finishedTrainings = res.finishedTrainings
        this.explanations = res.explanations
        this.gridSearchModels = res.gridSearchModels
        this.finishedTrainingsList = res.finishedTrainingsList
        this.loading = false
      })
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  },

  computed:{
    language() {
        return this.$store.getters.language
      }
  },
  watch:{
    language() {
        this.show=false
        setTimeout(()=>{
          this.show=true
        })
      }
  }

}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
  height: calc(100vh - 132px);
  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
