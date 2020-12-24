<template>
    <div class="chart">
        <div class="chart_item">
             <highcharts :options="chartOptions"></highcharts>
        </div>
        <div class="chart_item">
             <highcharts :options="chartOptions"></highcharts>
        </div>
        <div class="chart_item">
             <highcharts :options="chartOptions"></highcharts>
        </div>
        
    </div>
</template>
<script>
import {Chart} from 'highcharts-vue'
export default {
    name:"Charts",
    components: {
        highcharts: Chart 
    },
    data(){
        return {
             chartOptions: {
                type: 'variablepie',
                series: [{
                data: [1,2,3] // sample data
                }]
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../assets/variables';
.chart{
    display: flex;
    gap: 20px;
    margin-top: -40px;
    align-items: center;
    justify-content: center;
    .chart_item{
        max-width: 30%;
        flex: 0 0 30%;
        background: $white_color;
        border-radius: 5px;
        overflow: hidden;
        box-shadow: 2px 2px 2px red;
    }
}
</style>