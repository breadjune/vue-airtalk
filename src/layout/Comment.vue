<template>
<b-form>
  <div>
    <label for="contents">댓글 작성</label>
    <b-form-textarea id="contents" name="contents" type="text"></b-form-textarea>
    <hr>
    <div v-for="(item, index) in data" :key="index">
      <slot :row="item">
          <p class="uname"><b>{{item.userId}}</b></p>
          <p class="mdate">{{item.modDate}}</p>
          <p class="comment" v-html="item.comment">{{item.comment}}</p>
          <hr>
        <!-- {{item.userId}} -->
      </slot>
    </div>
  </div>
</b-form>
</template>
<script>
  export default {
    data() {
      return {
        data: [
          { userId: "youngjun93", modDate: "2020.11.14 15:30", comment: '댓글 테스트입니다. <br> 안녕하세요'},
          { userId: "gksjs3468", modDate: "2020.11.14 15:30", comment: '댓글 테스트입니다2.'},
          { userId: "sss424", modDate: "2020.11.14 15:30", comment: '댓글 테스트입니다3.'},
          { userId: "hddkkll", modDate: "2020.11.14 15:30", comment: '댓글 테스트입니다4.'},
          { userId: "atingle", modDate: "2020.11.14 15:30", comment: '댓글 테스트입니다5.'},
          { userId: "test123", modDate: "2020.11.14 15:30", comment: '댓글 테스트입니다6.'},
          { userId: "test456", modDate: "2020.11.14 15:30", comment: '댓글 테스트입니다7.'},
          { userId: "test789", modDate: "2020.11.14 15:30", comment: '댓글 테스트입니다8.'},
          { userId: "test000", modDate: "2020.11.14 15:30", comment: '댓글 테스트입니다9.'},
        ],
        columns: ['userId','modDate','comment'],
      }
    },
    props: {
      // columns: Array,
      // data: Array,
      // bCode: String
    },
    methods: {
      itemValue (item, column) {
        return item[column]
      }
    }
  }
</script>
<style>
.uname, .mdate {
  margin-bottom : 0;
}
.mdate {
  font-size: 13px;
  color: rgb(153,153,153);
}
.comment {
  border: 1.5px solid;
  height: 100px;
  border-radius: 5px;
  border-color: rgb(153,153,153);
}
</style>
