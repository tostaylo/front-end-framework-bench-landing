<template>
  <div class="main">
    <p>
      Welcome to the project landing page for
      <a
        rel="noopener noreferrer"
        href="https://github.com/tostaylo/front-end-framework-bench"
        target="_blank"
        >Front-End Framework Bench</a
      >, an automated testing suite focused on comparing performance of
      client-side frameworks. The project utilizes
      <a
        rel="noopener noreferrer"
        href="https://github.com/puppeteer/puppeteer"
        target="_blank"
        >Puppeteer </a
      >to simulate user input (mouse clicks for example) and
      <a
        rel="noopener noreferrer"
        href="https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference"
        target="_blank"
        >Google Chrome Developer Tools Performance Timeline</a
      >
      traces to analyze and record timings of the interaction.
    </p>
    <h3>Methodology</h3>
    <p>
      I'll be the first to admit these tests will not hold up to scientific
      scrutiny. For one, I wrote the app for each framework being tested, and
      I'm no expert with any of them. There are at least two concerns. One is
      utilizing each framework to maximize performance. The other being the most
      desired idiomatic representation of the specific framework's code. I
      addressed neither concern. Instead, I built each app to be as similar as
      possible with a minimalist approach.
    </p>
    <p>
      Each app was built to output identical HTML structure and request the same
      CSS file. Timings were averaged out of 12 runs throwing out the lowest two
      scores.
    </p>
    <p>
      The apps were built to simply create, update, or delete HTML Table element
      rows. I acknowledge these actions are far from what most robust
      client-side applications require.
    </p>
    <h3>Environment</h3>
    <ul>
      <li>MacBook Pro (Retina, 15-inch, Mid 2015)</li>
      <li>2.5GHz Quad-Core Intel Core i7 Processor</li>
      <li>16GB 1600 MHz DDR3 Memory</li>
      <li>Chrome version - HeadlessChrome/86.0.4240.0</li>
    </ul>
    <h3>Disclaimer</h3>
    <p>
      One of the featured frameworks is
      <a
        rel="noopener noreferrer"
        href="https://github.com/tostaylo/rust-fel"
        target="_blank"
        >rust-fel</a
      >
      (Rust Front-End-Library). I produced this library as an experiment.
      Front-End Framework Bench was an avenue to satisfy my curiosity on how it
      compared to other client-side library/frameworks.
    </p>
    <p>
      Front-End Framework Bench was inspired by
      <a
        rel="noopener noreferrer"
        href="https://github.com/krausest/js-framework-benchmark"
        target="_blank"
        >JS-Framework-Bench</a
      >. All credit goes to the owners of that repository.
    </p>
    <h3>Example</h3>
    <p>
      Below are example screenshots for "Create K" (Create 1,000 table rows)
      using the Vue framework.
    </p>
    <figure class="image-container">
      <figcaption>Before Click</figcaption>
      <img loading="lazy" alt="no action" src="../assets/no_action.webp" />
    </figure>
    <figure class="image-container">
      <figcaption>After Click</figcaption>
      <img loading="lazy" alt="post click" src="../assets/post_click.webp" />
    </figure>

    <p>
      Below is an example screenshot for a performance trace conducted for
      "Create K" (Create 1,000 table rows) using the Vue framework.
    </p>
    <figure class="image-container">
      <figcaption>Performance Timeline</figcaption>
      <img loading="lazy" alt="post click" src="../assets/perf_timeline.webp" />
    </figure>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    msg: String,
  },
})
export default class Main extends Vue {
  msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  text-align: left;
}
h3 {
  margin: 30px 0 10px 0;
}
p {
  margin: 5px 0;
}
.image-container {
  width: 100%;
  max-width: 900px;
  margin: 20px 0;
}
img {
  width: 100%;
  height: auto;
}
caption {
  width: 100%;
}
a {
  text-underline-position: under;
}
</style>
