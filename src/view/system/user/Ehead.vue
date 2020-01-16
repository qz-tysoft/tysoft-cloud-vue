<template>
    <div class="main-content">
        <el-row class="content">
            <el-col :span="5">
                <el-input v-model="deptName" clearable placeholder="输入部门名称" prefix-icon="el-icon-search"
                          style="width: 90%;"/>
            </el-col>
            <el-col :span="4">
                <el-input v-model="loginName" clearable placeholder="输入用户名称" prefix-icon="el-icon-search"
                          style="width: 90%;"/>
            </el-col>
            <el-col :span="4">
                <el-input v-model="account" clearable placeholder="输入用户账号" prefix-icon="el-icon-search"
                          style="width: 90%;"/>
            </el-col>
            <el-col :span="11">
                <el-button type="primary" icon="el-icon-search" @click="doSearch">搜索</el-button>
                <el-button type="success" icon="el-icon-plus" @click="addUser">新增</el-button>
                <el-button icon="el-icon-refresh-right" @click="refreshSearch">重置</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'Ehead',
        data() {
            const searchObj={deptName:'',loginName:'',account:'', query:false ,add:false }
            const deptName=''
            const loginName=''
            const account=''
            return{
                searchObj,deptName,loginName,account
            }
        },
        watch: {
            deptName(val) {
                this.deptName = val
                this.searchObj.deptName=val
                this.$emit('acceptSearch', this.searchObj)
            },
            loginName(val) {
                this.loginName = val
                this.searchObj.loginName=val
                this.$emit('acceptSearch', this.searchObj)
            },
            account(val) {
                this.account = val
                this.searchObj.account=val
                this.$emit('acceptSearch', this.searchObj)
            }
        },
        methods:{
            //查询
            doSearch(){
                //做相关查询
                this.searchObj.query=true
                this.$emit('acceptSearch', this.searchObj)
                this.searchObj.query=false
            },
            //新增用户
            addUser(){
                //相关新增操作
                this.searchObj.add=true
                this.$emit('acceptSearch', this.searchObj)
                this.searchObj.add=false
            },
            //重置查询条件
            refreshSearch(){
                this.deptName=""
                this.loginName=""
                this.account=""
                this.searchObj={deptName:'',loginName:'',account:''}
                this.$emit('acceptSearch', this.searchObj)
            }
        }
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
