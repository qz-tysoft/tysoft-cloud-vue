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
        <!--  界面操作相关弹窗  -->
        <e-dialog :visible="visible" :title="dialogTitle" :opt="dialogOpt" @dialogOpt=""></e-dialog>
    </div>

</template>

<script>
    import EHead from './Ehead';
    import EDialog from './Edialog';
    export default {
        name: 'Index',
        components: { EHead, EDialog },
        data() {
            const searchObj={}
            return {
                deptName: '',userName:'',account:'',deptFilterName:'',searchObj,
                dialogTitle:'查看',dialogOpt:'look',
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
                this.visible=true
                this.dialogTitle="新增人员"
                this.dialogOpt="add"
             }
            },
            //弹出框相关操作
            dialogOpt(val){

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
