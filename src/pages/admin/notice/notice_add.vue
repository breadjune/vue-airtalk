<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <card>
                        <template slot="header">
                            <h4 class="card-title">공지사항</h4>
                        </template>
                        <add-form></add-form>
                        <div style="display:inline;">
                            <b-button class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="primary" style="float:left" v-on:click="add">등록</b-button>
                            <b-button class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="primary" style="float:left" v-on:click="cancel">취소</b-button>
                        </div>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import addform from './add_form.vue'

export default {
    components : {
        'add-form' : addform
    },
    methods :{
        add(){
            console.log('notice_add.vue - add()');
        },
        cancel(){
            console.log('notice_add.vue - cancel()');
            this.$emit('rename','Content');
            this.$router.push('/admin/notice');
        }
    }
}
</script>