import { Layout } from 'antd';
import { RecoilRoot } from 'recoil';



// 作为路由的高阶组件使用
const AuthWrapper = (props) => {
	return (
		<RecoilRoot>
			<div>
				{props.children}
			</div>
		</RecoilRoot>
	);
};

export default AuthWrapper;
