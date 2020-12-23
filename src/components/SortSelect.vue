<template>
  <div class="select-container">
    <label for="name">{{ label }}</label>
    <select
      :data-cy="name"
      v-on:change="
        $emit('select-change', { value: $event.target.value, sortType: name })
      "
      :value="sortType"
      :name="name"
      :id="name"
    >
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    options: Array as () => string[],
    name: String,
    sortType: String,
    label: String,
  },
});
</script>

<style scoped>
.select-container {
  width: 100%;
  display: grid;
  grid-template-columns: 35% 65%;
}
</style>