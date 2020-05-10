<template>
    <div class="wangeditor">
        <div ref="editorElem" style="text-align:left;"></div>
    </div>
</template>

<script>
import E from "wangeditor";
export default {
    name: "Editor",
    data() {
    return {
      editor: null,
      editorContent: ''
    };
  },
  // catchData是一个类似回调函数，来自父组件，当然也可以自己写一个函数，主要是用来获取富文本编辑器中的html内容用来传递给服务端
  props: ['catchData'], // 接收父组件的方法
  mounted() {
    this.editor = new E(this.$refs.editorElem);
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.customConfig.onchange = html => {
      this.editorContent = html;
      this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
    };
    this.editor.customConfig.menus = [
      // 菜单配置
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'emoticon', // 表情
      'image', // 插入图片
      'table', // 表格
      'code', // 插入代码
      'undo', // 撤销
      'redo' // 重复
    ];
    this.editor.customConfig.uploadImgServer = 'http://localhost:8085/upload'

    this.editor.customConfig.uploadImgShowBase64 = true;
    // 将图片大小限制为 3M
    this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024
    // 限制一次最多上传 5 张图片
    this.editor.customConfig.uploadImgMaxLength = 5
    this.editor.customConfig.uploadImgHeaders = {
      // "Access-Control-Allow-Origin":" *",
      "token" : window.localStorage.getItem("token") || ""
    }
    // 可使用监听函数在上传图片的不同阶段做相应处理
    this.editor.customConfig.uploadImgHooks = {
      success: function (xhr, editor, result) {
        // 图片上传并返回结果，图片插入成功之后触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        console.log(result)
      },
      fail: function (xhr, editor, result) {
        // 图片上传并返回结果，但图片插入错误时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        console.log(result)
      },
    }
    this.editor.create(); // 创建富文本实例
  },
}
</script>

<style lang="less" scope>
    
</style>