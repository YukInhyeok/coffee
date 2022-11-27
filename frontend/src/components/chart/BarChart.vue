<script>
import axios from 'axios'
import { Bar } from "vue-chartjs"

const API_URL = 'http://localhost:8000'

export default {
  extends: Bar,
  data(){
    return {
        bardata: {
            labels: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10"
            ],
            datasets: [
            {
                label: "Data One",
                backgroundColor: "#f87979",
                data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20]
            }
            ]
        }
    }
  },
  mounted() {
    console.log(this.bardata)
  },
  created(){
      axios.get(API_URL+"/devices")
      .then((response) =>{
            var data = response.data
            data.forEach((value,index)=>{
                this.bardata.datasets[0].data[index] = value['temperature']
                console.log(value['temperature'])
            })
            this.renderChart(this.bardata, { responsive: true, maintainAspectRatio: false })
      })
  }
};
</script>