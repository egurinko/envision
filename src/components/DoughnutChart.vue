<script lang="ts">
import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
import Vue, { PropType } from "vue";
import Chart from "chart.js";
import store from "../store/index";

const fontColor = "white";
let fontSize;

const options: Chart.ChartOptions = {
  scales: {},
  cutoutPercentage: 98,
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
    duration: 500,
    onComplete: function(chart: any): void {
      let chartContext = chart.chart.canvas.getContext("2d", { alpha: false });
      chartContext.fillStyle = fontColor;
      chartContext.textAlign = "center";
      chartContext.textBaseline = "middle";
      fontSize = 35;
      chartContext.font = `${fontSize}px Rubik`;
      
      chartContext.fillText(
        Math.round(chart.chart.data.datasets[0].data[0] * 100) + "%",
        chart.chart.width / 2,
        chart.chart.height / 2 + fontSize / 1.6
      );
    }
  }
};

export default Vue.extend<Chart, any, any, any>({
  mixins: [Doughnut, reactiveProp],
  props: {
    title: {
      type: String,
      required: true
    }
  },
  mounted() {
    options.title!.text = this.title;
    this.renderChart(this.chartData, options);
  }
});

</script>