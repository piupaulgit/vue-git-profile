<template>
    <div class="repos container">
        <div class="row">
            <div class="col-md-12 d-flex repo-header mb-4">
                <h2>Top Repos</h2><span>by</span>
                <div class="form-group mb-0">
                    <select class="form-control" v-model="sortBy" v-on:change="getSortedRepo(sortBy)">
                        <option value="stars" selected>Stars</option>
                        <option value="forks">Fork</option>
                        <option value="size">Size</option>
                    </select>
                </div>
            </div>
            <div class="col-md-4" v-for="repo in sortedRepoData" :key="repo.id">
                <div class="repo_item d-flex flex-column justify-content-between">
                    <div>
                        <h4>{{repo.name}}</h4>
                        <p>{{repo.description ? repo.description : "No Description added"}}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <ul>
                            <li>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" v-bind:style="{'color': colors[repo.language]}" width="16" height="16" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 12 12">
                                    <circle cx="5" cy="5" r="5"/>
                                    </svg>
                                </span>
                                {{repo.language ? repo.language : 'Other' }}

                            </li>
                            <li>
                                <span class="start-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                    </svg>
                                </span>
                                {{repo.stargazers_count.toLocaleString()}}
                            </li>
                            <li>
                                <span>
                                    <svg aria-hidden="true" class="octicon" height="16" role="img" viewBox="0 0 10 16" width="10" style="display: inline-block; fill: currentcolor; user-select: none; vertical-align: text-bottom;"><path fill-rule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>
                                </span>
                                {{repo.forks.toLocaleString()}}
                            </li>
                        </ul>
                        <span class="repo_size">{{repo.size.toLocaleString()}} KB</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { langColors } from '../assets/langColors';
export default {
    name: "Repos",
    data(){
        return {
            repoData: Array,
            sortedRepoData: Array,
            colors: langColors,
            sortBy: 'stars',
            username: this.$route.params.username,
        }
    },
    methods:{
        getSortedRepo(type){
            const LIMIT = 8;
            const map = {
                stars: 'stargazers_count',
                forks: 'forks_count',
                size: 'size',
            };
            const sortProperty = map[type];
            this.sortedRepoData = this.repoData
            .filter(repo => !repo.fork)
            .sort((a, b) => b[sortProperty] - a[sortProperty])
            .slice(0, LIMIT);
            console.log(this.sortedRepoData,'forst')
        }
    },
    created(){
        this.axios
            .get(`https://api.github.com/users/${this.username}/repos?per_page=100`).then(res => {

                this.repoData = res.data;
                this.getSortedRepo('starts')
                console.log(this.colors)
        })
    }
}
</script>
<style lang="scss" scoped>
.repo-header{
    gap: 20px;
    align-items: center;
}
.repos{
    margin-top: 30px;
    select{
        width: 200px;
    }
    .repo_item{
        padding: 20px;
        background: #f1f1f1;
        border-radius: 2px;
        margin-bottom: 30px;
        min-height: 150px;
        h4{
            font-size: 15px;
        }
        p{
            font-size:12px;
        }
        ul{
            padding: 0;
            margin: 0;
            display: flex;
            gap: 15px;
            list-style: none;
            li{
                font-size:13px;
                display: flex;
                align-items: center;
                gap:5px;
                svg{
                    font-size: 12px;
                    color: #a7a3a3;
                }
            }
        }
        .repo_size{
            font-size: 12px;
        }
    }
}
</style>