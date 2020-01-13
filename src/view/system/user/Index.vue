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
            <el-form ref="form" :model="user" :rules="rules" size="small" label-width="5vw">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="user.name" class="input-class"/>
                </el-form-item>

                <el-form-item label="账号" prop="loginName">
                    <el-input v-model="user.loginName" class="input-class"/>
                </el-form-item>

                <el-form-item label="电话" prop="phone">
                    <el-input v-model.number="user.phone" class="input-class" />
                </el-form-item>

                <!-- 部门-树形菜单-选择器-->
                <el-form-item label="部门" prop="dept">
                    <tree-select v-model="deptId" :options="deptOptions" :disable-branch-nodes="true" placeholder="请选择部门" @select="deptSelect" ></tree-select>
                </el-form-item>

                <!--角色选择-->
                <el-form-item label="角色" prop="roles">
                    <tree-select  v-model="roles" :options="roleOptions"  :multiple="true" :flat="true" :disable-branch-nodes="true" placeholder="请选择角色" ></tree-select>
                </el-form-item>

            </el-form>
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
    import treeSelect from '@riophae/vue-treeselect'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    import { addUser } from '@/api/system/user'
    export default {
        name: 'Index',
        components: { EHead,treeSelect,EForm  },
        data() {
            const searchObj={}
            const user={name:'',loginName:'',phone:''}
            //验证手机号码
            const validPhone = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入电话号码'))
                } else if (!this.isValidPhone(value)) {
                    callback(new Error('请输入正确的11位手机号码'))
                } else {
                    callback()
                }
            }
            //部门相关操作
            const deptId=null
            //角色相关操作
            const roles=null;
            return {
                deptName: '',userName:'',account:'',deptFilterName:'',searchObj,user,
                dialogTitle:'查看',dialogOpt:'look',isSubmit:false,validPhone,user,deptId,roles,
                rules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    loginName: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, trigger: 'blur', validator: validPhone }
                    ]
                }, deptOptions: [ {
                    id: '1',
                    label: '公司',
                    children: [ {
                        id: '2',
                        label: '财务部',
                        isNew: true,
                    }, {
                        id: '3',
                        label: '人事部',
                    }]
                } ],
                roleOptions: [ {
                    id: '1',
                    label: '财务部',
                    children: [ {
                        id: '2',
                        label: '财务总监',
                        isNew: true,
                    }, {
                        id: '3',
                        label: '会计',
                    }]
                } ,
                    {
                        id: '4',
                        label: '人事部',
                        children: [ {
                            id: '5',
                            label: '主任',
                            isNew: true,
                        }, {
                            id: '6',
                            label: 'HR',
                        }]
                    }
                ],
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

             }
             //是否新增
             if(this.searchObj.add){
                 this.dialogTitle="新增人员"
                 this.dialogOpt="add"
                 this.visible=true
             }
            },
            //弹出框按钮相关操作
            dialogButOpt(val){
                if(val==='cancel'){
                    this.visible=false
                }else if(val==='sure'){
                    //this.isSubmit=true
                    //this.visible=false
                    this.doSubmit()
                }
                //数据重置只适合在关闭时候使用
                //this.resetForm()
            },
            //表单验证结果处理
            subResult(val){
                this.isSubmit=false
            },
            //提交表单
            doSubmit(){
                this.$message({
                    message: '保存成功',
                    type: 'success'
                });
                this.$refs['form'].validate((valid) => {
                    //验证成功保存
                    if (valid) {
                        addUser(this.user).then(res=>{
                            // this.$notify({
                            //     title: '保存成功',
                            //     type: 'success',
                            //     duration: 2500
                            // })
                       })
                       return true
                    } else {
                       return false
                    }
                })
            },
            //正则
            isValidPhone(str) {
                const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/
                return reg.test(str)
            },
            //根据部门过滤角色
            deptSelect(node){

            },
            //表单重置
            resetForm(){
                //重置验证
                this.$refs['form'].resetFields()
                this.user = { name: '', loginName: '',  phone: '' }
                this.deptId=null
                this.roles=null
            },

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

    .input-class{
        width: 70%;
    }

</style>
