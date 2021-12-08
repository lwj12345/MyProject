<template>
  <!--  1. 创建地图容器元素-->
  <div class="main" :style ="note">
    <div class="header">
      <div class="title">
        <span>乳源商圈分布情况</span>
      </div>
    </div>
    <div class="footer">
       <div class="left">
        <div class="bmap" id="container"></div>
        <div class="button">
              <ul style="margin-top:44px;width: 870px;">
                  <li><button class="btn-style">大桥镇商圈</button></li>
                  <li><button class="btn-style">桂头镇商圈</button></li>
                  <li><button class="btn-style">一六镇商圈</button></li>
                  <li><button class="btn-style">东坪镇商圈</button></li>
                  <li><button class="btn-style">大布镇商圈</button></li>
                  <li><button class="btn-style">游溪镇商圈</button></li>
                  <li><button class="btn-style">必背镇商圈</button></li>
                  <li><button class="btn-style">洛阳镇商圈</button></li>
                  <li><button class="btn-style">大峡谷旅游商圈</button></li>
                  <li><button class="btn-style">丹霞机场商圈</button></li>
              </ul>
          </div>
       </div>  
    <div class="right">
      <div class="word" v-show="index==currentIndex" v-for="(item,index) in list" :key="item.name" :data="item">
        <div class="word_title">商圈名称：<span style="color:#e4f5f8">{{item[0]}}</span></div>
         <div class="word_title">设施情况</div>
         <div style="width: 100%;position: relative;top: -4 %;">
           <ul class="content">
             <li>商城,商场情况:<span>{{item[1]}}</span></li>
             <li>政府部门:<span>{{item[2]}}</span></li>
             <li>车站等交通设施:<span>{{item[3]}}</span></li>
             <li>工业区:<span>{{item[4]}}</span></li>
             <li>景区娱乐设施<span>{{item[5]}}</span></li>
             <li>乡镇居民区:<span>{{item[7]}}</span></li>
             <li>城市居民区:<span>{{item[6]}}</span></li>
             <li>商圈设施得分:<span>{{item[8]}}</span></li>
             <li style="width:255px">社区分析:<span>{{item[9]}}</span></li>
           </ul>
         </div>
         <div style="width:90%;heigth:80%;position: relative;top: -57px;">
         <div class="word2"><span>商圈热度</span></div>
         <div class="word_title2">铺租情况:<span>{{item[10]}}</span></div>
         <div class="word_title2">客流情况:<pre>{{item[11]}}</pre></div>
         <div class="word_title2">零售网点数量:<pre style="margin-left:110px;margin-top: -18px;">{{item[12]}}</pre></div>
         <div class="word_title2">面积修正系数:<pre style="margin-left:110px;margin-top: -18px;">{{item[13]}}</pre></div>
         <div class="word_title2">商圈热度评分:<span>{{item[14]}}</span></div>
         </div>
         
      </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data:function(){
    return{
      currentIndex:0,
        note: {
            backgroundImage: "url(" + require("../assets/bg2.png") + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            width:"100%",
            height:"100%",
            position:'fixed',
            overflow:"hidden"
          },
       list:[],
       defaultProps: {
          children: 'children',
          label: 'name'
        },
    }
  },
  
  name: 'BmapDemo',
    created(){
        this.getAllList()
    },
      methods:{
       getAllList: function () {
          this.$axios.get("http://hcguang.cn:8009/test/test1").then(res=>{
          // console.log(res.data.data.list)
           var result = res.data.data.list
           console.log(result)
           if(result.status != 0){
             this.list = result
             console.log(this.list)
           }else{
             alert("获取数据失败")
           }
          })
        },
         handleNodeClick(data) {
        console.log(data);
      },
    },
  mounted () {
    var current = 0
    // 2. 创建地图示例
    var map = new window.BMap.Map('container') //默认开启卫星地图
    // 3. 设置中心点坐标
    var point = new window.BMap.Point(113.293765,24.784729)
    // 4. 地图初始化，同时设置地图展示级别
    map.centerAndZoom(point, 15)
    // 5. 开启鼠标滚轮缩放 
    map.enableScrollWheelZoom(true)
    map.disableDragging()
    map.disableScrollWheelZoom();//禁止缩放
    map.disableDoubleClickZoom()
    var scaleCtrl = new window.BMap.ScaleControl() // 添加比例尺控件
    map.addControl(scaleCtrl)
   
         // 文昌公园商圈
var polygon1 = new BMap.Polygon([
    new BMap.Point(113.286062,24.779537),
    new BMap.Point(113.291002,24.788907),
    new BMap.Point(113.298723,24.786664),
    new BMap.Point(113.295202,24.778307),
    new BMap.Point(113.291591,24.779508),
    new BMap.Point(113.286102,24.779504),
], {
     strokeColor: '#ed0024',
    strokeWeight: 6,
    strokeOpacity: 0
     }
);
polygon1.setFillColor('none')
var opts = {
	  position : new BMap.Point(113.285939,24.779324),    // 指定文本标注所在的地理位置
	  offset : new BMap.Size(50, -60)    //设置文本偏移量
	}
	var label = new BMap.Label("文昌公园商圈", opts);  // 创建文本标注对象   
	map.addOverlay(label);
  map.addOverlay(polygon1);
  label.addEventListener('click', function () {
  
});


// 移民村商圈
var polygon3 = new BMap.Polygon([
    new BMap.Point(113.295372,24.7782),
   new BMap.Point(113.29893,24.786681),
    new BMap.Point(113.308883,24.785262),
    new BMap.Point(113.30184,24.773796),
    new BMap.Point(113.295399,24.778176),
    
], {
     strokeColor: "#3f04cc", strokeOpacity:0,fillOpacity:0}
);
polygon3.setFillColor('none')
var opts = {
	  position : new BMap.Point(113.298928,24.786837),    // 指定文本标注所在的地理位置
	  offset   : new BMap.Size(30, 60)    //设置文本偏移量
	}
	var label2 = new BMap.Label("移民村商圈", opts);  // 创建文本标注对象    
	map.addOverlay(label2); 
  map.addOverlay(polygon3);

// 政务商圈
var polygon2 = new BMap.Polygon([
    new BMap.Point(113.290935,24.788961),
    new BMap.Point(113.285904,24.779537),
    new BMap.Point(113.282104,24.78007),
    new BMap.Point(113.279508,24.781493),
    new BMap.Point(113.281772,24.789867),
    new BMap.Point(113.290872,24.788928),
], {
     strokeColor: "green", strokeOpacity:0,fillOpacity:0}
);
var opts = {
	  position : new BMap.Point(113.285939,24.779324),    // 指定文本标注所在的地理位置
	  offset   : new BMap.Size(-50, -110)    //设置文本偏移量
	}
	var label = new BMap.Label("政务商圈", opts);  // 创建文本标注对象 
  polygon2.setFillColor('none')    
	map.addOverlay(label); 
    map.addOverlay(polygon2);

// 南水商圈
var polygon4 = new BMap.Polygon([
    new BMap.Point(113.26544,24.783195),
    new BMap.Point(113.277836,24.782342),
    new BMap.Point(113.279417,24.781522),
    new BMap.Point(113.28319,24.795661),
    new BMap.Point(113.248082,24.80322),
    new BMap.Point(113.2488960339983,24.786079633522913)
], {
     strokeColor: "orange", strokeOpacity:0,fillOpacity:0}
);
var opts = {
	  position : new BMap.Point(113.28319,24.795661),    // 指定文本标注所在的地理位置
	  offset   : new BMap.Size(-140, 100)    //设置文本偏移量
	}
	var label = new BMap.Label("南水商圈", opts);  // 创建文本标注对象   
   polygon4.setFillColor('none')  
	map.addOverlay(label); 
  map.addOverlay(polygon4);

// 乳源客运站商圈
var polygon5 = new BMap.Polygon([
    new BMap.Point(113.28161607728971,24.766503169442913),
    new BMap.Point(113.282262,24.779972),
    new BMap.Point(113.285921,24.779389),
    new BMap.Point(113.291598,24.779389),
    new BMap.Point(113.295228,24.778175),
    new BMap.Point(113.301571,24.773714),
    new BMap.Point(113.30476,24.772475),
    new BMap.Point(113.306259,24.764593),
], {
    strokeColor: "yellow", strokeOpacity:0,fillOpacity:0}
);
var opts = {
	  position : new BMap.Point(113.295228,24.778175),    // 指定文本标注所在的地理位置
	  offset   : new BMap.Size(-110, 10)    //设置文本偏移量
	}
  polygon5.setFillColor('none') 
	var label = new BMap.Label("乳源客运站商圈", opts);  // 创建文本标注对象    
	map.addOverlay(label); 
    map.addOverlay(polygon5);
// 工业区商圈
var polygon6 = new BMap.Polygon([
  new BMap.Point(113.31875748435758,24.762806224862498),
  new BMap.Point(113.30754002992792,24.762763004426624),
  new BMap.Point(113.30502,24.77268),
  new BMap.Point(113.30202,24.773738),
  new BMap.Point(113.309045,24.785221),
  new BMap.Point(113.319568,24.781333),
  new BMap.Point(113.33326,24.756814),
], {
     strokeColor: "#8d008d", strokeOpacity:0,fillOpacity:0}
);
var opts = {
	  position : new BMap.Point(113.309133,24.785295),    // 指定文本标注所在的地理位置
	  offset   : new BMap.Size(30, 60)    //设置文本偏移量
	}
	var label = new BMap.Label("工业区商圈", opts);  // 创建文本标注对象   
  polygon6.setFillColor('none') 
	map.addOverlay(label); 
    map.addOverlay(polygon6);

// 水岸国际商圈
var polygon7 = new BMap.Polygon([
    new BMap.Point(113.282095,24.779767),
    new BMap.Point(113.281777,24.774784),
    new BMap.Point(113.272749,24.77679),
    new BMap.Point(113.273876,24.782408),
    new BMap.Point(113.277784,24.782162),
    // new BMap.Point(113.282122,24.779824),
], {
     strokeColor: "blue", strokeOpacity:0,fillOpacity:0}
);
var opts = {
	  position : new BMap.Point(113.272626,24.776634),    // 指定文本标注所在的地理位置
	  offset   : new BMap.Size(40, -30)    //设置文本偏移量
	}
  polygon7.setFillColor('none')    
	var label = new BMap.Label("水岸国际商圈", opts);  // 创建文本标注对象    
	map.addOverlay(label); 
  map.addOverlay(polygon7);

// 云门山商圈
var polygon8 = new BMap.Polygon([
new BMap.Point(113.28520127139058,24.80332217314322),
    new BMap.Point(113.281645,24.790018),
    new BMap.Point(113.290951,24.789034),
    new BMap.Point(113.298892,24.786771),
    new BMap.Point(113.305145,24.78595),
    new BMap.Point(113.3134188627401,24.807481375317835),
    //new BMap.Point(113.284017,24.798481),
], {
    strokeColor: "gray", strokeOpacity:0,fillOpacity:0}
);
var opts = {
	  position : new BMap.Point(113.305145,24.78595),    // 指定文本标注所在的地理位置
	  offset   : new BMap.Size(-110, -150)    //设置文本偏移量
	}
   polygon8.setFillColor('none')  
	var label = new BMap.Label("云门山商圈", opts);  // 创建文本标注对象    
	map.addOverlay(label); 
  map.addOverlay(polygon8);

// 田心区商圈
var polygon9 = new BMap.Polygon([
    new BMap.Point(113.332685,24.757274),
    new BMap.Point(113.357981,24.750579),
    new BMap.Point(113.34148495811952,24.80138988003406),
    new BMap.Point(113.314288,24.809632),
    new BMap.Point(113.305216,24.785885),
    new BMap.Point(113.309044,24.785425),
    new BMap.Point(113.319697,24.781456), 
], {
    strokeColor: "#880015", strokeOpacity:0,fillOpacity:0}
);
var opts = {
	  position : new BMap.Point(113.324512,24.793922),    // 指定文本标注所在的地理位置
	  offset   : new BMap.Size(-120, 60)    //设置文本偏移量
	}
  polygon9.setFillColor('none') 
	var label = new BMap.Label("田心区商圈", opts);  // 创建文本标注对象    
	map.addOverlay(label); 
  map.addOverlay(polygon9);

// 森林公园商圈
var polygon10 = new BMap.Polygon([
    new BMap.Point(113.28153444044796,24.76602357635096),
    new BMap.Point(113.281825,24.774698),
    new BMap.Point(113.272626,24.776699),
    new BMap.Point(113.273686,24.782473),
    new BMap.Point(113.265458,24.783031),
    new BMap.Point(113.251065,24.7859),
    new BMap.Point(113.244166,24.76779)
    
], {
    strokeColor: "black", strokeOpacity:0,fillOpacity:0}
);
 polygon10.setFillColor('none') 
var opts = {
	  position : new BMap.Point(113.262565,24.769908),    // 指定文本标注所在的地理位置
	  offset   : new BMap.Size(50, -120)    //设置文本偏移量
	}
	var label = new BMap.Label("森林公园商圈", opts);  // 创建文本标注对象    
	map.addOverlay(label); 
  map.addOverlay(polygon10);

var clickEvts = ['click', 'dblclick', 'rightclick'];
var moveEvts = ['mouseover', 'mouseout'];
var overlays = [polygon1,polygon2,polygon3,polygon4,polygon5,polygon6,polygon7,polygon8,polygon9,polygon10];

for (let i = 0; i < clickEvts.length; i++) {
    const event = clickEvts[i];
    for (let j = 0; j < overlays.length; j++) {
        const overlay = overlays[j];
        overlay.addEventListener(event, e => {
            switch (event) {
                case 'click':
                  this.currentIndex = j
                    console.log(2342342)
                    break;
                case 'dblclick':
                    console.log(111111)
                     window.open('https://hcguang.cn/tobacco/index.html',"_blank")
                    break;
                case 'rightclick':
                    var res = overlay.toString() + '被右击!';
            }
          
        });
    }
}
for (let i = 0; i < moveEvts.length; i++) {
    const event = moveEvts[i];
    for (let j = 0; j < overlays.length; j++) {
        const overlay = overlays[j];
        overlay.addEventListener(event, e => {
            switch (event) {
                case 'mouseover':
                    overlay.setFillColor('#6f6cd8')
                    break;
                case 'mouseout':
                    overlay.setFillColor('none')
                    break;
            }
        });
    }
}   
  },
 
}

</script>

<style scoped>
.el-tree .current{
  display: block;
}
.bmap {
  height: 60vh;
  border: 1px solid #000;
}
.header{
  width: 100%;
  height: 10%;
  font-size: 30px;
}
.header .title {
    float: left;
    width: 96%;
    height: 100%;
    text-align: center;
    font-size: 1.5rem;
    display: table;
    font-family: '汉仪铸字超然体';
    letter-spacing: 0.2rem;
    background-image: -webkit-linear-gradient(bottom, rgb(58, 164, 255), rgb(230, 229, 229));
    background-clip: text;
    -webkit-text-fill-color: transparent;
}
.footer{
  width: 100%;
    height: 85%;
    margin-top: 5%;
    padding-left:9%;
    box-sizing: border-box
}
.left{
  width:66%;
  height: 100%;
}

.header .title span {
  display: table-cell;
    vertical-align: middle;
}
.word_title{
  margin-left:83px;
  color:#96d2db;
  position:relative;
  top: 45px;
}
  .button{ margin-top: -36px;
    height: 40px;
    width: 780px;
    margin-left: 14px;}
  .button ul li{
    margin-top: -3px;
    list-style: none;
    float: left;
    margin-right: 20px;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
    margin-left: 3%;
    }
  .right{
        margin-left: 30px;
        width: 25%;
        height: 100%;
    }
.content{
  color:#96d2db;
}
.word{
  width: 100%;
  height: 90%;
  background-image: url("../../src/assets/word.png");
  background-size: 100%;
  background-repeat: no-repeat;
}
    .right ul li{
    list-style: none;
    float: left;
    width: 147px;
    font-size: 16px;
    margin-bottom: 3px;
    
    }
.right ul li span{
  color: #e4f5f8;
}
.word_title span{
   color: #e4f5f8;
}
.word_title2{
   margin-left: 55px;
  color:#96d2db;
  
}
.word_title2 span{
   color: #e4f5f8;
}
.word_title2 pre{
   color: #e4f5f8;
   font-size: 16px;
   margin: 5px;
}
.word2{
  margin-left: 55px;
  color:#96d2db;
  margin-left: 83px;
}
    .footer>div{
      float: left;
    }
    .right ul{
        margin-top: 55px;
    width: 85%;
    height: 125px;
    margin: 55px auto;
    }
.btn-style{
   width: 127px;
    height: 65px;
    border-style: none;
    background: url("../../src/assets/button.png") no-repeat;
    background-size: 100%;
    color: white;
    cursor: pointer;
}
</style>