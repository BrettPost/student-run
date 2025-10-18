import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ClassroomsPage from './pages/ClassroomsPage';
import StudentsPage from './pages/StudentsPage';
import StudentDetailsPage from './pages/StudentDetailsPage';
import ProgressPage from './pages/ProgressPage';
import './App.css';

function App() {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    // Load initial data
    loadTeachers();
    loadStudents();
    loadAchievements();
  }, []);

  const loadTeachers = async () => {
    try {
      const response = await fetch('/teacher');
      if (response.ok) {
        const data = await response.json();
        setTeachers(data);
      }
    } catch (error) {
      console.error('Error loading teachers:', error);
    }
  };

  const loadStudents = async () => {
    // Mock data for now - replace with actual API call
    const mockStudents = [
      { id: 1, firstName: 'Alice', lastName: 'Johnson', grade: '3rd', teacherId: 1, lapsCompleted: 5, totalLaps: 10 },
      { id: 2, firstName: 'Bob', lastName: 'Smith', grade: '3rd', teacherId: 1, lapsCompleted: 3, totalLaps: 10 },
      { id: 3, firstName: 'Carol', lastName: 'Davis', grade: '4th', teacherId: 2, lapsCompleted: 8, totalLaps: 10 },
    ];
    setStudents(mockStudents);
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
        loadTeachers();
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
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/classrooms" 
              element={
                <ClassroomsPage 
                  teachers={teachers} 
                  onAddTeacher={addTeacher}
                />
              } 
            />
            <Route 
              path="/classrooms/:teacherId/students" 
              element={
                <StudentsPage 
                  teachers={teachers}
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
                  teachers={teachers}
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
    </Router>
  );
}

export default App;