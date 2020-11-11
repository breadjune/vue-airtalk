<template>
  <div class="my-modal"
    v-if="visible" @click.self="handleWrapperClick">
    <div class="my-modal__dialog">
      <header class="my-modal__header">
        <span>{{title}}</span><hr/>
      </header> 
      <div class="my-modal__body">
        <slot></slot>
      </div>
      <div class="my-modal__btn">
       <b-button class="btn btn-fill btn-primary" @click="$emit('update:visible', !visible)">닫기</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-modal',
  props: {
    visible: {
      type: Boolean,
      require: true,
      default: false
    },
    title: {
      type: String,
      require: false,
    },
  },
  methods: {
    handleWrapperClick(){
      this.$emit('update:visible', false)
    },
  },
}
</script>

<style lang="scss">
$module: 'my-modal';
.#{$module} {
  // This is modal bg
  background-color: rgba(0,0,0,.7);
  top: 0; right: 0; bottom: 0; left: 0;
  position: fixed;
  overflow: auto;
  margin: 0;
  //This is modal layer
  &__dialog{
    left: 40%;
    top: 8%;
    width: 500px;
    position: absolute;
    background: #fff;
    margin-bottom: 50px;
    border:1px solid #000;
    border-radius: 20px;
    box-shadow: 3px 3px 3px 3px rgb(58, 58, 58);
  }

  &__header {
    font-size: 15px;
    font-weight: bold;
    text-align: left;
    line-height: 1.1;
    padding: 16px 16px 0 16px;
    position: relative;
  }
  &__body {
    font-size: 20px;
    font-weight: bold;
    padding: 25px;
    min-height: 100px;
    max-height: 500px;
    overflow-y: scroll;
  }
  &__btn {
     padding: 0 15px 5px 5px;
    min-height: 10px;
    float: right;
  }

}
</style>