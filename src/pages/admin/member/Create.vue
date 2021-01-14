<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <card>
                        <template slot="header">
                            <h4 class="card-title">계정 관리</h4>
                            <p class="card-category">계정 생성</p>
                            <hr>
                        </template>
                        <b-form>
                            <div>
                                <label for="adminId">사용자ID</label>
                                <b-input id="amdinId" name="adminId" type="text" v-model="adminId" placeholder="E-mail 형식으로 작성"></b-input>
                            </div>
                            <div>
                                <label for="adminName">사용자명</label>
                                <b-input id="adminName" name="adminName" type="text" v-model="adminName"></b-input>
                            </div>
                            <div>
                                <label for="password">비밀번호</label>
                                <b-input id="password" name="password" type="password" v-model="password" maxlength="20"></b-input>
                            </div>
                            <div>
                                <label for="passwordCheck">비밀번호 확인</label>
                                <b-input id="passwordCheck" name="passwordCheck" type="password" v-model="passwordCheck" :disabled="pwPhoneEmail ? '' : disabled" maxlength="20"></b-input>
                            </div>
                            <div>
                                <label for="phone">H.P</label>
                                <b-input id="phone" name="phone" type="text" v-model="phone" maxlength="11" placeholder="-를 제외한 번호만 입력"></b-input>
                            </div>
                            <div>
                                <label for="email">E-Mail</label>
                                <b-input id="email" name="email" type="text" v-model="email"></b-input>
                            </div>
                            <div>
                                <label for="adminGroupSelect">사용자그룹</label>
                                <b-form-select id="adminGroupSelect" name="adminGroupSelect" v-model="adminGroupSeq">
                                    <option value="1" default>관리자</option>
                                    <option value="2">USER</option>
                                    <option value="5">TEST</option>
                                </b-form-select>
                            </div>
                            <br>
                            <div class="text-center">
                                <b-button id="saveBtn" variant="success" class="btn btn-fill mb-2 mr-sm-2 mb-sm-0" @click="save()">저장</b-button>
                                <b-button id="listBtn" variant="info" class="btn btn-fill mb-2 mr-sm-2 mb-sm-0" @click="list()">취소</b-button>
                            </div>
                            <confirm
                                :status="modal.status"
                                :header="modal.header"
                                :body="modal.body"
                                :redirect="modal.redirect"
                                @isCancel="toggle"
                            >
                            <div>
                            {{modalData}}
                            </div> 
                            </confirm>    
                        </b-form>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import Confirm from '@/layout/Confirm.vue'
    
    export default {
        components: {
            Confirm
        },
        data() {
            return {
                adminId: "",
                adminName: "",
                adminGroupSeq: "1",
                regDate: "",
                password: "",
                passwordCheck: "",
                phone: "",
                email: "",
                modal: {
                    status: false,
                    header: "",
                    body: "",
                    redirect: false
                }
            }
        },

        watch: {
            // phone에 숫자가 아닌 다른 문자가 들어올 경우 삭제 처리
            phone : function() {
                return this.phone = this.phone.replace(/[^0-9]/g, '');
            }
        },

        methods: {
            save() {
                if (this.adminId == null || this.adminId == "" || this.adminId.indexOf('@') <= 0) {
                    this.modal.header = "확인";
                    this.modal.body = "email 형식으로 작성해주세요.";
                    this.toggle();
                }
                else if (this.phone == null || this.phone == "" || this.phone.length < 10) {
                    this.modal.header = "확인";
                    this.modal.body = "휴대폰 번호 형식이 아닙니다.";
                    this.toggle();
                }
                else if (this.password.length < 10) {
                    this.modal.header = "확인";
                    this.modal.body = "비밀번호는 최소 10자리 이상 입력하세요.";
                    this.toggle();
                }
                else if (this.password != this.passwordCheck) {
                    this.modal.header = "확인";
                    this.modal.body = "비밀번호가 일치하지 않습니다.";
                    this.toggle();
                }
                else if (this.email == null || this.email == "" || this.email.indexOf('@') <= 0) {
                    this.modal.header = "확인";
                    this.modal.body = "email형식이 아닙니다.";
                    this.toggle();
                }
                else {
                    var formData = new FormData();
                    formData.append('adminId', this.adminId);
                    formData.append('adminName', this.adminName);
                    formData.append('adminGroupSeq', this.adminGroupSeq);
                    formData.append('password', this.password);
                    formData.append('phone', this.phone);
                    formData.append('email', this.email);

                    axios.post("/rest/admin/create.json", formData).then((result) =>  {
                        // 정상 처리 될 경우 리스트 화면으로 이동
                        if(result.data == 'SUCCESS') {
                            this.modal.header = "확인";
                            this.modal.body = "계정이 생성 되었습니다.";
                            this.modal.redirect = true
                            this.toggle();
                        }
                        else {
                            // alert("저장에 실패하였습니다.");
                            this.modal.header = "확인";
                            this.modal.body = "생성에 실패하였습니다.";
                            this.modal.active = ""
                            this.toggle();
                        }
                    });
                }
            },
            toggle(value) {
                this.modal.status = !this.modal.status; 
                if(value) this.list();
            },
            list() {
                this.$emit('rename', 'Content');
                this.$router.push({
                    name: "MemberManage"
                });
            }
        }
    }
</script>