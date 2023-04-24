import { Navigate, Route, Routes } from 'react-router-dom';

import { DefaultLayout } from '@modules/common/components';

const Router = () => {
	return (
		<Routes>
			<Route
				path="/favorites/*"
				element={
					<DefaultLayout>
						<div>favorites</div>
					</DefaultLayout>
				}
			/>
			<Route
				path="/vacancies/*"
				element={
					<DefaultLayout>
						<div>vacancies</div>
					</DefaultLayout>
				}
			/>
			<Route path="/" element={<Navigate to="/vacancies" replace />} />

			<Route
				path="*"
				element={
					<DefaultLayout>
						<div>not found</div>
					</DefaultLayout>
				}
			/>
		</Routes>
	);
};

export default Router;
