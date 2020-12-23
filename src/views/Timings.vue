<template>
  <div class="route-main">
    <h1>{{ pageTitle }}</h1>
    <page-list :listType="pageTitle" :displayObject="timings"></page-list>
  </div>
</template>



<script lang="ts">
import { Definition } from "../types/index";
import PageList from "@/components/PageList.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { "page-list": PageList },
  props: {
    timings: Object as () => Record<string, Definition>,
    pageType: String,
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