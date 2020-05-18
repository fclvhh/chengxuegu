module.exports = {
  devServer: {
    port: 8888, // 端口号，如果端口号被占用，会自动提升1
    host: "localhost", //主机名， 127.0.0.1， 真机 0.0.0.0
    https: false, //协议
    open: true, //启动服务时自动打开浏览器访问

    proxy:{
      // 匹配想要跨域的请求请求
      // 跨域的uri标志为 /dev-api
      // 采用动态获取
      [process.env.VUE_APP_BASE_API]: {
        // 准予 跨域访问的目标服务器地址
        target:process.env.VUE_APP_SERVICE_URL,
        changeOrigin: true, //开启代理
         pathRewrite: {
                    // /dev-api/db.json 最终会发送 http://localhost:8001/db.json
                    // 将 请求地址前缀 /dev-api 替换为 空的，
                    // '^/dev-api': '',
                    [ '^' + process.env.VUE_APP_BASE_API]: ''

                }
      }
    }
 },
  lintOnSave: false, // 关闭格式检查
  productionSourceMap: false, // 打包时不会生成 .map 文件，加快打包速度
} 