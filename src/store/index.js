import Vue from 'vue'
import Vuex from 'vuex'

// 작성한 모듈을 가져옵니다.
import dataStore from './modules/data.store.js'
import memberStore from './modules/member.store.js'
import groupStore from './modules/group.store.js'
import loginStore from './modules/Login.store.js'

Vue.use(Vuex)

console.log("index.js");

const store = new Vuex.Store({
    modules: {
        // 키: 값 형태로 저장됩니다.
        dataStore: dataStore,
        memberStore: memberStore,
        groupStore: groupStore,
        loginStore: loginStore
    }
})

export default store