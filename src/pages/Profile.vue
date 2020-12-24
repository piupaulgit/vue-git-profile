<template>
    <div>
        <div v-if="!hasError">
            <GithubIcon></GithubIcon>
            <Header v-bind:userInfo="userInfo"></Header>
            <charts></charts>
            <h1>Github profile found with username {{username}}</h1>
        </div>
        <div v-if="hasError">
            <h1>No Github profile found with username {{username}}</h1>
        </div>
    </div>
</template>
<script>
import GithubIcon from "../components/GithubIcon";
import Header from "../components/Header";
import GhPolyglot from 'gh-polyglot';
import Charts from '../components/Charts.vue';
export default {
    name:'Profile',
    components: {GithubIcon, Header, Charts},
    data() {
        return {
            username: this.$route.params.username,
            userInfo: Object,
            userConfig: Object,
            reposInfo: Object,
            hasError: false
        }
    },
     created() {
         this.axios
            .get(`https://api.github.com/users/${this.username}`)
            .then((res) => {
                this.userInfo = res.data;
                this.userConfig = res.config;
                this.axios.get(`${this.userInfo.repos_url}`).then((repoRes) => {
                this.reposInfo = repoRes.data;
                this.hasError = false;
                });
            }).catch(() => {
                this.hasError = true;
            });
             const me = new GhPolyglot(`${this.username}`);
             me.userStats(function (err, stats) {
                console.log(err || stats);
            });
    },
    methods() {
    }
}
</script>