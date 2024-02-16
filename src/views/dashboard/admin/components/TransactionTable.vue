<template>
  <el-table :height="450" :data="data" style="width: 100%;padding-top: 15px; padding-bottom: 15px;">
   <el-table-column label="Path" min-width="130">
      <template slot-scope="scope">
        {{ scope.row.path }}
      </template>
    </el-table-column>
    <el-table-column label="Type" width="100" align="center">
      <template slot-scope="{row}">
        <el-tag :type="row.type | statusFilter">
          {{ row.type }}
        </el-tag>
      </template>
    </el-table-column> 
    <el-table-column label="Action" width="200" align="center">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-download" plain circle></el-button>
        <el-button type="danger" icon="el-icon-delete" plain circle></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { transactionList } from '@/api/remote-search'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        validation: 'success',
        train: 'default'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  props: {
    data: {
      type: Array,
      default: []
    }},
  data() {
    return {
      // list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      transactionList().then(response => {
        this.list = response.data.items.slice(0, 8)
      })
    }
  }
}
</script>
<style>
.el-table__body{
  padding-bottom: 15px;
  padding-left: 15px;
}
.el-table__header, .el-table__body, .el-table__footer{
  padding-left: 15px;
}
</style>
