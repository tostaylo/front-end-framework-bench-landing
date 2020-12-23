<template>
  <div class="route-main">
    <h1>{{ pageTitle }}</h1>
    <div class="form-container">
      <div class="form">
        <div class="throttle-container">
          <sort-select
            v-on:select-change="handleSelect"
            :name="throttledSelect.name"
            :label="throttledSelect.label"
            :options="throttledSelect.options"
            :sortType="throttledSelect.sortType"
          ></sort-select>
        </div>
        <check-boxes
          :key="item.name"
          :name="item.name"
          v-for="item in filterCheckboxes"
          :typeArr="item.typeArr"
          :filteredArr="item.filteredArr"
          :handleCheckbox="handleCheckbox"
        ></check-boxes>

        <div class="sort-container">
          <sort-select
            v-on:select-change="handleSelect"
            v-for="item in sortSelects"
            :key="item.name"
            :name="item.name"
            :label="item.label"
            :options="item.options"
            :sortType="item.sortType"
          ></sort-select>
        </div>
      </div>
    </div>
    <results-table
      :processedTimingResults="processedTimingResults"
      :tableColumnNames="tableColumnNames"
    ></results-table>
  </div>
</template>


<script lang="ts">
import { TimingResult, Definition } from "../types/index";
import { fetchData } from "@/utils/index";
import Table from "@/components/Table.vue";
import Checkboxes from "@/components/Checkboxes.vue";
import SortSelect from "@/components/SortSelect.vue";
import { defineComponent } from "vue";

type MetricFrameworkType = "timing_type" | "timing_framework";

type TimingType =
  | "total_dur"
  | "render_during_click"
  | "render_after_click"
  | "click_dur";

type ThrottleType = "No throttle" | "4x slowdown";

type ColumnType = MetricFrameworkType | TimingType;

const Component = defineComponent({
  components: {
    "results-table": Table,
    "check-boxes": Checkboxes,
    "sort-select": SortSelect,
  },

  data() {
    return {
      filteredFrameworks: [] as string[],
      filteredMetrics: [] as string[],
      processedTimingResults: this.timingResults,
      defaultTimingResults: this.timingResults,
      defaultTimingResults4x: [] as TimingResult[],
      tableColumnNames: [] as string[],
      metricFrameworkSortOptions: [] as MetricFrameworkType[],
      timingTypeSortOptions: [] as TimingType[],
      metricFrameworkSelectType: "" as MetricFrameworkType,
      timingSelectType: "" as TimingType,
      throttledSelectType: "No throttle" as ThrottleType,
      pageTitle: this.$router.currentRoute.value.name,
    };
  },
  props: {
    timingResults: { type: Array as () => TimingResult[], default: [] },
    frameworks: {
      type: Object as () => Record<string, Definition>,
      default: {},
    },
    metrics: { type: Object as () => Record<string, Definition>, default: {} },
    timings: { type: Object as () => Record<string, Definition>, default: {} },
  },

  async mounted() {
    const names = Object.values(this.timings).map((item) => item.display_name);
    const metricFrameworkSortOptions = names.slice(
      0,
      2
    ) as MetricFrameworkType[];
    const timingTypeSortOptions = names.slice(2) as TimingType[];

    this.tableColumnNames = names;
    this.metricFrameworkSortOptions = metricFrameworkSortOptions;
    this.timingTypeSortOptions = timingTypeSortOptions;
    this.metricFrameworkSelectType = metricFrameworkSortOptions[0];
    this.timingSelectType = timingTypeSortOptions[0];

    this.defaultTimingResults4x = (await fetchData<TimingResult[]>(
      "/trace-results.throttle-4x.json"
    )) as TimingResult[];
  },

  methods: {
    handleSelect(e: { value: string; sortType: string }) {
      (this as any)[e.sortType] = e.value;
    },

    handleCheckbox(e: { target: { name: string } }, checkboxType: string) {
      const data =
        checkboxType === "framework" ? "filteredFrameworks" : "filteredMetrics";

      // Display names differ from data name.
      // For display we use display_name, for sorting and filtering we use the raw data name.
      // display_name = Total Duration, raw data name = total_dur
      if (this[data].includes(e.target.name)) {
        this[data] = this[data].filter(
          (framework) => framework !== e.target.name
        );
      } else {
        this[data] = [...this[data], e.target.name];
      }
    },
    getSortType(
      k_v_Arr: [k: string, v: { display_name: string }][],
      sortType: ColumnType
    ): ColumnType {
      return k_v_Arr.filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_k, v]) => v.display_name === sortType
      )[0][0] as ColumnType;
    },

    getSortMap(
      filteredTimings: TimingResult[],
      sortType: ColumnType
    ): Map<string, TimingResult[]> {
      // key will be a framework or a metric
      let sortMap: Map<string, TimingResult[]> = new Map();

      filteredTimings.forEach((item) => {
        // Grouping name Either a Metric or a Framework
        const groupingName = item[sortType as MetricFrameworkType];

        if (sortMap.get(groupingName)) {
          // Why is typescript making me use ? when we are already in this "if" block?
          sortMap.get(groupingName)?.push(item);
        } else {
          sortMap.set(groupingName, [item]);
        }
      });

      return sortMap;
    },

    getSortedResults(
      sortMap: Map<string, TimingResult[]>,
      sortType: ColumnType
    ): TimingResult[] {
      return [...sortMap.values()]
        .map((item) => {
          item.sort(
            (a, b) => a[sortType as TimingType] - b[sortType as TimingType]
          );
          return item;
        })
        .reduce((acc, x) => {
          return acc.concat(x);
        }, []);
    },

    getFilteredTimings(timingResults: TimingResult[]): TimingResult[] {
      const filteredFrameworks = this.filteredFrameworks;
      const filteredMetrics = this.filteredMetrics;

      return timingResults
        .filter(
          (timing) => !filteredFrameworks.includes(timing.timing_framework)
        )
        .filter((timing) => !filteredMetrics.includes(timing.timing_type));
    },

    // Handles all the filtering and sorting from checkboxes and selects
    processResults() {
      const timingsArr = Object.entries(this.timings);

      const metricFrameworkSortType = this.getSortType(
        timingsArr,
        this.metricFrameworkSelectType
      );
      const TimingsSortType = this.getSortType(
        timingsArr,
        this.timingSelectType
      );

      const timingResults =
        this.throttledSelectType === "No throttle"
          ? this.timingResults
          : this.defaultTimingResults4x;

      this.processedTimingResults = this.getSortedResults(
        this.getSortMap(
          this.getFilteredTimings(timingResults),
          metricFrameworkSortType
        ),
        TimingsSortType
      );
    },
  },

  watch: {
    throttledSelectType() {
      this.processResults();
    },
    metricFrameworkSelectType() {
      this.processResults();
    },
    timingSelectType() {
      this.processResults();
    },
    filteredFrameworks() {
      this.processResults();
    },
    filteredMetrics() {
      this.processResults();
    },
    timingResults() {
      this.processResults();
    },
  },

  computed: {
    filterCheckboxes(): {
      name: string;
      filteredArr: string[];
      typeArr: string[];
    }[] {
      return [
        {
          name: "metric",
          filteredArr: this.filteredMetrics,
          typeArr: Object.keys(this.metrics),
        },
        {
          name: "framework",
          filteredArr: this.filteredFrameworks,
          typeArr: Object.keys(this.frameworks),
        },
      ];
    },
    sortSelects(): {
      name: string;
      options: ColumnType[];
      label: string;
      sortType: ColumnType;
    }[] {
      return [
        {
          name: "metricFrameworkSelectType",
          options: this.metricFrameworkSortOptions,
          label: "Sort By",
          sortType: this.metricFrameworkSelectType,
        },
        {
          name: "timingSelectType",
          options: this.timingTypeSortOptions,
          label: "Then",
          sortType: this.timingSelectType,
        },
      ];
    },

    throttledSelect(): {
      name: string;
      options: ThrottleType[];
      label: string;
      sortType: ThrottleType;
    } {
      return {
        name: "throttledSelectType",
        options: ["No throttle", "4x slowdown"],
        label: "Throttled CPU",
        sortType: this.throttledSelectType,
      };
    },
  },
});
export default Component;
</script>



<style scoped>
.form-container {
  width: 100%;
  overflow: auto;
}
.form {
  display: inline-grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  margin-bottom: 20px;
  min-width: 1200px;
  width: 100%;
}

.throttle-container {
  justify-content: flex-start;
  display: flex;
}

.sort-container {
  display: grid;
  grid-template-columns: 100%;
}

.like-button-container {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}

button {
  width: 70%;
}

button:hover {
  background-color: darkgray;
}

.liked-link {
  text-underline-position: under;
}
</style>
