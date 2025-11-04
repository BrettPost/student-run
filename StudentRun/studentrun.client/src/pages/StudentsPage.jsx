import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Plus, User, ArrowLeft, Edit, Trash2, Target, Trophy } from 'lucide-react';

const StudentsPage = ({ teachers, students, onAddStudent }) => {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    grade: '',
  });

  const teacher = teachers.find(t => t.id === parseInt(teacherId));
  const teacherStudents = students.filter(s => s.teacherId === parseInt(teacherId));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.grade) {
      onAddStudent({
        ...formData,
        teacherId: parseInt(teacherId),
      });
      setFormData({ firstName: '', lastName: '', grade: '' });
      setShowAddForm(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getProgressPercentage = (lapsCompleted, totalLaps) => {
    return Math.round((lapsCompleted / totalLaps) * 100);
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600 bg-green-100';
    if (percentage >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  if (!teacher) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Teacher Not Found</h2>
        <Link to="/classrooms" className="text-indigo-600 hover:text-indigo-700">
          ← Back to Classrooms
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/classrooms')}
            className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              {teacher.firstName} {teacher.lastName}'s Students
            </h1>
            <p className="text-gray-600 mt-2">{teacher.grade} Grade Classroom</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
        >
          <Plus className="h-5 w-5" />
          <span>Add Student</span>
        </button>
      </div>

      {/* Add Student Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Add New Student</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter last name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grade
                </label>
                <input
                  type="text"
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter grade"
                  required
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
              >
                Add Student
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Students Grid */}
      {teacherStudents.length === 0 ? (
        <div className="text-center py-12">
          <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Students Yet</h3>
          <p className="text-gray-600 mb-6">Add students to {teacher.firstName}'s classroom to start tracking their progress.</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
          >
            <Plus className="h-5 w-5" />
            <span>Add Your First Student</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teacherStudents.map((student) => {
            const progressPercentage = getProgressPercentage(student.lapsCompleted, student.totalLaps);
            const progressColor = getProgressColor(progressPercentage);
            
            return (
              <div
                key={student.id}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-indigo-100 rounded-lg">
                      <User className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {student.firstName} {student.lastName}
                      </h3>
                      <p className="text-gray-600">{student.grade} Grade</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {student.lapsCompleted}/{student.totalLaps} laps
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          progressPercentage >= 80 ? 'bg-green-500' :
                          progressPercentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Target className="h-4 w-4 text-indigo-600" />
                        <span className="text-sm font-medium text-gray-700">Laps</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">{student.lapsCompleted}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Trophy className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                      </div>
                      <p className={`text-lg font-bold ${progressColor.split(' ')[0]}`}>
                        {progressPercentage}%
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  to={`/students/${student.id}`}
                  className="mt-4 inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-semibold group"
                >
                  <span>View Details</span>
                  <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentsPage;
