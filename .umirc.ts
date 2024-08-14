import { defineConfig } from 'umi';
import defaultSettings from './config/defaultSettings';
import devProxy from './config/devConfig/devProxy';
import devRoutes from './config/devConfig/devRoutes';
import devServer from './config/devConfig/devServer';
import buildConfig from './config/prodConfig/buildConfig';

const basicUmiConfig = defineConfig({
	// 使用@代替src目录
	alias: {
		'@': './src',
	},
	theme: {
		'@primary-color': defaultSettings.primaryColor,
	},
	dynamicImport: {
		loading: '@/pages/components/PageLoading',
	},
	proxy: devProxy, // 前端代理
	routes: devRoutes, // 前端路由
	links: [{ rel: 'icon', href: 'img/favicon.ico' }],
	title: '物理所', // 页面默认标题
	devServer, // 前端服务配置
	nodeModulesTransform: {
		// 是否编译node_moudles文件下的脚本
		type: 'none', // 默认不编译
		exclude: [], // 需要额外编译的
	},
	fastRefresh: {}, // 支持快速刷新特性
	// cssMoudle生成的样式文件，生成对应类型文件
	cssModulesTypescriptLoader: {},
	// 生成SourceMap类型
	webpack5: {},
	mfsu: {},
});

// 根据环境区分打包配置
const useConfig = { ...basicUmiConfig };

export default useConfig;
