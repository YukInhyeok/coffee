<template>
  <div class="home">
    <v-container fluid>
      <v-row>
        <v-col>
          <device-table></device-table>
        </v-col>
        <v-col>
          <data-table></data-table>
        </v-col>
      </v-row>
      <v-row>        
        <v-col>
          <data-chart/>
        </v-col>
      </v-row>      
    </v-container>
  </div>
</template>

<script>
import DataTable from "../components/DataTable";
import DeviceTable from "../components/DeviceTable";
import DataChart from "../components/DataChart";


export default {
  name: "App",
  components: {
    DataTable,
    DeviceTable,
    DataChart,
  },
  data: () => ({
    //
  }),methods:{
    dateUpdate(date){
      alert(date)
    }
  }
};
</script>