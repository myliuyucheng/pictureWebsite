<template>
    <div class="remen">
        <div class="search-box">
            <input class="search-title" type="text" v-model="searchTitle">
            <select name="" id="" v-model="category">
                <option value="">未分类</option>
                <option v-for="(value,index) in categoryArray" :key="index" :value="value._id">{{value.name}}</option>
            </select>
            <button @click="search" class="search-but">搜索</button>
        </div> 

        <div class="works-list" ref="box">
            <div class="works" 
            v-for="(value,index) in list" 
            :key="index" 
            :style='{"width":widths[index]+"px","margin":margin+"px"}' 
            @mouseenter="divshow(index)" 
            @mouseleave="divhide(index)" 
            >
                <img :src="value.url[0]|url" alt="" @load="a" ref="imgArr" @click="showbox(index)">

                <div ref="div" class="news">
                    <div class="news-left" @click="author(value.author._id)">
                        <img :src="value.author.url|getUrl" alt="">
                        <span>{{value.author.name}}</span>
                    </div>
                    <div class="news-right">
                        <i :class="likeds(value._id)?'icon-click':'icon'" @click="liked(value._id,index)" ref="like"></i>
                    </div>
                </div>
                <neirong v-if="show" :data="value"></neirong>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import { gworksList,userLikes,gworksLikes,gRemoveLikes,getCategory,searchGworks } from "@/api"
import animation from "@/assets/js/animation"
import Works from "../works/Works"

export default {
    mounted(){
        this.getGWorks()
        this.getUserLikes()
    },
    created(){
        this.categoryList()
    },
    filters:{
        url(value){
            return "http://localhost:8085/"+value
        },
        getUrl(value){
            return "http://localhost:8085/"+value.substr(7)
        }
    },
    watch: {
		// 方法1
		'$route' (to, from) { //监听路由是否变化
			if(to.path == "/discover/gworks"){ //跳转到哪个页面
                this.getUserLikes()
            }
		},
	},
    computed: { 
    },
    components:{Works},
    methods: {
        a(e){
            if(--this.imglength == 0){
                console.log(this.$refs.imgArr)
                let arrWidth = []
                let arrHeight = []
                let sumWidth = 0
                let s = []
                let arrIndex = 0
                let num = 0
                let cWidth = this.$refs.box.clientWidth
                let sWidth = []
                this.$refs.imgArr.forEach((value,index)=>{
                    let imgWidth = value.naturalWidth
                    let imgHeight = value.naturalHeight
                    arrWidth.push(imgWidth)
                    arrHeight.push(imgHeight)
                    s.push((imgWidth / imgHeight).toFixed(2))
                    let a = Math.floor(this.height * s[index])
                    sWidth.push(a)
                    sumWidth += a
                    if(sumWidth > cWidth) {
                        let dWidth = Math.floor((cWidth - (sumWidth - a + (this.margin*num*2+20)))/num)
                        for(arrIndex; arrIndex < index;arrIndex++){
                            value.width = sWidth[arrIndex]+dWidth
                            value.height = this.height
                            // value.style.display = "block"
                            let imgssWidth = sWidth[arrIndex]+dWidth
                            this.widths.push(imgssWidth)
                        }
                        sumWidth = a
                        arrIndex = index
                        num = 0
                    }
                num++;
                })
                let ylength = arrWidth.length
                let glength = this.widths.length
                if(ylength !== glength){
                    let kaishi = glength
                    let geshu = ylength-glength
                    let shengyu = Math.floor((cWidth - sumWidth - (this.margin*geshu*2+20)) / geshu)
                    for(kaishi;kaishi < ylength;kaishi++){
                        this.widths.push(sWidth[kaishi] + shengyu)
                    }
                }
                this.$refs.box.style.opacity="1"
            }

        },
        showbox(index){
            console.log(this.list[index]._id)
            this.$router.push({
                name:"GWorks",
                params:{
                    id:this.list[index]._id
                }
            })
        },
        async getGWorks(){
            let data = await gworksList()
            this.list = data
            console.log(data)
            this.imglength = data.length
        },
        divshow(index){
            new animation(this.$refs.div[index],{
                data: {
                    bottom: 0,
                },
            },200,)
        },
        divhide(index){
            new animation(this.$refs.div[index],{
                data: {
                    bottom: -50,
                },
            },200,)
        },



        async liked(_id,index){
            let works = this.$refs.like[index]
            if(works.classList.contains("icon")){
                let data = await gworksLikes({_id})
                if(data.code == 0){
                    this.like = data.message
                }
            }else{
                let data = await gRemoveLikes({_id})
                this.like = data.message
            }
        },
        likeds(id){
            if(this.like.some(data=>data._id==id)){
                return true
            }else{
                return false
            }
        },
        async getUserLikes(){
            let data = await userLikes()
            this.like = data.likegworks
        },



        async categoryList(){
            let data = await getCategory()
            this.categoryArray = data
        },
        async search(){
            let data = await searchGworks(this.searchTitle,this.category)
            console.log(data.message)
            this.list = data.message
        },

        author(id){
            console.log(id)
            this.$router.push({name:"UDworksList",params:{id}})
        },
    },
    data (){
        return {
            list: [],
            height: 350,
            widths: [],
            margin: 5,
            imgUrl:require("@/assets/image/like.png"),
            show: false,
            imglength:0,

            likecss:"icon",
            like :[],

            categoryArray: [],
            category: "",
            searchTitle: "",
        }
    },
}
</script>

<style lang="less" scope>
.icon-click{
    display: block;
    width: 35px;
    height: 35px;
    margin-top:10px;
    background:url("../../assets/image/like-click.png") no-repeat center/100%;
    cursor: pointer;
}
    .remen{
        // padding:10px;
        overflow: hidden;
        .search-box{
            // height: 60px;
            padding:10px 0px;
            background:#fff;
            border-bottom:1px solid #eee;
            text-align: center;
            .search-title{
                line-height: 20px;
            }
            select{
                height: 25px;
            }
            .search-but{
                height: 25px;
                width: 50px;
                border: 1px solid transparent;  //自定义边框
                outline: none;  
                background: rgb(64,158,255);
                border-radius: 5px;
                color:#fff;
                cursor: pointer;
            }
            .search-but:hover{
                background: rgb(64,158,200);
            }
        }
        .works-list{
            box-sizing: border-box;
            width: 100%;
            overflow: hidden;
            opacity: 0;
            padding:0px 10px;
            .works{
                position: relative;
                height: 350px;
                float: left;
                overflow: hidden;
                img{
                    width: 100%;
                    // display: none;
                }
                .news{
                    position:absolute;
                    bottom:-50px;
                    width: 100%;
                    line-height: 50px;
                    background: rgba(0, 0, 0, 0.5);
                    color:#fff;
                    box-sizing: border-box;
                    padding: 0px 20px;
                    .news-left{
                        float:left;
                        cursor: pointer;
                        img{
                            width: 30px;
                            height: 30px;
                            border-radius: 50%;
                            vertical-align: middle;
                        }
                        span{
                            margin-left:5px;
                            vertical-align: middle;
                            font-size:13px;
                        }
                    }
                    .news-right{
                        float:right;
                        .icon{
                            display: block;
                            width: 35px;
                            height: 35px;
                            margin-top:10px;
                            background:url("../../assets/image/like.png") no-repeat center/100%;
                            cursor: pointer;
                        }
                        .icon:hover{
                            background-image:url("../../assets/image/like-hover.png")
                        }
                    }
                }
            }
        }
    }
</style>