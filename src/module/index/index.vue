<template>
  <div id="app">
    <img src="../../assets/img/logo.png">
    {{msg}}
  </div>
</template>

<script>
  //css引入方式
  import '../../assets/css/style.css'

  export default {
    name: 'app',
    data: () => {
      return {
        msg: ''
      };
    },
    mounted: () => {
      var _this = this;
      _this.msg = '测试111111';
      console.log(utils.queryString('a'));
    },
    methods: {
      showPrompt: () => {
        utils.prompt('提示框');
      },
    }
  }
</script>

<style>
</style>
