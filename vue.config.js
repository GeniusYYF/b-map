module.exports = {
  /*
  * build
  */
  publicPath: "./",
  outputDir: "dist", //打包后的目录名称
  assetsDir: "static", //静态资源目录名称
  productionSourceMap: false, // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
  /*
  * server
  */
  // devServer: {
  //   open: true,
  //   host: config.ip.host,
  //   port: config.ip.port,
  //   proxy: {
  //     [config.ip.key]: {
  //       target: config.ip.serverIP,
  //       changeOrigin: true,
  //       pathRewrite: {
  //         ["^" + config.ip.key]: ""
  //       }
  //     }
  //   }
  // },
};
