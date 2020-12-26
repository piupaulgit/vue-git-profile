<template>
    <div class="chart">
        <div class="chart_item">
            <highcharts :options="chartOptions" v-if="chartOptions.series[0].data.length" ref="highcharts"></highcharts>
            <span v-if="chartOptions.series[0].data.length === 0 ">Nothing to Display</span>
        </div>
        <div class="chart_item">
            <highcharts :options="startChartOptions" v-if="startChartOptions.series[0].data.length" ref="highcharts"></highcharts>
            <span v-if="startChartOptions.series[0].data.length === 0 ">Nothing to Display</span>
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
                title: {
                    text: 'Top Langulages'
                },
                series: [{
                    data: [] 
                }]
            },
             startChartOptions: {
                chart: {
                    type: "column",
                },
                 title: {
                    text: 'Most Starred'
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
            starLangularOptions: {
            chart: {
                type: "pie"
                },
                series: [{
                    data: [] 
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
    gap: 50px;
    padding: 60px 0;
    align-items: center;
    justify-content: center;
    @media only screen and (max-width: 768px) {
        flex-direction: column;
        width: 80%;
        gap: 0;
        margin: 0 auto;
        padding-bottom: 30px;
    }
    .chart_item{
        padding-top: 20px;
        max-width: 40%;
        flex: 0 0 40%;
        background: $white_color;
        border-radius: 5px;
        overflow: hidden;
        box-shadow: 0px 0px 7px #c7c1c1;
        @media only screen and (max-width: 768px) {
             max-width: 100%;
            flex: 0 0 100%;
            width: 100%;
            margin-bottom: 20px;
        }
    }
}
</style>