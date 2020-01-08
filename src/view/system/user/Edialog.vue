<template>
    <div class="main-content">
        <el-dialog :title="title" :visible.sync="visible" width="30%">
            <EForm></EForm>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import Eform from './Eform';
    export default {
        name: 'EForm',
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            title:{
                type: String,
                default:""
            },
            opt: {
                type: String,
                default:""
            }
        },
        components:{ Eform },
        watch:{
            visible(val){
                this.visible=val
            }
        }
    };
</script>

<style scoped>
    .main-content {
        width: 100%;
    }

</style>