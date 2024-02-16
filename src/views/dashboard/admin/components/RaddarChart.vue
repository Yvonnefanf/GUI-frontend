<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 3000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        radar: {
          radius: '66%',
          center: ['40%', '50%'],
          splitNumber: 8,
          splitArea: {
            areaStyle: {
              color: 'rgba(127,95,132,.3)',
              opacity: 1,
              shadowBlur: 45,
              shadowColor: 'rgba(0,0,0,.5)',
              shadowOffsetX: 0,
              shadowOffsetY: 15
            }
          },
          indicator: [
            { name: this.$t('dashboard.supportregression'), max: 10 },
            { name: this.$t('dashboard.supportclassification'), max: 10 },
            { name: this.$t('dashboard.gridsearch'), max: 10 },
            { name: this.$t('dashboard.explainai'), max: 10 },
            { name: this.$t('dashboard.featureanalysis'), max: 10 },
            { name: this.$t('dashboard.advsampleanalysis'), max: 10 }
          ]
        },
        legend: {
          top: 'center',
          right: '10',
          orient: 'vertical',
          data: ['A','B','Silas']
        },
        series: [{
          type: 'radar',
          symbolSize: 0,
       
          areaStyle: {
            normal: {
              shadowBlur: 13,
              shadowColor: 'rgba(0,0,0,.2)',
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 1
            }
          },
          data: [
            // {
            //   value: [5000, 7000, 12000, 11000, 15000, 14000],
            //   name: 'Allocated Budget'
            // },
            // {
            //   value: [4000, 9000, 15000, 15000, 13000, 11000],
            //   name: 'Expected Spending'
            // },
            {
              value: [10, 10, 10, 9, 10, 10],
              name: 'Silas'
            },
            {
              value: [4, 7, 7, 3, 4, 9],
              name: 'B'
            },
            {
              value: [1, 1, 2, 3, 4, 5],
              name: 'A'
            }
     
          ],
          animationDuration: animationDuration
        }]
      })
    }
  }
}
</script>
