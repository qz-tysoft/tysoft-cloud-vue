<template>
    <div class="container">
        <e-head @acceptSearch="acceptSearch"></e-head>
        <div class="content-left">
            <el-tree :data="data"  default-expand-all @node-click="handleNodeClick" :filter-node-method="filterNode" ref="tree"></el-tree>
        </div>
        <div class="content-right">
            <el-table>
                <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                <el-table-column prop="account" label="账号" align="center"></el-table-column>
                <el-table-column prop="phone" label="电话" align="center"></el-table-column>
                <el-table-column prop="creatTime" label="创建日期" align="center"></el-table-column>
                <el-table-column prop="available" label="是否启用" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--  界面弹窗  -->
        <el-dialog :title="dialogTitle" :visible.sync="visible" width="30%">
            <EForm :is-submit="isSubmit" :user-obj="user" @subResult="subResult"></EForm>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogButOpt('cancel')">取消</el-button>
                <el-button type="primary" @click="dialogButOpt('sure')">确定</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
    import EHead from './Ehead';
    import EForm from './Eform';
    export default {
        name: 'Index',
        components: { EHead, EForm  },
        data() {
            const searchObj={}
            const user={name:'张三',loginName:'zhangs',phone:'13505921345'}
            return {
                deptName: '',userName:'',account:'',deptFilterName:'',searchObj,user,
                dialogTitle:'查看',dialogOpt:'look',isSubmit:false,
                data: [{
                    label: '公司',
                    id:1,
                    children: [
                        {
                        label: '财务部',
                        id:2
                        },
                        {
                            label: '人事部',
                            id:3
                        }

                    ]
                }],visible:false
            };

        },
        created() {
        },
        methods: {
            //树形点击方法
            handleNodeClick(data) {

            },
            //树形节点过滤
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            //接收头部参数
            acceptSearch(val){
             this.searchObj=val
             //树形节点过滤
             if(this.searchObj.deptName!=""){
                 this.$refs.tree.filter(this.searchObj.deptName);
             }else{
                 this.$refs.tree.filter("");
             }
             //是否查询
             if(this.searchObj.query){
                // alert("我在查询")
             }
             //是否新增
             if(this.searchObj.add){
                 this.dialogTitle="新增人员"
                 this.dialogOpt="add"
                 this.user={}
                 this.visible=true
             }
            },
            //弹出框按钮相关操作
            dialogButOpt(val){
                if(val==='cancel'){
                    this.visible=false
                }else if(val==='sure'){
                    this.isSubmit=true
                }
            },
            //表单验证结果处理
            subResult(val){
                this.isSubmit=false
                this.visible=!val
            }
        }
    };
</script>

<style scoped>
    .content-left {
        width: 20%;
        height: 100px;
        float: left;
    }

    .content-right {
        width: 80%;
        height: 100px;
        float: left;
    }

</style>
