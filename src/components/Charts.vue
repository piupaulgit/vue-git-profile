<template>
    <div class="chart">
        <div class="chart_item">
             <highcharts :options="chartOptions" :updateArgs="[true, false]" ref="highcharts"></highcharts>
        </div>
        <div class="chart_item">
             <!-- <highcharts :options="chartOptions"></highcharts> -->
        </div>
        <div class="chart_item">
             <!-- <highcharts :options="chartOptions"></highcharts> -->
        </div>
        
    </div>
</template>
<script>
import {Chart} from 'highcharts-vue';
import GhPolyglot from 'gh-polyglot';
export default {
    name:"Charts",
    components: {
        highcharts: Chart 
    },
    data(){
        return {
             username: this.$route.params.username,
             langData: [],
             chartOptions: {
                chart: {
                    type: "pie"
                },
                series: [{
                    data: [] 
                }]
            }
        }
    },
    methods : {
        updateSeries(){
        
          const langModifiedData =  this.langData.map(item => {
                item['name'] = item['label']; 
                delete item['label']; 
                item['y'] = item['value']; 
                delete item['value']; 
                return item; 
            })
            console.log(langModifiedData,'modified data')
          this.chartOptions.series[0].data = langModifiedData;
        }
    },
     created(){
         // langdata
        const me = new GhPolyglot(`${this.username}`);
        let self = this;
        me.userStats(function (err, stats) {
        if(!err){
            self.langData = stats;
            console.log(self.langData)
            self.updateSeries()
            }
        });
        
    },
    mounted(){
        // this.chartOptions.series[0].data = this.langData;
        
        
        //  this.updateSeries()
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