import { Routes, Route } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ClassroomsPage from './pages/ClassroomsPage';
import StudentsPage from './pages/StudentsPage';
import StudentDetailsPage from './pages/StudentDetailsPage';
import ProgressPage from './pages/ProgressPage';
import { useState } from 'react';

function Container() {
	const [achievements, setAchievements] = useState([
		{ id: 1, name: 'First Lap', description: 'Complete your first lap', lapsRequired: 1, unlocked: true },
		{ id: 2, name: 'Halfway There', description: 'Complete 5 laps', lapsRequired: 5, unlocked: false },
		{ id: 3, name: 'Marathon Runner', description: 'Complete 10 laps', lapsRequired: 10, unlocked: false },
	]);

	const teachers = useQuery({
		queryKey: ['teachers'],
		queryFn: async () => await fetch('/api/teacher')
			.then((res) => res.json())
			.catch(error => console.error('Error:', error))
	})

	const students = useQuery({
		queryKey: ['students'],
		queryFn: () => fetch('/api/student')
			.then(res => res.json())
			.catch(err => console.error('Error: ', err))
	})

	const prizes = useQuery({
		queryKey: ['prizes'],
		queryFn: () => fetch('/api/prize')
			.then(res => res.json())
			.catch(err => console.error('Error: ', err))
	})



	if (teachers.isPending) {
		return <span>Loading Teachers...</span>
	}

	if (teachers.isError) {
		return <span>Teacher Error: {teachers.isError.message}</span>
	}

	if (students.isPending) {
		return <span>Loading Students...</span>
	}

	if (students.isError) {
		return <span>Student Error: {students.isError.message}</span>
	}

	if (prizes.isPending) {
		return <span>Loading Prizes...</span>
	}

	if (prizes.isError) {
		return <span>Prize Error: {prizes.isError.message}</span>
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			<Navigation />
			<main className="container mx-auto px-4 py-8">
				<Routes>
					<Route
						path="/"
						element={
							<HomePage
								students={students.data}
							/>}
					/>
					<Route
						path="/classrooms"
						element={
							<ClassroomsPage
								teachers={teachers.data}
								students={students.data}
							/>
						}
					/>
					<Route
						path="/classrooms/:teacherId/student"
						element={
							<StudentsPage
								teachers={teachers.data}
								students={students.data}
							/>
						}
					/>
					<Route
						path="/students/:studentId"
						element={
							<StudentDetailsPage
								students={students.data}
								teachers={teachers.data}
							/>
						}
					/>
					<Route
						path="/progress"
						element={
							<ProgressPage
								students={students.data}
								prizes={prizes.data}
								achievements={achievements}
							/>
						}
					/>
				</Routes>
			</main>
		</div>
	);
}

export default Container;