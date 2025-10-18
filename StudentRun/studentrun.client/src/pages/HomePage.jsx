import { Link } from 'react-router-dom';
import { Users, Trophy, BookOpen, Target, Award, TrendingUp } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: Users,
      title: 'Classroom Management',
      description: 'Manage teachers and students, track progress, and organize your running program.',
      link: '/classrooms',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Trophy,
      title: 'Progress Tracking',
      description: 'Visual roadmap of achievements and lap completion with customizable rewards.',
      link: '/progress',
      color: 'from-green-500 to-green-600',
    },
  ];

  const stats = [
    { icon: BookOpen, label: 'Active Classrooms', value: '12', color: 'text-blue-600' },
    { icon: Target, label: 'Total Students', value: '156', color: 'text-green-600' },
    { icon: Award, label: 'Laps Completed', value: '1,247', color: 'text-purple-600' },
    { icon: TrendingUp, label: 'Achievements', value: '89', color: 'text-orange-600' },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-gray-900">
          Welcome to <span className="text-indigo-600">StudentRun</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Track student progress, manage classrooms, and celebrate achievements in your running program. 
          Make fitness fun and engaging for every student!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Link
              key={index}
              to={feature.link}
              className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.color} text-white`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {feature.description}
                </p>
                <div className="flex items-center text-indigo-600 font-semibold group-hover:text-indigo-700">
                  Get Started
                  <svg className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl mb-6 opacity-90">
          Create your first classroom or check out the progress tracking system.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/classrooms"
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Manage Classrooms
          </Link>
          <Link
            to="/progress"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
          >
            View Progress
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
