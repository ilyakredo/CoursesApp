import './App.css';
import { Header } from './components/Header/Header';
import { Courses } from './components/Courses/Courses';
import { useEffect, useMemo, useState } from 'react';
import { CourseForm } from './components/CourseForm/CourseForm';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Registration } from './components/Registration/Registration';
import { Login } from './components/Login/Login';
import { CourseInfo } from './components/CourseInfo/CourseInfo';
import { useDispatch, useSelector } from 'react-redux';
import { coursesSelctor } from './store/selectors';
import { authHandler } from './store/user/thunk';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { loadCourses } from './store/courses/thunk';
import { loadAuthors } from './store/authors/thunk';

export const App = () => {
	const [isLogged, setIsLogged] = useState(false);
	const coursesState = useSelector(coursesSelctor);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const createCoursesRoutes = () => {
		return coursesState.map((course) => {
			return (
				<Route
					path={`/courses/:${course.id}`}
					key={course.id}
					element={<CourseInfo course={course} />}
				/>
			);
		});
	};

	const handleLoggedPath = () => {
		return isLogged ? '/courses' : '/login';
	};
	const loggedPath = useMemo(handleLoggedPath, [isLogged]);
	useEffect(() => {
		const fetchData = async () => {
			dispatch(loadAuthors());
			dispatch(loadCourses());
		};
		fetchData();
		try {
			if (localStorage.getItem('token') && !isLogged) {
				dispatch(authHandler(localStorage.getItem('token'))).then((result) => {
					if (result) {
						setIsLogged(true);
						navigate('/courses');
					} else {
						localStorage.removeItem('token');
						navigate('/login');
					}
				});
			}
		} catch (error) {
			console.log(error);
		}
	}, [dispatch, navigate, isLogged]);

	return (
		<main className='App'>
			<Header isLogged={isLogged} setIsLogged={setIsLogged} />
			<Routes>
				<Route path='/' element={<Navigate to={loggedPath} />} />
				<Route
					path='/courses'
					element={isLogged ? <Courses /> : <Navigate to='/login' />}
				/>
				<Route path='/registration' element={<Registration />} />
				<Route path='/login' element={<Login setIsLogged={setIsLogged} />} />
				<Route
					path='/courses/add'
					element={<PrivateRoute children={<CourseForm />} />}
				/>
				<Route
					path='/courses/update/:courseId'
					element={<PrivateRoute children={<CourseForm />} />}
				/>
				{createCoursesRoutes()}
			</Routes>
		</main>
	);
};
