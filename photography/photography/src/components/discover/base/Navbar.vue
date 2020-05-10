<template>
    <div class="navbar">
        <ul>
            <!-- <li><router-link :to="{path:'/article',query:{t:'renmen'}}">热门1</router-link></li> -->
            <li><router-link to="/discover/works">作品</router-link></li>
            <li><router-link to="/discover/gworks">作品集</router-link></li>
            <li><router-link to="/discover/article">文章</router-link></li>
        </ul>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scope>
    .navbar{
        height: 40px;
        text-align: center;
        background: #fff;
        border-bottom: 1px solid #EEEFF2;
        ul{
            display:inline-block;
            margin: auto;
            li{
                line-height: 40px;
                text-align: center;
                float:left;
                margin:0px 5px;
                a{
                    display: block;
                    padding:0px 10px;
                    border-bottom:2px solid transparent;
                }
                a:hover{
                    border-bottom:2px solid #0099E5;
                }
                .router-link-exact-active{
                    border-bottom:2px solid #0099E5;
                }
            }
        }
    }
</style>