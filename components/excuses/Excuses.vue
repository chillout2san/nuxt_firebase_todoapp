<template>
  <div class="box">
    <h1 class="pb-2 has-text-weight-bold">言い訳リスト</h1>
    <!-- 言い訳の入力フォームや各種ボタン -->
    <div class="field is-grouped">
      <div class="control">
        <input
          v-model="excuse"
          class="input is-primary is-small"
          placeholder="例）明日から本気出す"
        />
      </div>
      <div class="control">
        <button
          class="button is-primary is-small has-text-weight-bold"
          @click.prevent="makeExcuse"
        >
          言い訳をする
        </button>
        <button
          class="button is-light is-primary is-small has-text-weight-bold"
          @click.prevent="clearExcuse"
        >
          言い訳を心にしまう
        </button>
        <button
          class="button is-light is-small has-text-weight-bold"
          @click.prevent="setExcusesData"
        >
          みんなの言い訳を見る
        </button>
      </div>
    </div>
    <!-- 言い訳内容を表示する -->
    <table class="table is-hoverable">
      <thead>
        <tr>
          <th class="nowrap">ID</th>
          <th class="nowrap">言い訳</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(anexcuse, index) in excusesArray" :key="index">
          <td>{{ anexcuse.excuse_id }}</td>
          <td>{{ anexcuse.excuse }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      excuse: '',
      excuses: this.$accessor.excuses.excuses,
    };
  },
  computed: {
    excusesArray() {
      return this.$accessor.excuses.excuses;
    },
  },
  methods: {
    clearExcuse() {
      this.excuse = '';
    },
    makeExcuse() {},
    setExcusesData() {
      this.$accessor.excuses.setExcuses();
    },
  },
});
</script>

<style scoped>
.box {
  overflow: scroll;
}
</style>
