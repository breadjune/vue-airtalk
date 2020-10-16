import Vue from 'vue'
import Vuex from 'vuex'

// 작성한 모듈을 가져옵니다.
import memberStore from './modules/member.store.js'

Vue.use(Vuex)

console.log("index.js");

const store = new Vuex.Store({
    modules: {
        // 키: 값 형태로 저장됩니다.
        memberStore: memberStore
    }
})

export default store