import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
import chartjsPluginAnnotation from "chartjs-plugin-annotation";
import store from "../store.js";

const fontColor = "white";

const options = {
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

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ["title", "id", "annotation"],
  mounted() {
    options.title.text = this.title;
    options.scales.yAxes[0].scaleLabel.labelString = this.id;
    options.scales.yAxes[0].id = this.id;

    for (let key in this.annotation) {
      options.annotation.annotations.push({
        type: "line",
        scaleID: this.id,
        mode: "horizontal",
        value: this.annotation[key],
        borderWidth: 2,
        borderColor: store.state.colors.deepGreen,
        label: {
          enabled: true,
          backgroundColor: store.state.colors.deepGreen,
          fontSize: 10,
          content: key
        }
      });
    }

    this.renderChart(this.chartData, options);
  }
};
