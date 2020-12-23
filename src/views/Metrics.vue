<template>
  <div class="route-main">
    <h1>{{ pageTitle }}</h1>
    <page-list :listType="pageTitle" :displayObject="metrics"></page-list>
  </div>
</template>



<script lang="ts">
import { Definition } from "../types/index";
import PageList from "@/components/PageList.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { "page-list": PageList },
  props: {
    metrics: Object as () => Record<string, Definition>,
  },
  data(): { pageTitle: string | symbol | null | undefined } {
    return { pageTitle: this.$router.currentRoute.value.name };
  },
});
</script>

<style scoped>
.route-main {
  text-align: left;
}
</style>