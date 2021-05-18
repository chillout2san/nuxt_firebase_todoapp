<template>
  <div>
    <!-- タイトル部分 -->
    <header class="box">
      <div class="is-size-1 has-text-weight-bold">
        <strong>T</strong>a-Su-Ku
      </div>
      <button
        class="button is-primary has-text-weight-bold"
        @click="displayAbout"
      >
        about
      </button>
    </header>
    <!-- aboutボタン押下時のモーダルウィンドウ -->
    <div :class="display">
      <div class="modal-background" @click="displayAbout"></div>
      <div class="modal-content">
        <div class="box">
          <div class="message is-primary">
            <div class="message-header is-size-5">
              <p>Ta-Su-Kuの使い方</p>
            </div>
            <div class="message-body">
              <p>①簡単なタスク管理アプリです</p>
              <p>②編集画面</p>
            </div>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" @click="displayAbout"></button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      display: 'modal',
    };
  },
  computed: {},
  methods: {
    displayAbout() {
      if (this.display === 'modal') {
        this.display = 'modal is-active';
      } else {
        this.display = 'modal';
      }
    },
  },
});
</script>

<style scoped>
.box {
  text-align: center;
}

strong {
  color: rgb(95, 206, 179);
}
</style>
