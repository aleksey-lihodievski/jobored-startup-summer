import { Navigate, Route, Routes } from 'react-router-dom';

import { DefaultLayout } from '@modules/common/components';

const Router = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<DefaultLayout>
						<div>favorites</div>
					</DefaultLayout>
				}
			/>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
};

export default Router;
