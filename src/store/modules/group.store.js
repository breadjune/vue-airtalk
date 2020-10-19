console.log("group.store.js");

const groupStore = {
    namespaced: true,
    state: {
        memberList: [],
        memberInfo: {
            adminName: '',

        },
    },
    mutations: {
        successSelectGroupListBySearchWord(state, payload) {
            state.memberList = payload;
        },
        failSelectMemberListBySearchWord( /*state, payload*/ ) {
            console.log('ERROR!');
        },
        successUpdateMember(state, payload) {
            console.log("successUpdateMember");
        },
        failUpdateMember( /*state, payload*/ ) {
            console.log('ERROR!');
        },
        successGetMemberInfoBySeq(state, payload) {
            state.memberInfo = payload;
        },
    },
    getters: {
        memberList(state, /*getters*/ ) {
            return state.memberList;
        },
        memberInfo(state, /*getters*/ ) {
            return state.memberInfo;
        },
    },
    actions: {
        selectGroupListBySearchWord({ commit, /*state*/ }) {
            console.log("selectGroupListBySearchWord : " + arguments[1]);
            commit('successSelectGroupListBySearchWord', arguments[1]);
        },
        getMemberInfoBySeq({ commit, /*state*/ }) {
            commit('successGetMemberInfoBySeq', arguments[1]);
        }
    }
}

export default groupStore