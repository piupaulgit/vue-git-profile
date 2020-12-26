<template>
    <div class="bg-primary vh-100">
        <div class="container d-flex align-items-center justify-content-center h-100">
            <div class="username-form row flex-column align-items-center">
                <span><b-icon icon="github" style="color: #fff;"></b-icon></span>
                <h1 class="display-6 text-uppercase mt-0">Find your github profile</h1>
                <div class="col-md-10 mx-auto">
                    <form class="mt-4" @submit.stop.prevent="searchProfile()">
                        <div class="form-group">
                            <input type="text" class="form-control" v-bind:class="{ hasValue: username.trim().length > 0 }"  placeholder="Username" v-model="username">
                            <button class="btn btn-light" v-bind:class="{ show: username.trim().length > 0 }"><b-icon icon="search"></b-icon></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Index',
    data() {
        return {
            username: '',
        }
    },
    methods: {
        searchProfile(){
            if(this.username.trim().length > 0){
                this.$router.push(`/profile/${this.username.trim()}`);
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../assets/variables';
.username-form{
    padding: 0 30px;
   span{
       color: #fff;
       font-size: 70px;
   }
   .display-6{
       font-weight: 200;
       font-size: 50px;
       text-align: center;
       @media only screen and (max-width: 991px) {
           font-size: 30px;
       }
       @media only screen and (max-width: 545px) {
           font-size: 20px;
       }
   }
   .form-control{
       background: lighten($primary_color, 12%);
       border: 0;
       min-height: 60px;
       font-size: 35px;
       color: #fff;
       text-align: center;
       @media only screen and (max-width: 545px) {
           font-size: 20px;
       }
       &.hasValue{
            padding-right: 78px;
       }
       &:focus{
           outline: none;
           box-shadow: none;
       }
   }
   ::-webkit-input-placeholder { /* Edge */
        color: #fff;
        opacity: .3;
    }

    :-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #fff;
        opacity: .3;
    }

    ::placeholder {
        color: #fff;
        opacity: .3;
    }
    .form-group{
        overflow: hidden;
        position: relative;
        button{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: -75px;
            padding: 13px 20px;
            transition: all .4s;
            &.show{
                right: 7px;
            }
        }
    }
}
</style>