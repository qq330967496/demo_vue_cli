<template>
  <div id="app" v-cloak>
    <div id="main">
      <!--<div class="mod">
          <div class="title">
              水平弹性布局
          </div>
          <div class="flex-container">
              <div>
                  1
              </div>
              <div>
                  2
              </div>
              <div>
                  3
              </div>
          </div>
      </div>
      <div class="mod">
          <div class="title">
              垂直弹性布局
          </div>
          <div class="flex-container column">
              <div style="line-height: 250%;">
                  1
              </div>
              <div style="line-height: 250%;">
                  2
              </div>
              <div style="line-height: 250%;">
                  3
              </div>
          </div>
      </div>-->

      <div class="mod">
        <div class="title">
          按钮样式
        </div>
        <div class="btn">
          默认按钮
        </div>
        <div class="btn btn_disabled">
          不可用按钮
        </div>
      </div>

      <div class="mod list">
        <div class="title">
          列表样式
        </div>
        <div class="list_item">
          普通列表项
        </div>
        <div class="list_item arrow">
          箭头列表项
        </div>
        <div class="list_item delete">
          左滑删除列表项
        </div>
        <div class="list_item add">
          左滑添加列表项
        </div>
      </div>

    </div>
  </div>
</template>

<!--scss引入-->
<style lang="scss">
  @import '../../assets/scss/style.scss';
</style>

<script>
//css引入
//  import '../../assets/css/style.css'



  export default {
    name: 'app',
    data(){
      return {
        msg:''
      };
    },
    beforeCreate: function () {
      console.log("生命周期-创建event实例前");
    },
    created: function () {
      console.log("生命周期-创建event实例后");
    },
    beforeMount: function () {
      console.log("生命周期-挂载到#app前");
    },
    mounted: function () {
      var _self = this;

      console.log("生命周期-挂载到#app后");

      utils.listItemDragBox($(".list .list_item.delete"), {
        text: '删除',
        backgroundColor: '#f00',
        binding: function ($this, $dragbox) {
          $dragbox.click(function () {
            console.log('删除');
          });
        }
      });

      utils.listItemDragBox($(".list .list_item.add"), {
        text: '添加',
        backgroundColor: '#0f0',
        binding: function ($this, $dragbox) {
          $dragbox.click(function () {
            console.log('添加');
          });
        }
      });
    },
    beforeUpdate: function () {
      console.log("生命周期-数据更新前");
    },
    updated: function () {
      console.log("生命周期-数据更新后");
    },
    actived: function () {
      console.log("生命周期-组件被激活");
    },
    deactived: function () {
      console.log("生命周期-组件被移除");
    },
    beforeDestroy: function () {
      console.log("生命周期-销毁前");
    },
    destroyed: function () {
      console.log("生命周期-销毁后");
    },
    //各种方法
    methods: {}
  }
</script>


