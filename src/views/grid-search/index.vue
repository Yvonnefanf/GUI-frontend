<template>
    <div style="margin:20px;">
        <aside><i class="el-icon-info"></i>{{ $t('gridsearchpage.intro') }}<a :href="refSrc" target="_blank" style="text-decoration: underline;">{{$t('global.reference')}}</a></aside>
        <el-button class="tutorial_btn" type="warning" icon="el-icon-guide"  @click.prevent.stop="guide">{{ $t('global.guide') }}</el-button>
        <div class="grid-container" style="display:flex;">
        <div style="width: 300px;" id="setting-gen-panel">
            <el-button @click="gengridSearch" type="success" plain>
                {{$t('global.gengridsearchSetting')}}
            </el-button>
            <div ref="editorContainer" style="height: calc(100vh - 250px); margin: 15px 0;"></div>
        </div>
        <div style="flex:1; margin-left:20px;">
            <div class="filter-container" >
                <div id="gridsearchBtn">
                    {{$t('global.modelpathsetting')}}: <el-input v-model="jsonPath" style="margin-left: 10px; margin-right:20px;width: 200px" class="filter-item"></el-input>
                <el-button @click="gridsearch" type="success" plain class="filter-item">
                    {{$t('global.gridsearch')}}
                </el-button></div>
                
                <!-- <el-button v-waves :loading="downloadLoading" type="primary" class="filter-item" icon="el-icon-download"
                    @click="handleDownload">
                    Export
                </el-button> -->
           
            </div>

            <el-table id="gridsearchRes" :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row
                style="width: 95%;" @sort-change="sortChange" height="calc(100vh - 260px)">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                      <div style="padding-left: 20px; text-align: left;">
                        <span style="white-space: pre-line;font-family: monospace;line-height: 16px;
                        color: #e6a23c; font-size: 14px;" v-html="scope.row.settings"></span>
                      </div>
        
                    </template>
                  </el-table-column>
                <el-table-column label="Saved Path" min-width="150px">
                    <template slot-scope="{row}">
                        <span class="link-type">{{ row.path }}</span>
                    </template>
                </el-table-column>
                <el-table-column sortable prop="Accuracy" label="Accuracy" width="150px" align="center">
                </el-table-column>
                <el-table-column sortable prop="ROC-AUC" label="ROC-AUC" width="150px" align="center">
                </el-table-column>
                <el-table-column prop="Time(ms)" label="Time(ms)" width="150px" align="center">
                </el-table-column>
            </el-table>
        </div> </div>

    </div>
</template>
  
<script>
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import getSteps from './steps';
import { fetchPv, createArticle, updateArticle } from '@/api/article'
import { generateGridSearchSetting, getGridSearchResult,startGridsearch } from '@/api/silas'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import ace from 'ace-builds/src-noconflict/ace'
const calendarTypeOptions = [
    { key: 'CN', display_name: 'China' },
    { key: 'US', display_name: 'USA' },
    { key: 'JP', display_name: 'Japan' },
    { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
}, {})

export default {
    name: 'ComplexTable',
    components: { Pagination },
    directives: { waves },
    filters: {
        statusFilter(status) {
            const statusMap = {
                published: 'success',
                draft: 'info',
                deleted: 'danger'
            }
            return statusMap[status]
        },
        typeFilter(type) {
            return calendarTypeKeyValue[type]
        }
    },
    data() {
        return {
            jsonPath: 'silas-temp/results/settings.json',
            gridSettingJson: '-',
            tableKey: 0,
            list: null,
            total: 0,
            listLoading: true,
            listQuery: {
                page: 1,
                limit: 20,
                importance: undefined,
                title: undefined,
                type: undefined,
                sort: '+id'
            },
            importanceOptions: [1, 2, 3],
            calendarTypeOptions,
            sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
            statusOptions: ['published', 'draft', 'deleted'],
            showReviewer: false,
            temp: {
                id: undefined,
                importance: 1,
                remark: '',
                timestamp: new Date(),
                title: '',
                type: '',
                status: 'published'
            },
            dialogFormVisible: false,
            dialogStatus: '',
            textMap: {
                update: 'Edit',
                create: 'Create'
            },
            dialogPvVisible: false,
            pvData: [],
            rules: {
                type: [{ required: true, message: 'type is required', trigger: 'change' }],
                timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
                title: [{ required: true, message: 'title is required', trigger: 'blur' }]
            },
            downloadLoading: false
        }
    },
    computed:{
    language() {
        return this.$store.getters.language
      },
    refSrc() {
      return this.language === 'zh'
        ? 'https://depintel.com/documentation/v087_chinese/_build/html/usage/learning/grid-search.html'
        : 'https://depintel.com/documentation/v087/_build/html/usage/learning/grid-search.html#';
    },
  },


    created() {
        this.gengridSearch()
        // this.getList()
        this.getGridSearchRes()
        setTimeout(() => {
            this.editor = ace.edit(this.$refs.editorContainer);
            // this.editor.setTheme("ace/theme/merbivore_soft");
            // this.editor.session.setMode("ace/mode/javascript");

            this.editor.setValue("{}", -1)
            // this.editor.setReadOnly(true)
            // this.editor
        })
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
        gengridSearch() {
            let that = this
    
            generateGridSearchSetting().then((result) => {
                that.gridSettingJson = JSON.stringify(result.gridsearchjson)
                that.editor.setValue(JSON.stringify(result.gridsearchjson, null, 2), -1)
            })
        },
        getGridSearchRes() {
        let that = this
      
        getGridSearchResult().then((res)=>{
            this.list = res.data
            this.total = res.data.length
            this.listLoading = false
            // console.log('this.list',res.data)
            // console.log('this.total',res.data.length)


        })
      },
      gridsearch() {
        let that = this
        that.listLoading = true
        that.gridSettingJson = this.editor.session.getValue()
        startGridsearch({
            "jsonPath": that.jsonPath,
            "gridSettingJson": that.gridSettingJson
          }).then(()=>{
            that.getGridSearchRes()
        })
      },
        handleFilter() {
            this.listQuery.page = 1
            // this.getList()
        },
        handleModifyStatus(row, status) {
            this.$message({
                message: '操作Success',
                type: 'success'
            })
            row.status = status
        },
        sortChange(data) {
            const { prop, order } = data
            if (prop === 'id') {
                this.sortByID(order)
            }
        },
        sortByID(order) {
            if (order === 'ascending') {
                this.listQuery.sort = '+id'
            } else {
                this.listQuery.sort = '-id'
            }
            this.handleFilter()
        },
        resetTemp() {
            this.temp = {
                id: undefined,
                importance: 1,
                remark: '',
                timestamp: new Date(),
                title: '',
                status: 'published',
                type: ''
            }
        },
        handleCreate() {
            this.resetTemp()
            this.dialogStatus = 'create'
            this.dialogFormVisible = true
            this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate()
            })
        },
        createData() {
            this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                    this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
                    this.temp.author = 'vue-element-admin'
                    createArticle(this.temp).then(() => {
                        this.list.unshift(this.temp)
                        this.dialogFormVisible = false
                        this.$notify({
                            title: 'Success',
                            message: 'Created Successfully',
                            type: 'success',
                            duration: 2000
                        })
                    })
                }
            })
        },
        handleUpdate(row) {
            this.temp = Object.assign({}, row) // copy obj
            this.temp.timestamp = new Date(this.temp.timestamp)
            this.dialogStatus = 'update'
            this.dialogFormVisible = true
            this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate()
            })
        },
        
        handleFetchPv(pv) {
            fetchPv(pv).then(response => {
                this.pvData = response.data.pvData
                this.dialogPvVisible = true
            })
        },
        handleDownload() {
            this.downloadLoading = true
            import('@/vendor/Export2Excel').then(excel => {
                const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
                const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
                const data = this.formatJson(filterVal)
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: 'table-list'
                })
                this.downloadLoading = false
            })
        },
        formatJson(filterVal) {
            return this.list.map(v => filterVal.map(j => {
                if (j === 'timestamp') {
                    return parseTime(v[j])
                } else {
                    return v[j]
                }
            }))
        },
        getSortClass: function (key) {
            const sort = this.listQuery.sort
            return sort === `+${key}` ? 'ascending' : 'descending'
        }
    }
}
</script>
<style scoped>
.tutorial_btn{
    position: fixed;
    right: 0;
    font-size: 14px;
    z-index: 999;
    font-weight:800;
    height: 48px;
  }
.grid-container {
    display: flex;
}
</style>
  