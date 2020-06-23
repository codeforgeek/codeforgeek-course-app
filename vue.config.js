module.exports = {
    publicPath: "",
    outputDir: undefined,
    assetsDir: undefined,
    runtimeCompiler: undefined,
    productionSourceMap: undefined,
    parallel: undefined,
    chainWebpack: config => config.optimization.minimize(false)
}