<template>
    <div class="bg-primary vh-100">
        <div class="container d-flex align-items-center justify-content-center h-100">
            <div class="username-form row flex-column align-items-center">
                <span><b-icon icon="github" style="color: #fff;"></b-icon></span>
                <h1 class="display-6 text-uppercase mt-0">Find your github profile</h1>
                <div class="col-md-10 mx-auto">
                    <form class="mt-4">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Username">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Index'
}
</script>
<style lang="scss" scoped>
@import '../assets/variables';
.username-form{
   span{
       color: #fff;
       font-size: 70px;
   }
   .display-6{
       font-weight: 200;
       font-size: 50px;
   }
   .form-control{
       background: lighten($primary_color, 12%);
       border: 0;
       min-height: 60px;
       font-size: 35px;
       color: #fff;
       text-align: center;
       &:focus{
           outline: none;
           box-shadow: none;
       }
   }
   ::-webkit-input-placeholder { /* Edge */
        color: #fff;
        opacity: .3;
        font-size: 30px;
    }

    :-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #fff;
        opacity: .3;
        font-size: 30px;
    }

    ::placeholder {
        color: #fff;
        opacity: .3;
        font-size: 30px;
    }
}
</style>