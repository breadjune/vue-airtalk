console.log("member.store.js");

const memberStore = {
    namespaced: true,
    state: {
        memberList: [],
        memberInfo: {
            adminName: '',

        },
    },
    mutations: {
        successSelectMemberListBySearchWord(state, payload) {
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
        memberList(state /*getters*/ ) {
            return state.memberList;
        },
        memberInfo(state /*getters*/ ) {
            return state.memberInfo;
        },
    },
    actions: {
        selectMemberListBySearchWord({ commit, /*state*/ }) {
            console.log("selectMemberListBySearchWord : " + arguments[1]);
            commit('successSelectMemberListBySearchWord', arguments[1]);
        },
        getMemberInfoBySeq({ commit, /*state*/ }) {
            commit('successGetMemberInfoBySeq', arguments[1]);
        }
    }
}

export default memberStore