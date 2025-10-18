const ProgressBar = ({ 
  value, 
  max = 100, 
  color = 'indigo', 
  size = 'medium', 
  showPercentage = true, 
  className = '' 
}) => {
  const percentage = Math.round((value / max) * 100);
  
  const sizeClasses = {
    small: 'h-1',
    medium: 'h-2',
    large: 'h-3',
  };

  const colorClasses = {
    indigo: 'bg-indigo-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
    blue: 'bg-blue-500',
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]}`}>
        <div
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      {showPercentage && (
        <div className="flex justify-between items-center mt-1">
          <span className="text-sm text-gray-600">{value}/{max}</span>
          <span className="text-sm font-semibold text-gray-900">{percentage}%</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
