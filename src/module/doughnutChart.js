import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
import store from "../store.js";

const fontColor = "white";
let fontSize;

const options = {
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
    onComplete: function() {
      let chartContext = this.chart.canvas.getContext("2d", { alpha: false });
      chartContext.fillStyle = fontColor;
      chartContext.textAlign = "center";
      chartContext.textBaseline = "middle";
      fontSize = store.state.isPhone ? 30 : 40;
      chartContext.font = `${fontSize}px Rubik`;

      chartContext.fillText(
        Math.round(this.data.datasets[0].data[0] * 100) + "%",
        this.chart.width / 2,
        this.chart.height / 2 + fontSize / 1.6
      );
    }
  }
};

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: ["title", "id"],
  mounted() {
    options.title.text = this.title;
    this.renderChart(this.chartData, options);
  }
};
