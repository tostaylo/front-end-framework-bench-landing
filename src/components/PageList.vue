<template>
  <ul :data-cy="listType">
    <li v-for="value in displayObject" :key="value">
      <a
        rel="noopener noreferrer"
        target="_blank"
        v-if="value.url"
        :href="value.url"
        ><h3>{{ value.display_name }}</h3></a
      >
      <h3 v-else>{{ value.display_name }}</h3>
      <p v-if="value.definition">{{ value.definition }}</p>
    </li>
  </ul>
</template>



<script lang="ts">
import { Definition } from "../types/index";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    displayObject: Object as () => Record<string, Definition>,
    listType: String,
  },
});
</script>

<style scoped>
h3 {
  margin-bottom: 5px;
}
p {
  margin: 0;
}
a {
  text-underline-position: under;
}
</style>