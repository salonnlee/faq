const wepbackConfig = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader?cacheDirectory"], // 开启缓存
        include: path.resolve(__dirname, "src"), // 指定范围
        exclude: path.resolve(__dirname, "node_modules") // 排除范围
      }
    ]
  }
};

const webpackConfig = {
  plugins: [
    // 忽略 moment 库的 locale 文件夹
    new wepback.IgnorePlugin(/\.\/locale/, /moment/)
  ]
};

const webpackConfig = {
  module: {
    // react.min.js 没有使用模块化, 忽略对 react.min.js 的递归解析处理
    noParse: [/react\.min\.js$/]
  }
};

const webpackConfig = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["happypack/loader?id=babel"],
        include: path.resolve(__dirname, "src")
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: "babel",
      loaders: ["babel-loader?cacheDirectory"]
    })
  ]
};

const webpackConfig = {
  plugins: [
    new ParallelUglifyPlugin({
      // 还是使用 UglifyJS 压缩, 只不过帮忙开启了多进程
      uglifyJS: {
        output: {
          beautify: false,
          comments: false
        },
        compress: {
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true
        }
      }
    })
  ]
};

const webpackConfig = {
  devServer: {
    hot: true
  },
  plugins: [new wepback.HotReplacementPlugin()]
};

if (module.hot) {
  module.hot.accept("./hotdog.js", function () {
    console.log("Accepting the updated hotdog module!");
  });
}

// webpack.config.dll.js
const webpackDllConfig = {
  mode: "development",
  entry: {
    react: ["react", "react-dom"]
  },
  output: {
    filename: "[name].dll.js",
    path: path.resolve(__dirname, "dist"),
    library: "_dll_[name]" // 存放动态链接库的全局变量名称
  },
  plugins: [
    new DllPlugin({
      // 动态链接库的全局变量名称，需要和 output.library 中保持一致
      name: "_dll_[name]",
      // 描述动态链接库的 manifest.json 文件输出时的文件名称
      path: path.resolve(__dirname, "[name].manifest.json")
    })
  ]
};

// wepback.config.dev.js
const wepbackDevConfig = {
  mode: "development",
  plugins: [
    new DllReferencePlugin({
      // 描述 react 动态链接库的文件内容
      manifest: require(path.join(__dirname, "dist", "react.manifest.json"))
    })
  ]
};

// react.manifest.json
const reactManifestJson = {
  name: "_dll_react",
  content: {
    "./node_modules/react-dom/index.js": {
      id: "./node_modules/react-dom/index.js",
      buildMeta: {
        exportsType: "dynamic",
        defaultObject: "redirect"
      }
    },
    "./node_modules/react/index.js": {
      id: "./node_modules/react/index.js",
      buildMeta: {
        exportsType: "dynamic",
        defaultObject: "redirect"
      }
    }
  }
};
