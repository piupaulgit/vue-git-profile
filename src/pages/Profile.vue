<template>
    <div>
        <div v-if="!hasError">
            <GithubIcon></GithubIcon>
            <Header v-bind:userInfo="userInfo"></Header>
            <Charts></Charts>
            <Repos></Repos>
            <Footer></Footer>
        </div>
        <div v-if="hasError">
            <ErrorScreen></ErrorScreen>
        </div>
    </div>
</template>
<script>
import GithubIcon from "../components/GithubIcon";
import Header from "../components/Header";
import Charts from '../components/Charts.vue';
import Repos from '../components/Repos.vue';
import Footer from '../components/Footer.vue';
import ErrorScreen from '../components/ErrorScreen.vue';

export default {
    name:'Profile',
    components: {GithubIcon, Header, Charts, Repos, Footer, ErrorScreen},
    data() {
        return {
            username: this.$route.params.username,
            userInfo: Object,
            userConfig: Object,
            langData: [],
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

           
    }
}
</script>