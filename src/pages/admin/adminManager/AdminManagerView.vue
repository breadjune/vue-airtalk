<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <card class="strpied-tabled-with-hover"
                        body-classes="table-full-width table-responsive">

                        <template slot="header">
                            <h4 class="card-title">Admin Manager</h4>
                            <p class="card-category">계정 관리</p>
                        </template>
                        <b-container fluid>
                            <b-row>
                                <b-col>
                                    <label for="adminId">사용자ID</label>
                                    <b-input id="amdinId" name="adminId" type="text" v-model="adminId" readonly></b-input>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <label for="adminName">사용자명</label>
                                    <b-input id="adminName" name="adminName" type="text" v-model="adminName" readonly></b-input>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <label for="adminGroup">사용자그룹</label>
                                    <b-input id="adminGroup" name="adminGroup" type="text" v-model="adminGroupSeq" readonly></b-input>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <label for="regDate">등록일</label>
                                    <b-input id="regDate" name="regDate" type="text" v-model="regDate" readonly></b-input>
                                </b-col>
                            </b-row>
                        </b-container>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },

        mounted() {
            console.log("this.$route.params.adminId");

            console.log(this.$route.params.adminId);

            // this.adminInfo();
        },

        // methods: {
        //     amdinInfo() {
        //         axios.post("/rest/admin-list/getAdminInfo", this.$route.params.adminId).then((result) => {
        //             console.log(result.data);
        //         })
        //     }
        // }

        
    }
</script>
