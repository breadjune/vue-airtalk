<template>
  <b-modal v-model="status" id="modal-scoped"
    size="sm"
    :header-bg-variant="'danger'"
    :header-text-variant="'light'">

    <template #modal-header="{}">
      <h5 style="margin:0">{{header}}</h5>
    </template>

    <template>
      <p style="text-align:center">{{body}}</p>
    </template>

    <template #modal-footer="{}">
      <!-- Emulate built in modal footer ok and cancel button actions -->
      <b-button size="sm" class="btn btn-fill btn-primary" style="margin-right:3px" @click="$emit('isOk', true)">
        확인
      </b-button>
      <b-button v-if="header !== 'alert'" size="sm" class="btn btn-fill btn-danger" @click="cancel">
        취소
      </b-button>
    </template>
  </b-modal>
</template>
<script>
export default {
  name: 'my-modal',
  data() {
    return {
      alertFlag: false
    }
  },
  props: {
    status: {
        type: Boolean,
        require: false
    },
    header: {
        type: String,
        require: false,
        default: "확인"
    },
    body: {
        type: String,
        require: false
    }
  },
  watch: {
      header() {
          console.log("confirm : " + this.header);
      }
  },
  methods: {
      cancel() {
          this.status = false;
          this.$emit('isCancel', false);
      }
  }
}
</script>
<style>
.modal .modal-content .modal-footer {
    justify-content: flex-end;
}
.modal .modal-content .modal-header {
    padding: 10px;
}
</style>