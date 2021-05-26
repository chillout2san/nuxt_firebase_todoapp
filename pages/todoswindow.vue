<template>
  <div class="columns is-fullhd">
    <div class="column is-3">
      <Push />
    </div>
    <div class="column is-5">
      <Display />
    </div>
    <div class="column is-4">
      <WorkingDisplay />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  /* eslint-disable */
  created: function () {
    if (this.$accessor.users.is_email_verified === false) {
      this.$router.push('/');
    }
  },
});
</script>

<style scoped></style>
