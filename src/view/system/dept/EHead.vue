<template>
  <div class="main-content">
    <el-row class="searchContent">
      <el-col :span="5">
        <el-input v-model="name" clearable placeholder="输入部门名搜索" prefix-icon="el-icon-search"
                  style="width: 90%;"/>
      </el-col>
      <el-col :span="11">
        <el-button type="primary" icon="el-icon-search" @click="doSearch">搜索</el-button>
        <el-button type="success" icon="el-icon-plus" @click="addDept">新增</el-button>
        <el-button icon="el-icon-refresh-right" @click="refreshSearch">重置</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: 'Ehead',
        data() {
            return {
                name: ''
            };
        },
        methods: {
            doSearch() {
                alert(1);
            },
            addDept() {
                alert(2);
            },
            refreshSearch() {
                alert(3);
                this.name = '';
            }
        }
    };
</script>

<style scoped>

</style>
