import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

const fontColor = "white";

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
  tooltips: { enabled: true }
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
