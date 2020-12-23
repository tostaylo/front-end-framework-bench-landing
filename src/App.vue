<template>
  <div>
    <nav id="nav">
      <span :key="link.name" v-for="(link, idx) in links">
        <router-link :exact="link.exact" :to="link.url">{{
          link.name
        }}</router-link
        ><!-- eslint-disable-next-line vue/no-parsing-error-->
        {{ idx < links.length - 1 ? " | " : "" }}
      </span>
    </nav>
    <router-view
      v-if="
        timingResults.length > 0 &&
        Object.keys(frameworks).length > 0 &&
        Object.keys(metrics).length > 0 &&
        Object.keys(timings).length > 0
      "
      :timingResults="timingResults"
      :frameworks="frameworks"
      :metrics="metrics"
      :timings="timings"
    />
  </div>
</template>

<script lang="ts">
import { TimingResult, Definition } from "@/types/index";
import { fetchData } from "@/utils/index";
import { defineComponent } from "vue";
import { Pages } from "@/router/pages";

const { HomePage, Frameworks, Metrics, Comparison, Timings } = Pages;

const Component = defineComponent({
  name: "App",
  data() {
    return {
      timingResults: [] as TimingResult[],
      metrics: {} as Record<string, Definition>,
      frameworks: {} as Record<string, Definition>,
      timings: {} as Record<string, Definition>,
      links: [
        { name: HomePage.name, url: HomePage.path, exact: true },
        { name: Frameworks.name, url: Frameworks.path },
        { name: Metrics.name, url: Metrics.path },
        { name: Timings.name, url: Timings.path },
        { name: Comparison.name, url: Comparison.path },
      ],
    };
  },

  async mounted() {
    const trTask = fetchData<TimingResult[]>(`/trace-results.no-throttle.json`);
    const mrTask = fetchData<Record<string, Definition>>(
      "/metric-definitions.json"
    );
    const frTask = fetchData<Record<string, Definition>>(
      "/framework-definitions.json"
    );
    const tTask = fetchData<Record<string, Definition>>(
      "/timing-definitions.json"
    );
    this.timingResults = (await trTask) as TimingResult[];
    this.metrics = (await mrTask) as Record<string, Definition>;
    this.frameworks = (await frTask) as Record<string, Definition>;
    this.timings = (await tTask) as Record<string, Definition>;
  },
});
export default Component;
</script>

<style>
html {
  overflow-x: hidden;
  overflow-y: scroll;
}
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  color: white;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

nav {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  flex-wrap: wrap;
  width: 100%;
}

nav a {
  margin: 0 5px;
  text-underline-position: under;
  transition: all 0.2s;
}

nav a:hover {
  color: lightgray;
}

select {
  height: 30px;
  max-width: 145px;
}

label {
  text-align: left;
}

button {
  cursor: pointer;
  display: inline-block;
  box-sizing: border-box;
  text-decoration: none;
  border: none;
  border-radius: 3px;
  font-weight: 300;
  color: #333;
  background-color: lightgray;
  text-align: center;
  transition: all 0.2s;
  height: 40px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #98a3ad;
  background: hsl(200, 7%, 8%);
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  min-height: 100vh;
}

.route-main {
  box-sizing: border-box;
  display: grid;
  justify-content: center;
  width: 100%;
  padding: 30px;
  grid-template-columns: 100%;
}
</style>
