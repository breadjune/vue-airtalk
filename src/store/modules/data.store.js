console.log("data.store.js");

const dateStore = {
    namespaced: true,
    state: {
        List: [],
        Auth: [],
        Info: {
            Name: '',
        },
    },
    mutations: {
        selectList(state, payload) {
            state.List = payload;
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
        getInfo(state, payload) {
            state.Info = payload;
        },
    },
    getters: {
        memberList(state, /*getters*/ ) {
            return state.Info;
        },
        adminGroupAuth(state, /*getters*/ ) {
            return state.Auth;
        },
        memberInfo(state, /*getters*/ ) {
            return state.Info;
        },
    },
    actions: {
        selectList({ commit, /*state*/ }) {
            commit('selectList', arguments[1]);
        },
        getInfo({ commit, /*state*/ }) {
            commit('getInfo', arguments[1]);
        }
    }
}

export default dateStore