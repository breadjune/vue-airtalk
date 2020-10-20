import axios from "axios";

console.log("login.store.js");

const resourHost = 'http://localhost:8080'

const loginStore = {
    state: {
        name: '',
        errorCode: '',
        adminGroupSeq: '',
        isAuth: false
    },
    getters: {
        getName: state => state.uid,
        getErrorCode: state => state.errorCode,
        getAdminGroupSeq: state => state.adminGroupSeq,
        getIsAuth: state => state.isAuth
    },
    mutations: {
        /*loginComplete (state, {name, errorCode, adminGroupSeq, isAuth}) {
            state.name = name
            state.errorCode = errorCode
            state.adminGroupSeq = adminGroupSeq
            state.isAuth = isAuth
        }*/
        loginComplete (state, data) {
            state.name = data.name
            state.errorCode = data.errorCode
            state.adminGroupSeq = data.adminGroupSeq
            state.isAuth = data.isAuth
        }
    },
    actions: {
        LOGIN ({commit}) {
            // return axios.post(`${resourHost}/login.json`, {uid, password})
            //     .then(({data}) => {
            //         commit('LOGIN', data)
            //     })
            commit('loginComplete', data)
        }
    }
}

export default loginStore