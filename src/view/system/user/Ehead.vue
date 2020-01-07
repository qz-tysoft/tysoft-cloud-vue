<template>
    <div class="main-content">
        <el-row class="content">
            <el-col :span="5">
                <el-input v-model="deptName" clearable placeholder="输入部门名称" prefix-icon="el-icon-search"
                          style="width: 90%;"/>
            </el-col>
            <el-col :span="4">
                <el-input v-model="userName" clearable placeholder="输入用户名称" prefix-icon="el-icon-search"
                          style="width: 90%;"/>
            </el-col>
            <el-col :span="4">
                <el-input v-model="account" clearable placeholder="输入用户账号" prefix-icon="el-icon-search"
                          style="width: 90%;"/>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </el-col>
            <el-col :span="2">
                <el-button type="success" icon="el-icon-plus">新增</el-button>
            </el-col>
            <el-col :span="2">
                <el-button icon="el-icon-refresh-right">重置</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'Ehead',
        data() {
            const searchObj={deptName:'',userName:'',account:''}
            const deptName=''
            const userName=''
            const account=''
            return{
                searchObj,deptName,userName,account
            }
        },
        watch: {
            deptName(val) {
                this.deptName = val
                this.searchObj.deptName=val
                this.$emit('acceptSearch', this.searchObj)
            },
            userName(val) {
                this.userName = val
                this.searchObj.userName=val
                this.$emit('acceptSearch', this.searchObj)
            },
            account(val) {
                this.account = val
                this.searchObj.account=val
                this.$emit('acceptSearch', this.searchObj)
            }
        },
    };
</script>

<style scoped>
    .main-content {
        height: 100%;
        width: 100%;
    }

    .content {
        height: 100%;
        width: 100%;
    }
</style>