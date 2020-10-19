<template>
        <button style="width=50px ; height=50px" v-on:click="sendEvent">child2</button>
</template>
<script>
let param={
    id:'test',
    pwd:'123'
}
export default {
    methods:{
        sendEvent:function(){
            this.$emit('renew',param);
        }
    }
}
</script>