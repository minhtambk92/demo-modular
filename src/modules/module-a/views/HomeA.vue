<template>
  <div>
    <p>This is Module A</p>
    <hello-world />
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue';

export default {
  name: 'homeA',
  components: { HelloWorld },
};
</script>

<style>

</style>
