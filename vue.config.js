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
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/styles/variable.scss";`
      },
      scss: {
        prependData: `@import "~@/styles/mixin.scss";`
      },
      scss: {
        prependData: `@import "~@/styles/index.scss";`
      },
    }
  },
  chainWebpack: config => {
    // 去除console与debugger
    config.optimization
      .minimizer('terser')
      .tap(args => {
        Object.assign(args[0].terserOptions.compress, {
          warnings: false,
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log']
        })
        return args
      });

    const oneOfsMap = config.module.rule("scss").oneOfs.store;
    oneOfsMap.forEach(item => {
      item
        .use("sass-resources-loader")
        .loader("sass-resources-loader")
        .options({
          // Provide path to the file with resources
          resources: ["./src/styles/variable.scss", "./src/styles/mixin.scss", "./src/styles/index.scss"]
        })
        .end();
    });
  },
};
