<template>
  <ul>
    <li v-for="item in items">
      {{ item }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'List',
  props: [
    'items',
  ],

  data() {
    return {
      a: 1,
    };
  },

  funcNotCalled() {
    return true;
  },

};
</script>
