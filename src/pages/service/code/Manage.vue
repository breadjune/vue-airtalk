<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
          >
            <template slot="header">
              <h3 class="card-title">서비스 코드 관리</h3>
              <hr>
            </template>
            <search :options="options" @keywordSearch="searchData"></search>
            <b-table
                id="my-table"
                striped
                hover
                selectable
                select-mode="single"
                :fields="fields"
                :items="row.data"
                 sort-icon-left
                :per-page="page.perPage"
            >
              <template #cell(btnShow)="row">
                <div class="text-center">
                     <b-button class='btn btn-fill btn-danger' @click="del(row.item)" id='delBtn'>삭제</b-button>
                </div>
              </template>
            </b-table>
            <div id="noData" v-if="row.noData" style="text-align:center; height:100px">
              데이터가 없습니다.
            </div>
              <b-pagination 
                v-show="row.default"
                v-model="page.currentPage"
                :total-rows="page.totalPage"
                :per-page="page.perPage"
                @change="handle"
                aria-controls="my-table"
                style="position:relative;justify-content:center;margin-bottom:0;"
              ></b-pagination>
                  <div>  
                  <b-button class="btn btn-fill mb-2 mr-sm-2 mb-sm-1"
                  variant="primary"
                  @click="movePage()"
                  >추가
                </b-button>
              </div>
               <app-my-modal
                :title="title"
                :visible.sync="visible">
                <div>
                  {{modalData}}
                </div> 
              </app-my-modal>
              <confirm
                :status="modal.status"
                :header="modal.header"
                :body="modal.body"
                @isCancel="toggle"
                @isOk="remove">
                <div>
                  {{modalData}}
                </div> 
              </confirm>    
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Card from 'src/components/Cards/Card.vue'
  import Search from '@/layout/Search.vue'
  import axios from 'axios'
  import Modal from '@/layout/Modal.vue'
  import axioMixin from "@/components/axioMixin"
  import Confirm from '@/layout/Confirm.vue'
  const tableHeaders = [ 'NO.','Code', 'Code 이름', '등록일']
  const tableColumns = [ 'seq','code', 'codeName', 'regDate']
  export default {
    components: {
      Card,
      Search,
      appMyModal: Modal,
      Confirm
    },
    mixins: [axioMixin],
    data () {
      return {
        visible: false,
        modalData: "",
        title:"서비스 코드 관리",
        resultS: "",
        delData:"",
        msg:{
              success: "정상 처리되었습니다.",
              fail: "실패 하였습니다. ",
            },
        page: {
          currentPage: 1,
          perPage: 4,
          totalPage: 0
        },
        row: {
          default: true,
          noData: false,
          headers: [...tableHeaders],
          columns: [...tableColumns],
          data: [],
          btnData: "<b-button class='btn btn-fill btn-danger' id='delBtn'>삭제</b-button>"
        },
        form: {
            keyword: '',
            type: 'all',
            start: '0',
            length: ''
            },
        fields: [
          { key: "seq", label: "NO.", sortable: true },
          { key: "code",label: "Code", sortable: true },
          { key: "codeName", label: "Code 이름", sortable: true },
          { key: "regDate", label: "등록일", sortable: true},
          { key: "btnShow", label: ""  }
        ],
        options: [
            {value: "code", text: tableHeaders[1]},
            {value: tableColumns[2], text: tableHeaders[2]}
        ],
        modal: {
          status: false,
          header: "",
          body: "",
          headerMsg: {
            alert: "확인",
            create: "등록",
            modify: "수정",
            delete: "삭제"
          },
          bodyMsg:{
            delete: "정말 삭제 하시겠습니까?",
            fail: "저장 실패 하였습니다. 정보를 확인해주세요.",
            title: "제목을 입력해 주세요.",
            content: "내용을 입력해 주세요."
          }
        }
      }
    },
     computed: {
      rows() {
        return this.row.data.length
      }
    },
      watch: {
           visible(){  //모달이 닫히면 false 체크
              if(this.visible==false && this.resultS=="S"){
                  this.$emit("rename", "Content");
                   this.$router.push("/service/codeManage");
               }
           }
        },
    mounted () {
      this.init();
    },
    methods: {
        init: async function () {
        // var res = await this.request("/restapi/svcCode/list", this.form);
        // console.log("Cdoe data : " + JSON.stringify(res));
        this.page.totalPage = await this.request("/restapi/svcCode/count",this.form);
        console.log("카운트" + this.page.totalPage);
        this.form.length = String(this.page.perPage);
        var res = await this.request("/restapi/svcCode/search", this.form);
        //seq 추가
        for (var i = 0; i <res.length ; i++ )
        { res[i]['seq'] = i+1;} 
        this.row.data = res;
      },
    //페이지 핸들
      async handle(page) {
        console.log("page : " + page);
        console.log("current Page : " + this.page.currentPage);
        this.form.start = String(page-1);
        var response = await this.request("/restapi/svcCode/search", this.form);
        //seq 추가
        for (var i = 0; i <response.length ; i++ )
        {response[i]['seq'] = (4*page)-3+i; } 
        this.row.data = response;
        },
      async searchData(form) {
          this.form.keyword = form.searchWord;
          this.form.type = form.searchType;
          this.form.start = "0";
          this.form.length = String(this.page.perPage);
          this.page.totalPage = await this.request("/restapi/svcCode/count", this.form);

          //데이터 없음 화면 및 페이징 UI 변경
          if(this.page.totalPage !== 0) {
            this.row.default = true;
            this.row.noData = false
          }
          else {
            this.row.default = false;
            this.row.noData = true;
          }
          var response = await this.request("/restapi/svcCode/search", this.form);
          console.log("code Data : " + JSON.stringify(response));
         //seq 추가
          for (var i = 0; i <response.length ; i++ )
          { response[i]['seq'] = i+1; } 
        this.row.data = response;
      },
      // onRowSelected(items) {
      //   console.log("items "+JSON.stringify(items));
      //   this.delData = items;
      //   this.$emit('rename', 'Content');
      //   this.$router.push({
      //   name: "CodeView",
      //   params: { 
      //       code : items.code,
      //       codeName: items.codeName,
      //       regDate: items.regDate,
      //   },
      // });
      // },
      toggle(){
        this.modal.status = !this.modal.status; 
      },
      del(items){
        this.modal.header = this.modal.headerMsg.delete;
        this.modal.body = this.modal.bodyMsg.delete;
        this.delData = items.code;
        console.log("item code : "+this.delData);
        this.toggle();
      },
      remove() {
        console.log("Del items "+JSON.stringify(items));

      //  let data ={
      //         code: items.code
      //         };
      //   if(confirm("삭제 하시겠습니까?") == true) {
      //         console.log(items.code);
              axios.post("/restapi/svcCode/remove", data)
                            .then((result) => {
                        if(result.data.result == "SUCCESS") {
                            this.title= result.data.result;
                            this.modalData= this.msg.success;
                            this.visible = !this.visible;
                            this.resultS= "S";
                            this.init();
                        }
                        else {
                            this.title= result.data.result;
                            this.modalData= this.msg.fail;
                            this.visible = !this.visible;
                            this.resultS= "F";
                        }
                    }); 
                // }
                // else {
                //     return false;
                // }
      },
      movePage() {
        this.$emit('rename', 'Content');
        this.$router.push("/service/codeCreate");
      },
      
    },
  }
</script>
<style TYPE="text/css">

#my-table ,#noData{
  font-size: 0.8rem;
  height: calc(1.5em + 0.75rem + 4px);
  color: rgb(100, 100, 100);
  }

#text{
 color: rgb(100, 100, 100);
 font-size: 0.8rem;
}

body{
  font-size: 0.8rem;
}

#my-table > thead > tr > th {
font-weight: bold;
 }

#delBtn{
    padding: 0.4rem;
    border: 0px;
}
/* .table>thead>tr>th{ 
  text-align: center!important;
} */

/* #btnTD{
  width:10%

}

table > thead > tr > th:nth-child(1) { width:5%; }
table > thead > tr > th:nth-child(2) { width:10%; }
table > thead > tr > th:nth-child(3) { width:15%; } */
 

</style>