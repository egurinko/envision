<script lang="ts">
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
import Vue, { PropType } from "vue";
import Chart from "chart.js";

const fontColor = "white";

const options: Chart.ChartOptions = {
  scales: {
    xAxes: [
      {
        barThickness: 18,
        maxBarThickness: 18,
        minBarLength: 5,
        gridLines: {
          display: false
        },
        offset: true
      }
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        },
        gridLines: {
          display: true
        },
        scaleLabel: {
          display: true,
          fontColor,
          labelString: "Points"
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
  tooltips: { enabled: true },
  animation: {
    duration: 1000
  }
};

export default Vue.extend<Chart, any, any, any> ({
  mixins: [Bar, reactiveProp],
  props: {
    title: {
      type: String,
      required: true
    },
    chartData: {
      type: Object as PropType<Chart.ChartData>,
      required: true
    }
  },
  watch: {
    chartData: {
      handler(): void {
        options.title!.text = this.title;
        this.renderChart(this.chartData, options);
      },
      deep: true
    }
  }
});

</script>