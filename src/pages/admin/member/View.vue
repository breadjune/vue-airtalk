<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <card>
                        <template slot="header">
                            <h4 class="card-title">계정 관리</h4>
                            <p class="card-category">*비밀번호 변경을 원하지 않을 경우 기존 비밀번호 입력 하십시오.</p>
                            <hr>
                        </template>
                        <b-form>
                            <div>
                                <label for="adminId">사용자ID</label>
                                <b-input id="amdinId" name="adminId" type="text" v-model="adminId" readonly></b-input>
                            </div>
                            <div>
                                <label for="adminName">사용자명</label>
                                <b-input id="adminName" name="adminName" type="text" v-model="adminName" readonly></b-input>
                            </div>
                            <div>
                                <label for="password">비밀번호</label>
                                <b-input id="password" name="password" type="password" v-model="password" :disabled="pwPhoneEmail ? '' : disabled" maxlength="20"></b-input>
                            </div>
                            <div v-show="inputAdminGroupSelect">
                                <label for="passwordCheck">비밀번호 확인</label>
                                <b-input id="passwordCheck" name="passwordCheck" type="password" v-model="passwordCheck" :disabled="pwPhoneEmail ? '' : disabled" maxlength="20"></b-input>
                            </div>
                            <div>
                                <label for="phone">H.P</label>
                                <b-input id="phone" name="phone" type="text" v-model="phone" :disabled="pwPhoneEmail ? '' : disabled" maxlength="11"></b-input>
                            </div>
                            <div>
                                <label for="email">E-Mail</label>
                                <b-input id="email" name="email" type="text" v-model="email" :disabled="pwPhoneEmail ? '' : disabled"></b-input>
                            </div>
                            <div>
                                <label for="adminGroup" v-show='inputAdminGroup'>사용자그룹</label>
                                <label for="adminGroupSelect" v-show='inputAdminGroupSelect'>사용자그룹</label>
                                <b-input id="adminGroup" name="adminGroup" type="text" v-model="adminGroup" readonly v-show='inputAdminGroup'></b-input>
                                <b-form-select id="adminGroupSelect" name="adminGroupSelect" v-model="adminGroupSeq" v-show='inputAdminGroupSelect'>
                                    <option value="1">관리자</option>
                                    <option value="2">USER</option>
                                    <option value="5">TEST</option>
                                </b-form-select>
                            </div>
                            <div>
                                <label for="regDate">등록일</label>
                                <b-input id="regDate" name="regDate" type="text" v-model="regDate" readonly></b-input>
                            </div>
                            <br>
                            <div class="text-center">
                                <b-button id="modifyBtn" variant="primary" class="btn btn-fill mb-2 mr-sm-2 mb-sm-0" @click="modify()" v-show="btnModify">수정</b-button>
                                <b-button id="saveBtn" variant="success" class="btn btn-fill mb-2 mr-sm-2 mb-sm-0" @click="save()" v-show="btnSave">저장</b-button>
                                <b-button id="deleteBtn" variant="danger" class="btn btn-fill mb-2 mr-sm-2 mb-sm-0" @click="del()">삭제</b-button>
                                <b-button id="listBtn" variant="info" class="btn btn-fill mb-2 mr-sm-2 mb-sm-0" @click="list()">목록</b-button>
                            </div>
                        </b-form>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    
    export default {
        data() {
            return {
                adminId: "",
                adminName: "",
                adminGroup: "",
                adminGroupSeq: "",
                regDate: "",
                password: "",
                passwordCheck: "",
                phone: "",
                email: "",
                btnModify: true,                // 수정 버튼 표시 or 숨김
                btnSave: false,           // 저장, 삭제 버튼 표시 or 숨김
                pwPhoneEmail: true,             // phone, e-mail disable, undisable
                inputAdminGroup: true,          // adminGroup disable, undisable
                inputAdminGroupSelect: false,   // adminGroupSelect disable, undisable
            }
        },

        watch: {
            // phone에 숫자가 아닌 다른 문자가 들어올 경우 삭제 처리
            phone : function() {
                return this.phone = this.phone.replace(/[^0-9]/g, '');
            }
        },

        created() {
            this.adminInfo();
        },

        methods: {
            adminInfo: function() {
                axios.get("/rest/admin/view.json?adminId=" + this.$route.params.adminId).then((result) => {
                    this.adminId = result.data.adminId;
                    this.adminName = result.data.adminName;
                    this.adminGroup = result.data.adminGroup.name;
                    this.adminGroupSeq = result.data.adminGroupSeq;
                    this.password = result.data.password;
                    this.regDate = result.data.regDate.substring(0,10);
                    this.phone = result.data.phone;
                    this.email = result.data.email;

                });
            },

            modify() {
                this.password = "";
                this.btnModify = false;
                this.btnSave = true;
                this.pwPhoneEmail = false;
                this.inputAdminGroup = false;
                this.inputAdminGroupSelect = true;
            },

            save() {
                if (this.phone == null || this.phone == "" || this.phone.length < 10) {
                    alert("핸드폰 번호를 확인 하세요.");
                }
                else if (this.password.length < 10) {
                    alert("비밀번호는 최소 10자리 이상 입력하세요.");
                }
                else if (this.password != this.passwordCheck) {
                    alert("변경할 비밀번호와 일치하지 않습니다.");
                }
                else if (this.email == null || this.email == "" || this.email.indexOf('@') <= 0) {
                    alert("E-mail을 입력란을 확인 하세요.");
                }
                else {
                    var formData = new FormData();
                    formData.append('adminId', this.adminId);
                    formData.append('adminGroupSeq', this.adminGroupSeq);
                    formData.append('password', this.password);
                    formData.append('phone', this.phone);
                    formData.append('email', this.email);

                    axios.post("/rest/admin/update.json", formData).then((result) =>  {
                        // 정상 처리 될 경우 리스트 화면으로 이동
                        if(result.data == 'SUCCESS') {
                            alert("정상 수정 되었습니다.");
                            this.$emit('rename', 'Content');
                            this.$router.push("/admin/member-list");
                        }
                        else {
                            alert("저장에 실패하였습니다.");
                        }
                    });
                }
            },

            del() {
                if(confirm("삭제 하시겠습니까?") == true) {
                    console.log(this.adminId);
                    axios.get("/rest/admin/delete.json", { params: { adminId: this.adminId } }).then((result) => {
                        if(result.data == "SUCCESS") {
                            alert("정상 삭제 되었습니다.");
                            this.$emit('rename', 'Content');
                            this.$router.push("/admin/member-list");
                        }
                        else {
                            alert("삭제 실패 하였습니다.");
                            this.$emit('rename', 'Content');
                            this.$router.push("/admin/member-list");
                        }
                    });
                }
                else {
                    return false;
                }
            },

            list() {
                this.$emit('rename', 'Content');
                this.$router.push("/admin/member-list");
            }
        }
    }
</script>