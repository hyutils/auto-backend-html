import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home/index';

const App = (props) => {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/home/*" element={<Home />} />
					<Route
						exact
						path="*"
						element={<Navigate to="/home/list1" />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
};
export default App;
