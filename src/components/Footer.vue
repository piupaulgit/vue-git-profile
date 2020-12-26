<template>
    <div class="footer d-flex justify-content-center">
        <p>Built with </p>
        <ul>
            <li>
                <a href="https://vuejs.org/" target="_blank">Vue.js</a>
            </li>
            <li>
                <a href="https://docs.github.com/en/free-pro-team@latest/rest" target="_blank">Github API</a>
            </li>
            <li>
                <a href="https://www.highcharts.com/" target="_blank">Highcharts</a>
            </li>
            <li>
                <a href="https://www.npmjs.com/package/gh-polyglot" target="_blank">Github Polyglot</a>
            </li>
            <li>
                <a href="https://www.npmjs.com/package/axios" target="_blank">Axios</a>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: "Footer"
}
</script>
<style lang="scss" scoped>
.footer{
    gap: 15px;
    font-size: 12px;
    padding: 30px 0;
    background: #f1f1f1;
    margin-top: 80px;
    p{
        margin-bottom: 0;
    }
    ul{
        padding: 0;
        list-style: none;
        display: flex;
        gap: 27px;
        margin: 0;
        li{
            &:last-child{
                a{
                    &::after{
                        display: none;
                    }
                }
            }
            a{
                font-weight: bold;
                font-size: 12px;
                position: relative;
                &:after{
                    content: '';
                    height: 5px;
                    width: 5px;
                    background: #007bff;
                    position: absolute;
                    border-radius: 50%;
                    right: -16px;
                    top: 5px;
                }
            }
        }
    }
}
</style>