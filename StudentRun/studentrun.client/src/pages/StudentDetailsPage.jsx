import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Target, Trophy, Award, Edit, Plus, Minus, Calendar, TrendingUp } from 'lucide-react';

const StudentDetailsPage = ({ students, teachers, onUpdateLaps }) => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [showLapForm, setShowLapForm] = useState(false);
  const [lapInput, setLapInput] = useState('');

  const student = students.find(s => s.id === parseInt(studentId));
  const teacher = student ? teachers.find(t => t.id === student.teacherId) : null;

  const handleLapUpdate = (e) => {
    e.preventDefault();
    const newLaps = parseInt(lapInput);
    if (!isNaN(newLaps) && newLaps >= 0) {
      onUpdateLaps(student.id, newLaps);
      setLapInput('');
      setShowLapForm(false);
    }
  };

  const incrementLaps = () => {
    onUpdateLaps(student.id, student.lapsCompleted + 1);
  };

  const decrementLaps = () => {
    if (student.lapsCompleted > 0) {
      onUpdateLaps(student.id, student.lapsCompleted - 1);
    }
  };

  const getProgressPercentage = () => {
    return Math.round((student.lapsCompleted / student.totalLaps) * 100);
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600 bg-green-100';
    if (percentage >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getAchievements = () => {
    const achievements = [];
    if (student.lapsCompleted >= 1) {
      achievements.push({ name: 'First Lap', description: 'Completed your first lap!', icon: '🏃‍♂️' });
    }
    if (student.lapsCompleted >= 5) {
      achievements.push({ name: 'Halfway There', description: 'Completed 5 laps!', icon: '🎯' });
    }
    if (student.lapsCompleted >= 10) {
      achievements.push({ name: 'Marathon Runner', description: 'Completed all 10 laps!', icon: '🏆' });
    }
    return achievements;
  };

  if (!student) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Student Not Found</h2>
        <Link to="/classrooms" className="text-indigo-600 hover:text-indigo-700">
          ← Back to Classrooms
        </Link>
      </div>
    );
  }

  const progressPercentage = getProgressPercentage();
  const progressColor = getProgressColor(progressPercentage);
  const achievements = getAchievements();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(`/classrooms/${student.teacherId}/student`)}
          className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            {student.firstName} {student.lastName}
          </h1>
          <p className="text-gray-600 mt-2">
            {student.grade} Grade • {teacher?.firstName} {teacher?.lastName}'s Classroom
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progress Overview */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Progress Overview</h2>
              <div className="flex space-x-2">
                <button
                  onClick={decrementLaps}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <button
                  onClick={incrementLaps}
                  className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                >
                  <Plus className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setShowLapForm(!showLapForm)}
                  className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  <Edit className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Lap Progress</span>
                <span className="text-sm font-semibold text-gray-900">
                  {student.lapsCompleted}/{student.totalLaps} laps
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    progressPercentage >= 80 ? 'bg-green-500' :
                    progressPercentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className={`text-sm font-medium mt-2 ${progressColor}`}>
                {progressPercentage}% Complete
              </p>
            </div>

            {/* Lap Update Form */}
            {showLapForm && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Update Lap Count</h3>
                <form onSubmit={handleLapUpdate} className="flex space-x-3">
                  <input
                    type="number"
                    value={lapInput}
                    onChange={(e) => setLapInput(e.target.value)}
                    placeholder="Enter new lap count"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    min="0"
                    max="100"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLapForm(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">{student.lapsCompleted}</p>
                <p className="text-sm text-gray-600">Laps Completed</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Trophy className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">{student.totalLaps - student.lapsCompleted}</p>
                <p className="text-sm text-gray-600">Laps Remaining</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-600">{progressPercentage}%</p>
                <p className="text-sm text-gray-600">Progress</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-orange-600">{achievements.length}</p>
                <p className="text-sm text-gray-600">Achievements</p>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h2>
            {achievements.length === 0 ? (
              <div className="text-center py-8">
                <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No achievements yet. Keep running to unlock rewards!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div>
                      <h3 className="font-semibold text-green-800">{achievement.name}</h3>
                      <p className="text-sm text-green-600">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Student Info */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <User className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Student Info</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold text-gray-900">{student.firstName} {student.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Grade</p>
                <p className="font-semibold text-gray-900">{student.grade}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Teacher</p>
                <p className="font-semibold text-gray-900">{teacher?.firstName} {teacher?.lastName}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={incrementLaps}
                className="w-full flex items-center space-x-2 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>Add Lap</span>
              </button>
              <button
                onClick={() => setShowLapForm(true)}
                className="w-full flex items-center space-x-2 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Edit className="h-5 w-5" />
                <span>Edit Laps</span>
              </button>
              <Link
                to="/progress"
                className="w-full flex items-center space-x-2 p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <Trophy className="h-5 w-5" />
                <span>View Progress</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsPage;
