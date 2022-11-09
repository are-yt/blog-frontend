module.exports = {
    publicPath: './',
    productionSourceMap: false,
    devServer: {
        // 不检查主机，方便内网穿透
        disableHostCheck: true
    }
}