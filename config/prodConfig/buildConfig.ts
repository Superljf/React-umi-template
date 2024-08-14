/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * 打包配置
 * 前端支持代码分割和动态加载
 */
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
interface IVerdor {
	resource: string;
}

export default {
	// 增加script,用于谷歌统计
	// 打包时进行相应polyfill处理
	targets: {},
	// 忽略MomentJS
	ignoreMomentLocale: true,
	// 打包文件夹名称
	outputPath: 'dist',
	// 编译打包后的文件带上哈希值，防止缓存
	hash: true,

	// 代码分割配置
	chunks: ['vendors', 'umi'],
	chainWebpack: function (config: any) {
		// 设置缓存
		config.cache({
			type: 'filesystem',
		});
		config.merge({
			optimization: {
				// 代码分割
				splitChunks: {
					chunks: 'all',
					minSize: 30000,
					minChunks: 3,
					automaticNameDelimiter: '.',
					cacheGroups: {
						vendor: {
							name: 'vendors',
							test(verdor: IVerdor) {
								const { resource } = verdor;
								return /[\\/]node_modules[\\/]/.test(resource);
							},
							priority: 10,
						},
					},
				},
			},
		});
		// 替换moment.js为day.js
		config.plugin('antd-dayjs-webpack-plugin').use(AntdDayjsWebpackPlugin);
	},
};
