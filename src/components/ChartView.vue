<template>
  <div class="inventory">
    <apexchart width="500" type="pie" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref, onMounted } from "vue";

// BUGGG: no photo
export default {
  name: 'ChartView',
  setup() {
    const options = ref({
      chartOptions: {
        chart: {
          width: 380,
          type: 'pie',
        },
        colors: ['#93C3EE', '#E5C6A0', '#669DB5', '#94A74A'],
        fill: {
          type: 'image',
          opacity: 0.85,
          image: {
            src: ['../assets/books.jpeg', '../assets/Games.jpg',
              '../assets/Gift.jpg', '../assets/Materials.jpg'],
            width: 25,
            imagedHeight: 25
          },
        },
        stroke: {
          width: 4
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: ['#111']
          },
          background: {
            enabled: true,
            foreColor: '#fff',
            borderWidth: 0
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
    });
    const series = ref([]); //const series = ref([44, 55, 41, 17, 15]);

    onMounted(async () => {

      var response = await fetch("/api/inventory/aggregate/groupby"); 
      //from backend group by -- router.get('/api/inventory/aggregate/groupby', async function (req, res) {...}

      if (response.ok) {
        var type = await response.json();

        series.value = type.map(a => a.count);
        options.value = { ... {labels: type.map(a => a._id)}}
      }
    });

    return {
      options, series
    }
  }

}
</script>