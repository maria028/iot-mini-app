# Taro-Template
[Taro](https://taro-docs.jd.com/docs/)+[Redux](https://www.redux.org.cn/tutorials/)+TypeScript+[NutUI](https://nutui.jd.com/)+Eslint



# 使用 pnpm 安装依赖
```
$ pnpm install
```

# 微信小程序
#### 编译命令
```
$ pnpm run dev:weapp
$ pnpm run build:weapp
```
#### 小程序开发者工具
下载并打开微信开发者工具，然后选择项目根目录进行预览。需要注意开发者工具的项目设置：
- 需要设置关闭 ES6 转 ES5 功能，开启可能报错
- 需要设置关闭上传代码时样式自动补全，开启可能报错
- 需要设置关闭代码压缩上传，开启可能报错


# 目录结构
```
├── dist                        编译结果目录
|
├── config                      项目编译配置目录
|   ├── index.js                默认配置
|   ├── dev.js                  开发环境配置
|   └── prod.js                 生产环境配置
|
├── src                         源码目录
|   ├── components              组件
|   ├── assets                  资源文件目录
|   ├── store                   Redux
|   ├── hooks                   Hooks
|   ├── services                api请求
|   ├── utils                   函数、工具
|   ├── pages                   页面文件目录
|   |   └── index               index 页面目录
|   |       ├── index.js        index 页面逻辑
|   |       ├── index.css       index 页面样式
|   |       └── index.config.js index 页面配置
|   |
|   ├── app.js                  项目入口文件
|   ├── app.css                 项目总通用样式
|   └── app.config.js           项目入口配置
|
├── project.config.json         微信小程序项目配置 project.config.json
|
├── babel.config.js             Babel 配置
├── tsconfig.json               TypeScript 配置
├── .eslintrc                   ESLint 配置  ESLint 配置请参考 [Github](https://github.com/NervJS/taro/tree/main/packages/eslint-config-taro)
|
└── package.json
```


