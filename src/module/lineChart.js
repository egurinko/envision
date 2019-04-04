import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  mounted() {
    this.renderChart(this.chartData, options);
  }
};

const options = {
  scales: {
    yAxes: [
      {
        scaleLabel: {
          labelString: "ABC",
          fontColor: "white"
        },
        ticks: {
          beginAtZero: false
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
    text: "タイトル"
  },
  annotation: annotationConfig
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
