import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

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
          autoSkip: true,
          fontColor
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
    annotations: [
      {
        type: "line",
        id: "hLine",
        mode: "horizontal",
        scaleID: "y-axis-0",
        value: 40,
        borderWidth: 1,
        borderColor: "white",
        label: {
          enabled: true,
          backgroundColor: "white",
          fontSize: 16,
          content: "Proper Level"
        }
      }
    ]
  }
};

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ["title", "id"],
  mounted() {
    options.title.text = this.title;
    options.scales.yAxes[0].scaleLabel.labelString = this.id;
    options.scales.yAxes[0].id = this.id;
    this.renderChart(this.chartData, options);
  }
};
