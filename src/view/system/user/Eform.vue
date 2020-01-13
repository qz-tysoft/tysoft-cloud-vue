<template>
    <div class="main-content">
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

         <!--部门-树形菜单-选择器-->
         <el-form-item label="部门" prop="dept">
             <tree-select v-model="deptId" :options="deptOptions" :disable-branch-nodes="true" placeholder="请选择部门" @select="deptSelect" ></tree-select>
         </el-form-item>

        <!--角色选择-->
         <el-form-item label="角色" prop="roles">
             <tree-select  v-model="roles" :options="roleOptions"  :multiple="true" :flat="true" :disable-branch-nodes="true" placeholder="请选择角色" ></tree-select>
         </el-form-item>

    </el-form>
    </div>
</template>

<script>
    import treeSelect from '@riophae/vue-treeselect'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    export default {
        name: 'Eform',
        components:{ treeSelect },
        data(){
           // const user={name:'张三',loginName:'zhangs',phone:'13505921345'}
            const user=this.userObj
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
            return{
                validPhone,user,deptId,roles,
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
            },
                deptOptions: [ {
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
                ]
          }
        },
        props:{
            reset: {
                type: Boolean,
                default:true
            },
            userObj:{
                type:Object
            },
            isSubmit :{
                type: Boolean,
                default:false
            },
            addUserFlag:{
               type:Number,
               require:true
            }
        },
        watch:{
            //每次新增的shi
            addUserFlag(val){
                alert(val)
            }
        },
        mounted: function() {
          //初始化界面表单数据
          //  this.resetForm()
        },
        methods:{
            //正则
            isValidPhone(str) {
                const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/
                return reg.test(str)
            },
            //根据部门过滤角色
            deptSelect(node){

            },
            //重置表单
            resetForm(){
               if(this.reset){
                   this.isSubmit=false
                   this.user = { name: '', loginName: '',  phone: '' }
               }
            },
            //提交表单
            doSubmit(){
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.$emit('subResult', true)
                    } else {
                        this.$emit('subResult', false)
                    }
                })
            }
        },
        watch:{
            isSubmit(val){
                if(val){
                    this.doSubmit()
                }
            }
        }
    };
</script>

<style scoped>
    .input-class{
        width: 70%;
    }


</style>