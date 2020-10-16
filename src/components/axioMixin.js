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
                return res.data;
            } catch (error) {
                console.log(error);
            }
        }
    },
};

export default axioMixin
