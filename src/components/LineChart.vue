<script lang="ts">
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
import Vue, { PropType } from "vue";
import store from "../store/index";
import Chart from "chart.js";
import { ChartAnnotationOptions, Annotation } from "../utils/annotations";

const fontColor = "white";

const options: Chart.ChartOptions & ChartAnnotationOptions = {
  scales: {
    yAxes: [
      {
        scaleLabel: {
          display: true,
          fontColor
        },
        ticks: {
          beginAtZero: false,
          fontColor
        },
        gridLines: {
          display: true
        }
      }
    ],
    xAxes: [
      {
        gridLines: {
          display: false
        },
        ticks: {
          fontColor,
          autoSkip: true
        }
      }
    ]
  },
  legend: {
    display: false
  },
  title: {
    display: true,
    fontSize: 18,
    fontColor,
    padding: 15
  },
  annotation: {
    annotations: []
  }
};

// Vue.extend< Method=any, Data=any, Prop=any, Computed=any>
export default Vue.extend<Chart, any, any, any> ({
  mixins: [Line, reactiveProp],
  props: {
    title: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    annotation: {
      type: Object as PropType<Annotation>,
      default: () => {},
    },
    chartData: {
      type: Object as PropType<Chart.ChartData>,
      required: true
    }
  },
  mounted(): void {
    options.title!.text = this.title;
    options.scales!.yAxes![0].scaleLabel!.labelString = this.id;
    options.scales!.yAxes![0].id = this.id;

    for (let key in this.annotation) {
      options.annotation.annotations.push({
        type: "line",
        scaleID: this.id,
        mode: "horizontal",
        value: this.annotation[key],
        borderWidth: 2,
        borderColor: this.$vuetify.theme.themes.dark.deepGreen,
        label: {
          enabled: true,
          backgroundColor: this.$vuetify.theme.themes.dark.deepGreen,
          fontSize: 10,
          content: key
        }
      });
    }

    this.renderChart(this.chartData, options);
  }
});

</script>