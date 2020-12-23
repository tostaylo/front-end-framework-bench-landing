<template>
  <div class="route-main">
    <h1>{{ pageTitle }}</h1>
    <Main />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Main from "@/components/Main.vue"; // @ is an alias to /src

@Options({
  components: {
    Main,
  },
})
export default class Home extends Vue {
  data(): { pageTitle: string | symbol | null | undefined } {
    return { pageTitle: this.$router.currentRoute.value.name };
  }
}
</script>
