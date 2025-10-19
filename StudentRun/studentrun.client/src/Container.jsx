import { Routes, Route } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ClassroomsPage from './pages/ClassroomsPage';
import StudentsPage from './pages/StudentsPage';
import StudentDetailsPage from './pages/StudentDetailsPage';
import ProgressPage from './pages/ProgressPage';
import { useState, useEffect } from 'react';

function Container() {
    const [students, setStudents] = useState([]);
    const [achievements, setAchievements] = useState([]);

    const teachers = useQuery({
        queryKey: ['teachers'],
        queryFn: () => fetch('/teacher').then((res) =>
            res.json(),
        )
    })

    if (teachers.isPending) {
        return <span>Loading...</span>
    }

    if (teachers.isError) {
        return <span>Error: {teachers.isError.message}</span>
    }

    const loadStudents = async (id) => {
        try {
            const response = await fetch(`/teacher/${id}/student`);
            if (response.ok) {
                const data = await response.json();
                setStudents(data);
            }
        } catch (error) {
            console.error('Error loading students:', error);
        }
    };

    const loadAchievements = () => {
        // Mock achievements data
        const mockAchievements = [
            { id: 1, name: 'First Lap', description: 'Complete your first lap', lapsRequired: 1, unlocked: true },
            { id: 2, name: 'Halfway There', description: 'Complete 5 laps', lapsRequired: 5, unlocked: false },
            { id: 3, name: 'Marathon Runner', description: 'Complete 10 laps', lapsRequired: 10, unlocked: false },
        ];
        setAchievements(mockAchievements);
    };

    const addTeacher = async (teacherData) => {
        try {
            const response = await fetch('/teacher', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(teacherData),
            });
            if (response.ok) {
                //loadTeachers();
            }
        } catch (error) {
            console.error('Error adding teacher:', error);
        }
    };

    const addStudent = (studentData) => {
        const newStudent = {
            id: students.length + 1,
            ...studentData,
            lapsCompleted: 0,
            totalLaps: 10,
        };
        setStudents([...students, newStudent]);
    };

    const updateStudentLaps = (studentId, laps) => {
        setStudents(students.map(student =>
            student.id === studentId
                ? { ...student, lapsCompleted: laps }
                : student
        ));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navigation />
            <main className="container mx-auto px-4 py-8">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/classrooms"
                        element={
                            <ClassroomsPage
                                teachers={teachers.data}
                                onAddTeacher={addTeacher}
                            />
                        }
                    />
                    <Route
                        path="/classrooms/:teacherId/student"
                        element={
                            <StudentsPage
                                teachers={teachers.data}
                                students={students}
                                onAddStudent={addStudent}
                            />
                        }
                    />
                    <Route
                        path="/students/:studentId"
                        element={
                            <StudentDetailsPage
                                students={students}
                                teachers={teachers.data}
                                onUpdateLaps={updateStudentLaps}
                            />
                        }
                    />
                    <Route
                        path="/progress"
                        element={
                            <ProgressPage
                                students={students}
                                achievements={achievements}
                                onUpdateAchievements={setAchievements}
                            />
                        }
                    />
                </Routes>
            </main>
        </div>
    );
}

export default Container;