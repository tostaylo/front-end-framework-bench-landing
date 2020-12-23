<template>
  <div class="checkboxes">
    <span :key="type" v-for="type in typeArr">
      <label :value="type" :for="type">
        {{ type }}
      </label>
      <input
        :data-cy="type"
        :id="type"
        v-on:change="(e) => handleCheckbox(e, name)"
        :name="type"
        :checked="!filteredArr.includes(type)"
        type="checkbox"
      />
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default {
  props: {
    typeArr: Array as () => string[],
    filteredArr: Array as () => string[],
    handleCheckbox: Function,
    name: String,
  },
};
</script>

<style scoped>
.checkboxes {
  display: grid;
}

.checkboxes span {
  display: inline-grid;
  grid-template-columns: 50% 50%;
  text-align: left;
}
</style>