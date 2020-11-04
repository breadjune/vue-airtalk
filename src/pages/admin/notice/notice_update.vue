<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <card>
                        <template slot="header">
                            <h4 class="card-title">공지사항 수정</h4>
                            <p class="card-category">여기는 공지사항 수정 입니다.</p>
                            <hr>
                        </template>
                        <add-form></add-form>
                        <div style="display:inline;">
                            <b-button class="btn-fill mb-2 mr-sm-2 mb-sm-1" variant="primary" style="float:left" v-on:click="add">저장</b-button>
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
}
</script>