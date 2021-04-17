module.exports = {
  devServer: {
    proxy: {
      "/nj-server": {
        target: "http://localhost:1111",
        secure: true,
        changeOrigin: true,
        pathRewrite: {
          "^/nj-server": "",
        },
      },
    },
  },
};
