<template>
  <div class="container">
    <e-head @acceptSearch="acceptSearch"></e-head>
    <div class="content-left">
      <el-tree :data="deptData" default-expand-all @node-click="handleNodeClick" :filter-node-method="filterNode"
               ref="tree"></el-tree>
    </div>
    <div class="content-right">
      <el-table v-loading="loading" :data="data" size="small" style="width: 100%;margin-top: 1vh">
        <el-table-column prop="loginName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="account" label="账号" align="center"></el-table-column>
        <el-table-column prop="phone" label="电话" align="center"></el-table-column>
        <el-table-column label="创建日期" align="center">
          <template slot-scope="scope">
            <div>{{ parseTime(scope.row.creatTime) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="available" label="是否启用" align="center">
          <template slot-scope="scope" class="center-vertical">
            <div v-if="scope.row.available" class="available-div" @click="changeUserState($event,scope.row)">启用</div>
            <div v-if="!scope.row.available" class="available-div" @click="changeUserState($event,scope.row)"
                 style="background-color: red">禁用
            </div>
          </template>

        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="userEdit(scope.row)"
            >编辑
            </el-button>

            <el-popover
              :ref="scope.row.id"
              placement="top"
              width="180">
              <p>确定删除本条数据吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                <el-button type="primary" size="mini"  @click="handleUserDelete(scope.row.id)">确定</el-button>
              </div>
              <el-button
                slot="reference"
                type="text"
                icon="el-icon-delete"
                style="color:red"
              >删除
              </el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <el-pagination
        :total="total"
        :current-page="page + 1"
        style="margin-top: 1vh;margin-left: 0.8vw"
        layout="total, prev, pager, next, sizes"
        @size-change="sizeChange"
        @current-change="pageChange"/>
    </div>
    <!--  界面弹窗  -->
    <el-dialog :title="dialogTitle" :visible.sync="visible" :close-on-click-modal="false" width="30%"
               @close="resetForm">
      <el-form ref="form" :model="user" :rules="rules" size="small" label-width="5vw">
        <el-form-item label="姓名" prop="loginName">
          <el-input v-model="user.loginName" class="input-class"/>
        </el-form-item>

        <el-form-item label="账号" prop="account">
          <el-input v-model="user.account" class="input-class"/>
        </el-form-item>

        <el-form-item label="电话" prop="phone">
          <el-input v-model.number="user.phone" class="input-class"/>
        </el-form-item>

        <!-- 部门-树形菜单-选择器-->
        <el-form-item label="部门" prop="dept">
          <tree-select v-model="deptId" :options="deptOptions" :disable-branch-nodes="true"
                       placeholder="请选择部门" @select="deptSelect"></tree-select>
        </el-form-item>

        <!--角色选择-->
        <el-form-item label="角色" prop="roles">
          <tree-select v-model="roles" :options="roleOptions" :multiple="true" :flat="true"
                       :disable-branch-nodes="true" placeholder="请选择角色"></tree-select>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialogButOpt('cancel')">取消</el-button>
                <el-button :loading="delLoading" type="primary" @click="dialogButOpt('sure')">确定</el-button>
            </span>
    </el-dialog>
  </div>

</template>

<script>
    import EHead from './EHead';
    import EForm from './EForm';
    import treeSelect from '@riophae/vue-treeselect';
    import '@riophae/vue-treeselect/dist/vue-treeselect.css';
    import { addUser, isExistAccount, changeUserState, del } from '@/api/system/user';
    import initData from '@/mixins/initData';
    import { parseTime } from '@/utils/time';

    export default {
        name: 'Index',
        components: { EHead, treeSelect, EForm },
        mixins: [initData],
        data() {
            const searchObj = {};
            const user = { name: '', loginName: '', phone: '' };
            //验证手机号码
            const validPhone = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入电话号码'));
                } else if (!this.isValidPhone(value)) {
                    callback(new Error('请输入正确的11位手机号码'));
                } else {
                    callback();
                }
            };
            //验证账号是否存在
            const accountFlag = false;
            const validAccount = (rule, value, callback) => {
                this.isExistAccount(callback);
            };
            //部门相关操作
            const deptId = null;
            //角色相关操作
            const roles = null;
            return {
                deptName: '',
                userName: '',
                account: '',
                deptFilterName: '',
                searchObj,
                user,
                dialogTitle: '查看',
                dialogOpt: 'look',
                isSubmit: false,
                validPhone,
                validAccount,
                deptId,
                roles,
                accountFlag,
                editUserAccountInit: '',
                rules: {
                    loginName: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    account: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
                        { required: true, trigger: 'blur', validator: validAccount, trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, trigger: 'blur', validator: validPhone }
                    ]
                },
                deptOptions: [{
                    id: '1',
                    label: '公司',
                    children: [{
                        id: '2',
                        label: '财务部',
                        isNew: true
                    }, {
                        id: '3',
                        label: '人事部'
                    }]
                }],
                roleOptions: [{
                    id: '1',
                    label: '财务部',
                    children: [{
                        id: '2',
                        label: '财务总监',
                        isNew: true
                    }, {
                        id: '3',
                        label: '会计'
                    }]
                },
                    {
                        id: '4',
                        label: '人事部',
                        children: [{
                            id: '5',
                            label: '主任',
                            isNew: true
                        }, {
                            id: '6',
                            label: 'HR'
                        }]
                    }
                ],
                deptData: [{
                    label: '公司',
                    id: 1,
                    children: [
                        {
                            label: '财务部',
                            id: 2
                        },
                        {
                            label: '人事部',
                            id: 3
                        }

                    ]
                }],
                visible: false,
                delLoading:false
            };
        },
        //初始化数据
        created() {
            //此处的得到的渲染数据需要对DOM进行操作
            this.$nextTick(() => {
                this.init();
            });
        },
        methods: {
            //时间工具类
            parseTime,
            //初始数据
            pageParamsInit() {
                this.url = 'api/user/queryUserByPage';
                const sort = 'creatTime,desc';
                this.params = {
                    page: this.page, size: this.size, sort: sort, loginName: this.searchObj.loginName
                    , account: this.searchObj.account
                };
                return true;
            },
            //树形点击方法
            handleNodeClick(data) {

            },
            //树形节点过滤
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            //接收头部参数
            acceptSearch(val) {
                this.searchObj = val;
                //树形节点过滤
                if (this.searchObj.deptName != '') {
                    this.$refs.tree.filter(this.searchObj.deptName);
                } else {
                    this.$refs.tree.filter('');
                }
                //是否查询
                if (this.searchObj.query) {
                    this.init();
                }
                //是否新增
                if (this.searchObj.add) {
                    this.dialogTitle = '新增人员';
                    this.dialogOpt = 'add';
                    this.visible = true;
                }
            },
            //弹出框按钮相关操作
            dialogButOpt(val) {
                if (val === 'cancel') {
                    this.visible = false;
                    this.resetForm();
                } else if (val === 'sure') {
                    this.doSubmit();
                }
            },
            //表单验证结果处理
            subResult(val) {
                this.isSubmit = false;
            },
            //提交表单
            doSubmit() {
                this.$refs['form'].validate((valid) => {
                    //验证成功保存
                    if (valid) {
                        addUser(this.user).then(res => {
                            this.$notify({
                                title: '保存成功',
                                type: 'success',
                                duration: 2500
                            });
                            //保存成功关闭并重置
                            this.visible = false;
                            this.resetForm();
                            this.init();
                        });
                        return true;
                    } else {
                        return false;
                    }
                });
            },
            //正则
            isValidPhone(str) {
                const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/;
                return reg.test(str);
            },
            //根据部门过滤角色
            deptSelect(node) {

            },
            //表单重置
            resetForm() {
                //重置验证
                this.$refs['form'].resetFields();
                this.user = { name: '', loginName: '', phone: '' };
                this.deptId = null;
                this.roles = null;
            },
            //当前账号是否存在
            isExistAccount(callback) {
                const params = { account: this.user.account };
                isExistAccount(params).then(res => {
                    if (res === 'REPEAT') {
                        //编辑状态下重复的话排除是他本身的值
                        if (this.dialogOpt === 'edit') {
                            if (this.editUserAccountInit === this.user.account) {
                                callback();
                            } else {
                                callback(new Error('当前账号已存在！请重新输入'));
                            }
                        } else {
                            callback(new Error('当前账号已存在！请重新输入'));
                        }
                    } else {
                        callback();
                    }
                });
            },
            //改变用户状态
            changeUserState(node, row) {
                const text = node.toElement.innerHTML;
                const params = { available: false, id: row.id, text: '禁用', background: '#13ce66' };
                if (text === '禁用') {
                    params.text = '启用';
                    params.background = '#13ce66';
                    params.available = true;
                } else if (text === '启用') {
                    params.text = '禁用';
                    params.background = '#ff0000';
                    params.available = false;
                }
                changeUserState(params).then(res => {
                    //成功回调
                    node.toElement.style.background = params.background;
                    node.toElement.innerHTML = params.text;
                });

            },
            userEdit(node) {
                //双重转换避免直接操作数据行
                const objStr = JSON.stringify(node);
                this.user = JSON.parse(objStr);
                this.editUserAccountInit = node.account;
                this.dialogTitle = '人员编辑';
                this.dialogOpt = 'edit';
                this.visible = true;
            },
            handleUserDelete(id){
                this.$refs[id].doClose()
                this.dleChangePage()
                this.delLoading=true
                del({id:id}).then(res=>{
                    this.$notify({
                        title: '删除成功',
                        type: 'success',
                        duration: 2500
                    });
                    this.delLoading=false
                    this.init();
                })
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

  .input-class {
    width: 70%;
  }

  .available-div {
    /*宽度30%,剩下70%,左边偏35%刚好居中*/
    width: 36%;
    height: 3vh;
    cursor: pointer;
    background-color: #13ce66;
    border-radius: 0.5vh;
    margin-left: 32%;
    color: white;
  }

  .center-vertical {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: justify;
  }

</style>
