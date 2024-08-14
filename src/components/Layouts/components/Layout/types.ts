export interface LayoutProps {
	/**插槽 */
	children?: any;
	/**是否要全屏布局 */
	fullScreen?: boolean;
	/**左侧导航额外渲染的元素 */
	extraOnLeft?: any;
	/**索引值，用于显式控制高亮的菜单项 */
	activeIndex?: number;
	isGray?: boolean
}
