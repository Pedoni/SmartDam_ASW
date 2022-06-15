const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        headers: { "Cache-Control": "max-age=31536000" }
    }
})
