import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Users, GraduationCap, ArrowRight, Edit, Trash2 } from 'lucide-react';

const ClassroomsPage = ({ teachers, onAddTeacher }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    grade: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.grade) {
      onAddTeacher(formData);
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Classrooms</h1>
          <p className="text-gray-600 mt-2">Manage teachers and their classrooms</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
        >
          <Plus className="h-5 w-5" />
          <span>Add Teacher</span>
        </button>
      </div>

      {/* Add Teacher Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Add New Teacher</h3>
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
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Select Grade</option>
                  <option value="Kindergarten">Kindergarten</option>
                  <option value="1st">1st Grade</option>
                  <option value="2nd">2nd Grade</option>
                  <option value="3rd">3rd Grade</option>
                  <option value="4th">4th Grade</option>
                  <option value="5th">5th Grade</option>
                  <option value="6th">6th Grade</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
              >
                Add Teacher
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

      {/* Teachers Grid */}
      {teachers.length === 0 ? (
        <div className="text-center py-12">
          <GraduationCap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Teachers Yet</h3>
          <p className="text-gray-600 mb-6">Add your first teacher to get started with classroom management.</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
          >
            <Plus className="h-5 w-5" />
            <span>Add Your First Teacher</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-indigo-100 rounded-lg">
                    <GraduationCap className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {teacher.firstName} {teacher.lastName}
                    </h3>
                    <p className="text-gray-600">{teacher.grade} Grade</p>
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

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>Students: 0</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <GraduationCap className="h-4 w-4" />
                  <span>Classroom: {teacher.grade}</span>
                </div>
              </div>

              <Link
                to={`/classrooms/${teacher.id}/students`}
                className="mt-4 inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-semibold group"
              >
                <span>View Students</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassroomsPage;
