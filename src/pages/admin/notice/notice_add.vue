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
                            <button class="btn-info btn-fill" variant="primary" style="float:left" v-on:click="add">등록</button>
                            <button class="btn-info btn-fill" variant="primary" style="float:left" v-on:click="add">취소</button>
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
}
</script>