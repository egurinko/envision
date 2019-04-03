import { Line, mixins } from "vue-chartjs";
import store from "../store";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  mounted() {
    this.renderChart(this.chartData, options);
  }
};

const options = {
  scales: axisConfig,
  legend: {
    display: false
  },
  annotation: annotationConfig
};

const fontSize = store.state.isPhone ? 10 : 18;
const maxTicksLimit = store.state.isPhone ? 10 : 30;

const axisConfig = {
  yAxes: [
    {
      ticks: { beginAtZero: true, fontSize },
      scaleLabel: { display: false }
    }
  ],
  xAxes: [
    {
      stacked: false,
      gridLines: {
        display: false
      },
      ticks: {
        fontSize,
        autoSkip: true,
        maxTicksLimit,
        maxRotation: 0,
        minRotation: 0
      }
    }
  ]
};

const annotationConfig = {
  annotations: [
    {
      type: "line",
      id: "hLine",
      mode: "horizontal",
      scaleID: "y-axis-0",
      value: 40,
      borderWidth: 1,
      borderColor: "rgba(52, 73, 85, 0.5)",
      label: {
        enabled: true,
        backgroundColor: "rgba(52, 73, 85 , 1)",
        fontSize: 16,
        content: "Proper Level"
      }
    }
  ]
};
