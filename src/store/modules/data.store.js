console.log("data.store.js");

const dateStore = {
    namespaced: true,
    state: {
        list: [],
        auth: [],
        info: {
            name: '',
            total: 0,
            currentPage: 1,
        },
    },
    mutations: {
        insertList(state, payload) {
            state.list = payload;
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
        insertTotal(state, payload) {
            state.Info.total = payload;
        },
    },
    getters: {
        getList(state, /*getters*/ ) {
            return state.list;
        },
        adminGroupAuth(state, /*getters*/ ) {
            return state.auth;
        },
        getInfo(state, /*getters*/ ) {
            return state.info;
        },
    },
    actions: {
        insertList({ commit, /*state*/ }) {
            commit('insertList', arguments[1]);
        },
        insertTotal({ commit, /*state*/ }) {
            commit('insertTotal', arguments[1]);
        }
    }
}

export default dateStore