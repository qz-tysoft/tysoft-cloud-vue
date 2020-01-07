<template>
    <div class="container">
        <ehead @acceptSearch="acceptSearch"></ehead>
        <div class="content-left">
            <el-tree :data="data"  default-expand-all @node-click="handleNodeClick" :filter-node-method="filterNode" ref="tree"></el-tree>
        </div>
        <div class="content-right">

        </div>
    </div>

</template>

<script>
    import Ehead from './Ehead';
    export default {
        name: 'index',
        components: { Ehead },
        data() {
            const searchObj={}
            return {
                deptName: '',userName:'',account:'',deptFilterName:'',searchObj,
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
                }]
                // defaultProps: {
                //     children: 'children',
                //     label: 'lable'
                // }
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
             if(this.searchObj.deptName!=""){
                 this.$refs.tree.filter(this.searchObj.deptName);
             }else{
                 this.$refs.tree.filter("");
             }
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

</style>
