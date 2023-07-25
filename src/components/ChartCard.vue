<template>
  <div>
    <canvas ref="tempChartCanvas" id="temp-chart"></canvas>
  </div>
</template>

<script>
import { ref, watchEffect, onBeforeUnmount } from 'vue';
import { Chart } from 'chart.js/auto';

export default {
  name: 'TemperatureGraph',
  props: {
    weatherInfo: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const tempChartCanvas = ref(null);
    let tempChart = null;

    const getTempData = () => {
      const tempData = [25,10,15,20,30,35,40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90];
      
      return tempData;
    };

    const getTempLabels = () => {
      const tempLabels = ['00:00','02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00' ];
      return tempLabels;
    };

    const createTempChart = () => {
      const tempData = getTempData();
      const tempLabels = getTempLabels();

      const data = {
        labels: tempLabels,
        datasets: [
          {
            label: 'Temperature',
            data: tempData,
            fill: false,
            borderColor: '#00bfff',
            tension: 0.1,
          },
        ],
      };

      const options = {

        responsive: true,
        
        plugins: {
          legend: {
            display: false,
          },
        },

        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },

        elements: {
          point: {
            radius: 0,
          },
        },

        layout: {
          padding: 10,
        },

        

      };

      return new Chart(tempChartCanvas.value, {
        type: 'line',
        data,
        options,
      });
    };

    watchEffect(() => {
      if (tempChart) {
        tempChart.destroy();
      }
      tempChart = createTempChart();
    });

    onBeforeUnmount(() => {
      if (tempChart) {
        tempChart.destroy();
      }
    });

    return {
      tempChartCanvas,
    };
  },
};
</script>

<style>
#temp-chart {
  width: 100%;
  height: 100%;
}
</style>
