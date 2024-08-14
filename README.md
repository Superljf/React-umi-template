# React-umi-template
React webpack ts umi template

# 项目名称

这是一个使用 [Umi](https://umijs.org/) 进行构建的 React 项目，包含常用的依赖和开发工具。

## 项目结构

该项目主要使用以下技术栈：

- **React 17.x**: 用于构建用户界面。
- **Umi 3.5.20**: 作为应用开发的框架和工具链。
- **Ant Design 4.23.0**: 一套企业级的 UI 设计语言和 React 组件库。
- **ECharts 5.4.3**: 一个基于 JavaScript 的开源可视化图表库。
- **Recoil 0.5.2**: 用于状态管理的 React 库。
- **TypeScript 4.1.2**: 为 JavaScript 添加类型的编程语言。

## 安装依赖

在克隆或下载项目后，可以通过以下命令安装所需的依赖：


npm install
```

## 本地开发

你可以使用以下命令在本地启动开发服务器：

```bash
npm start
```

启动后，可以访问 `http://localhost:8000` 查看项目。

如果需要在启动时使用 mock 数据，可以使用以下命令：

```bash
npm run start:mock
```

## 构建项目

使用以下命令可以对项目进行生产环境的构建：

```bash
npm run build
```

构建完成后，生成的静态文件会保存在 `dist` 目录中。

## 项目依赖

### 生产依赖

- **[antd](https://github.com/ant-design/ant-design)**: ^4.23.0
- **[axios](https://github.com/axios/axios)**: ^0.26.0
- **[echarts](https://github.com/apache/echarts)**: ^5.4.3
- **[echarts-for-react](https://github.com/hustcc/echarts-for-react)**: ^3.0.2
- **[react](https://reactjs.org/)**: 17.x
- **[react-dom](https://reactjs.org/)**: 17.x
- **[recoil](https://recoiljs.org/)**: ^0.5.2
- **[umi](https://umijs.org/)**: ^3.5.20
- **[umi-request](https://github.com/umijs/umi-request)**: ^1.4.0
- **[whatwg-fetch](https://github.com/github/fetch)**: ^3.6.20

### 开发依赖

- **[@types/react](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react)**: ^18.0.14
- **[@types/react-dom](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-dom)**: ^17.0.0
- **[@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint)**: ^4.30.0
- **[@typescript-eslint/parser](https://github.com/typescript-eslint/typescript-eslint)**: ^4.30.0
- **[@umijs/fabric](https://github.com/umijs/fabric)**: ^4.0.1
- **[@umijs/lint](https://github.com/umijs/umi-lint)**: ^4.0.90
- **[@umijs/preset-react](https://github.com/umijs/umi)**: ^2.1.7
- **[babel-eslint](https://github.com/babel/babel-eslint)**: ^10.1.0
- **[eslint](https://github.com/eslint/eslint)**: ^8.56.0
- **[eslint-plugin-import](https://github.com/import-js/eslint-plugin-import)**: ^2.22.1
- **[eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)**: ^7.32.2
- **[eslint-plugin-react-hooks](https://github.com/facebook/react)**: ^4.2.0
- **[prettier](https://github.com/prettier/prettier)**: ^3.1.1
- **[stylelint](https://github.com/stylelint/stylelint)**: ^16.1.0
- **[typescript](https://github.com/Microsoft/TypeScript)**: ^4.1.2

## 代码格式化与检查

项目使用 ESLint 和 Prettier 进行代码格式化和检查。可以使用以下命令来检查代码质量：

```bash
npm run lint
```

## License

该项目遵循 MIT License - 详情请参阅 [LICENSE](./LICENSE) 文件。
```
