<template>
    <div class="header">
        <div class="header_content">
            <div class="avater" v-if="userInfo.avatar_url">
                 <img v-bind:src="userInfo.avatar_url" />
            </div>
            <h1 class="display-3" v-if="userInfo.name">{{userInfo.name}}</h1>
            <p v-if="userInfo.bio" class="text-center">{{userInfo.bio}}</p>
            <h2 class="display-4 mt-2" v-if="userInfo.login">
                <a :href="userInfo.html_url" target="_blank">@{{ userInfo.login }}</a>
            </h2>
            <div class="info">
                <div class="info_item" v-if="userInfo.company">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-code-slash" viewBox="0 0 16 16">
                        <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"/>
                    </svg>
                    {{userInfo.company}}
                </div>
                <div class="info_item" v-if="userInfo.location">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    </svg>
                    {{userInfo.location}}
                </div>
                <div class="info_item" v-if="userInfo.created_at">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-check" viewBox="0 0 16 16">
                        <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                    </svg>
                    {{userInfo.created_at | formatDate}}
                </div>
            </div>
            <div class="repo_info">
                <div class="repo_info_item">
                    <span class="number">{{ userInfo.public_repos }}</span>
                    <span class="text">REPOSITORIES</span>
                </div>
                <div class="repo_info_item">
                    <span class="number">{{ userInfo.followers }}</span>
                    <span class="text">FOLLOWERS</span>
                </div>
                <div class="repo_info_item">
                    <span class="number">{{ userInfo.following }}</span>
                    <span class="text">FOLLOWING</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'Header',
    props: ['userInfo'],
    mounted(){
        console.log(this.userInfo)
    }
}
</script>
<style lang="scss" scoped>
@import '../assets/variables';
.header{
   background: $primary_color;
   min-height: 100vh;
   display: flex;
   align-items: center;
   justify-content: center;
   color: $white_color;
   padding: 100px 30px;
   @media only screen and (max-width: 768px) {
       padding: 60px 30px;
   }
   .header_content{
        display: flex;
        flex-direction: column;
        align-items: center;
       .avater{
           height: 200px;
           width: 200px;
           border-radius: 50%;
           overflow: hidden;
           border: 10px solid lighten($primary_color, 12%);
           position: relative;
           img{
               max-width: 100%;
           }
           .twitter_account{
               
           }
       }
       .display-3{
            font-size: 32px;
            // text-transform: uppercase;
            font-weight: 200;
            margin-top: 25px;
       }
       .display-4{
           font-size: 20px;
           font-weight: 700;
           a{
               color: darken($primary_color, 30%);
           }
       }
       .info{
           margin-top: 20px;
           margin-bottom: 20px;
           display: flex;
           gap: 15px;
           .info_item{
               padding: 10px 20px;
               line-height: 1;
               font-size: 12px;
               border-radius: 3px;
               @media only screen and (max-width: 768px) {
                   padding: 10px 8px;
               }
               svg{
                   margin-right: 10px;
               }
           }
       }
       .repo_info{
           display: flex;
           gap: 15px;
            @media only screen and (max-width: 768px) {
                flex-direction: column;
                width: 80%;
                gap: 0;
            }
           .repo_info_item{
               margin-top: 25px;
               background: lighten($primary_color, 12%);
               padding: 20px 50px;
               border-radius: 10px;
               text-align: center;
               .number{
                   font-size: 40px;
                   font-weight: 900;
                   border-radius: 50%;
                   margin-right: 10px;
                   display: block;
                   text-align: center;
                   margin: 0 auto;
                   margin-bottom: 5px;
               }
           }
       }
   }
}
</style>