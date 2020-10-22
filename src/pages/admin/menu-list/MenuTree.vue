<template>
    <div>
        <h4>메뉴 트리</h4>
        <button v-on:click="NumOne">1메뉴</button>
        <button v-on:click="NumThree">3메뉴</button>
    </div>
</template>
<script>
export default {
    methods : {
        NumOne(){
            this.$emit('reSearchId','1');
        },
        NumThree() {
            this.$emit('reSearchId','3');
        }
    },
}
</script>