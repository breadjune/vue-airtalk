import axios from 'axios'

const axioMixin = {
    data() {
        return {
            URL_PREFIX: '',
        };
    },
    methods: {
        async request() {
            try {
                const res = await axios.post(this.URL_PREFIX + arguments[0], arguments[1]);
                // if(res.headers.authcheck === "false") {
                //     this.$router.push('/login');
                // }
                return res.data;
            } catch (error) {
                console.log(error);
            }
        }
    },
};

export default axioMixin
