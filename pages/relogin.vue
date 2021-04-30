<template>
  <form class="box">
    <p class="has-text-centered pb-2 has-text-weight-bold is-size-6">
      ご指定のメールアドレスに認証メールを送信しました。
    </p>
    <p class="has-text-centered pb-2 has-text-weight-bold is-size-6">
      メール内のリンクからアカウントを認証してください。
    </p>
    <nuxt-link to="/">
    <div class="has-text-centered">
      <button class="button is-centered is-rounded is-primary ">ログイン画面に戻る</button>
    </div>
    </nuxt-link>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style></style>
