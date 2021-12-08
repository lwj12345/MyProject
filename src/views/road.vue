<template>
<div class="main">
    <div id="allmap"></div>
    <div id="nav">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
    </div>
</div>
    
</template>

<script>

export default {
     data() {
      return {
        currentIndex:0,
        listpoint:[],
        arrayList: [],
        arrayList2:[],
        array:[]
      };
    },
    created(){
        this.change()
    },
     methods: {
       change(){
        // var nav=document.getElementById('nav');
        // var oNav=nav.getElementsByTagName('li');
        // let that = this;
        // for(var i=0;i<oNav.length;i++){
        //   oNav[i].index = i;
        //   oNav[i].onclick = function(){
        //   that.currentIndex = this.index
        //   console.log(that.currentIndex)
        //   }
        // }
       },
//  getAllList: function () {
//           this.$axios.get("http://120.55.66.104:8009/region/route/getSevenRoute").then(res=>{
//          console.log(res.data.data.list)
//            var result = res.data.data.list[0]
//            var result2 = res.data.data.list[1]
//         //    console.log(result)
//            if(result.status != 0){
//              this.array = result
//              this.arrayList2 = result2
//               for(let i=0;i<this.array.length;i++){ //放到axios那里//七条线路
//                 //  console.log(this.array[i])
//                  //遍历七条线路得到里面的经纬度
//                  for(let j=0;j<this.array[i].length;j++){
//                    let p1 = this.array[i][j].x;
//                    let p2 = this.array[i][j].y;
//                    var point = new BMap.Point(p1,p2)
//                    this.listpoint.push(point)
//                  }    
//           }
//              console.log(this.listpoint)
//                  return this.listpoint;            
//            }else{
//              alert("获取数据失败")
//            }
//           })
//         },
      BaiduMap() {
        // this.change();
        // this.getAllList();
        // 百度地图API功能
        var map = new BMap.Map("allmap");
        map.centerAndZoom(new BMap.Point(113.300943,24.768724), 13);
        map.enableScrollWheelZoom(true);
        

        function showPoly(pointList) {
          //循环显示点对象
          for (var c = 0; c < pointList.length; c++) {
            var marker = new BMap.Marker(pointList[c]);
            map.addOverlay(marker);
            //将途经点按顺序添加到地图上
            var label = new BMap.Label(c + 1, { offset: new BMap.Size(20, -10) });
            marker.setLabel(label);
          }
  
          var group = Math.floor(pointList.length / 29); //线路条数
          var mode = ""; //多余个数
          var remainder = pointList.length % 29;
          var calculate = remainder + group;
  
          //线条数 多余个数计算
          if (calculate === 29) {
            group += 1;
          } else if (calculate > 29) {
            group += 1;
            mode = calculate - 29;
          } else {
            mode = calculate - 1;
          }
  
          var driving = new BMap.DrivingRoute(map, {
            onSearchComplete: function(results) {
              if (driving.getStatus() == BMAP_STATUS_SUCCESS) {
                var plan = driving.getResults().getPlan(0);
                var num = plan.getNumRoutes();
                // alert("plan.num ：" + num);
                for (var j = 0; j < num; j++) {
                  var pts = plan.getRoute(j).getPath(); //通过驾车实例，获得一系列点的数组
                  var polyline = new BMap.Polyline(pts);
                  map.addOverlay(polyline);
                }
                searchFn();
              }
            }
          });
  
          //多出的一段单独进行search
          var endFn = function() {
            if (mode !== "") {
              var waypoint = pointList.slice(
                group * 28 + 1,
                pointList.length - 1
              );
              if (mode === 1) {
                //余数为1 途经点为空
                waypoint = [];
              }
              driving.search(
                pointList[group * 28],
                pointList[pointList.length - 1],
                { waypoints: waypoint }
              );
            }
          };
  
          var groupCopy = parseInt(group.toString());
          //整条线路递归
          var searchFn = function() {
            groupCopy--;
            if (groupCopy >= 0) {
              var i = group - groupCopy - 1;
              var waypoint = pointList.slice(i * 28 + 1, (i + 1) * 28);
              driving.search(
                pointList[i * 28],
                pointList[(i + 1) * 29 - (i + 1)],
                { waypoints: waypoint }
              );
            } 
            else if (groupCopy == -1) {
              endFn();
            }
          };
          searchFn();
        }
      
        console.log(this.currentIndex)
         this.$axios.get("http://120.55.66.104:8009/region/route/getSevenRoute").then(res=>{ 
           var result = res.data.data.list[0]
           var result2 = res.data.data.list[1]
        var nav=document.getElementById('nav');
        var oNav=nav.getElementsByTagName('li');
        let that = this;
        for(var i=0;i<oNav.length;i++){
          oNav[i].index = i;
          oNav[i].onclick = function(){
          that.currentIndex = this.index
          console.log(this.index)
           if(result.status != 0){
             console.log(23423)
           }else{}
          }
        }
          //  if(result.status != 0){
          //    that.array = result
          //    that.arrayList2 = result2
          //     for(let i=0;i<that.array.length;i++){ //放到axios那里//七条线路
          //       //  console.log(this.array[i])
          //         i=that.currentIndex
          //         console.log(that)
          //        //遍历七条线路得到里面的经纬度
          //        for(let j=0;j<this.array[i].length;j++){
          //         //  i =5
          //          let p1 = this.array[i][j].x;
          //          let p2 = this.array[i][j].y;
          //          var point = new BMap.Point(p1,p2)
          //          this.listpoint.push(point)
          //        }    
          //        break
          // }
          // showPoly(this.listpoint);
          //    console.log(this.listpoint)
          //       //  return this.listpoint;            
          //  }else{
          //    alert("获取数据失败")
          //  }
          })
      }
    },
    mounted() {
      // this.change()
      this.BaiduMap();
    },
}
</script>
<style scoped>
body,html{
    margin: 0%;
    padding: 0%;
  }
  #allmap {
    width: 70%;
    height: 90vh;
    overflow: hidden;
    margin: 0;
    float: left;
    font-family: "微软雅黑";
  }
</style>