<template>
    <div class="chart">
        <div class="chart_item">
             <highcharts :options="chartOptions" v-if="chartOptions.series[0].data.length" ref="highcharts"></highcharts>
        </div>
        <div class="chart_item">
             <highcharts :options="startChartOptions" v-if="startChartOptions.series[0].data.length" ref="highcharts"></highcharts>
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
            repoData: [],
            chartOptions: {
            chart: {
                type: "pie"
                },
                series: [{
                    data: [] 
                }]
            },
             startChartOptions: {
                chart: {
                    type: "column"
                },
                 xAxis: {
                    categories: []
                },
                series: [{
                    data: [
                        {
                            y:2,
                            color: 'green'
                        },
                        {
                            y:7,
                            color: 'blue'
                        },
                        {
                            y:8,
                            color: '#355555'
                        },
                    ] 
                }]
            },
        }
    },
    methods : {
        updatelangSeries(){
          const langModifiedData =  this.langData.map(item => {
                item['name'] = item['label']; 
                delete item['label']; 
                item['y'] = item['value']; 
                delete item['value']; 
                return item; 
            })
          this.chartOptions.series[0].data = langModifiedData;
        },
        updateStarSeries(){
            const LIMIT = 5;
            const colors = ['#ff0000','#fbd731','#cc43f9',"#65ed65","#64a7ea"]
            const sortProperty = 'stargazers_count';
            const mostStarredRepos = this.repoData
            .filter(repo => !repo.fork)
            .sort((a, b) => b[sortProperty] - a[sortProperty])
            .slice(0, LIMIT);
            const startRepos = mostStarredRepos.map(repo => repo.name);
            const values = mostStarredRepos.map(repo => repo[sortProperty]);
            const datas = values.map((item,index) => {
                return {
                    color: colors[index],
                    y:item
                }
            })
            this.startChartOptions.xAxis.categories = startRepos;
            this.startChartOptions.series[0].data = datas;
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
            self.updatelangSeries()
            }
        });
        
        // repo data
        this.axios
        .get(`https://api.github.com/users/${this.username}/repos?per_page=100`).then(res => {
            this.repoData = res.data;
            console.log(this.repoData,'repo')
            this.updateStarSeries()
        })
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