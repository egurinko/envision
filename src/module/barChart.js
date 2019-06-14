import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

const fontColor = "white";

const options = {
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

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ["title", "id", "chartData"],
  watch: {
    chartData: {
      handler() {
        options.title.text = this.title;
        this.renderChart(this.chartData, options);
      },
      deep: true
    }
  }
};
