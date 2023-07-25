<template>
  <div class="hourly-forecast">
    Hourly Forecast
  </div>
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
      const tempData = [17,16,16,17,18,20,25,25,26,25,24,24,23,20,20,19,18];
      
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
            fill: true,
            borderColor: '#00bfff',
            tension: 0.6,
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
              display: true,
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

        maintainAspectRatio: false,

        interaction: {
          intersect: false,
          mode: 'index',
        },

        animation: {
          duration: 1000,
        },

        tooltips: {
          enabled: true,
          intersect: false,
          mode: 'index',
          backgroundColor: '#fff',
          titleFontColor: '#000',
          bodyFontColor: '#000',
          borderColor: '#00bfff',
          borderWidth: 1,
          caretPadding: 10,
          displayColors: false,
          callbacks: {
            label: (tooltipItem) => `${tooltipItem.value}°C`,
          },
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
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

#temp-chart {
  width: 100%;
  height: 100%;
}

.hourly-forecast {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
    color: #fff;
    text-align: center;
    margin-top: 20px;
    text-transform: uppercase;
}

</style>
