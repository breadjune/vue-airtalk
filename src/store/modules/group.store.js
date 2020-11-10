console.log("group.store.js");

const groupStore = {
    namespaced: true,
    state: {
        memberList: [],
        adminGroupAuth: [],
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
        successGetGroupInfoBySeq(state, payload) {
            state.memberInfo = payload;
        },
    },
    getters: {
        memberList(state /*getters*/ ) {
            return state.memberList;
        },
        adminGroupAuth(state, /*getters*/ ) {
            return state.memberList;
        },
        memberInfo(state, /*getters*/ ) {
            return state.memberInfo;
        },
    },
    actions: {
        selectGroupListBySearchWord({ commit, /*state*/ }) {
            commit('successSelectGroupListBySearchWord', arguments[1]);
        },
        getGroupInfoBySeq({ commit, /*state*/ }) {
            commit('successGetGroupInfoBySeq', arguments[1]);
        }
    }
}

export default groupStore