// Reusable KPI Card Component with enhanced styling for Phase 3 & 4 + Phase 5 & 6
const KPICard = ({ 
  title, 
  value, 
  icon, 
  colorScheme = 'blue',
  subText,
  footer,
  children,
  isLoading = false
}) => {
  // Define color schemes with gradients and accents
  const colorConfig = {
    blue: {
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
      border: 'border-blue-300',
      borderAccent: 'border-t-4 border-t-blue-500',
      icon: 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg',
      accent: 'text-blue-600'
    },
    red: {
      bg: 'bg-gradient-to-br from-red-50 to-red-100',
      border: 'border-red-300',
      borderAccent: 'border-t-4 border-t-red-500',
      icon: 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg',
      accent: 'text-red-600'
    },
    green: {
      bg: 'bg-gradient-to-br from-green-50 to-green-100',
      border: 'border-green-300',
      borderAccent: 'border-t-4 border-t-green-500',
      icon: 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg',
      accent: 'text-green-600'
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
      border: 'border-purple-300',
      borderAccent: 'border-t-4 border-t-purple-500',
      icon: 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg',
      accent: 'text-purple-600'
    },
    indigo: {
      bg: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
      border: 'border-indigo-300',
      borderAccent: 'border-t-4 border-t-indigo-500',
      icon: 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg',
      accent: 'text-indigo-600'
    },
    teal: {
      bg: 'bg-gradient-to-br from-teal-50 to-teal-100',
      border: 'border-teal-300',
      borderAccent: 'border-t-4 border-t-teal-500',
      icon: 'bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg',
      accent: 'text-teal-600'
    }
  };

  const colors = colorConfig[colorScheme] || colorConfig.blue;

  // Loading skeleton
  if (isLoading) {
    return (
      <div className={`${colors.bg} border ${colors.border} ${colors.borderAccent} rounded-lg p-5 md:p-6 shadow-sm`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
          <div className={`${colors.icon} w-10 h-10 rounded-lg flex-shrink-0 animate-pulse`}></div>
        </div>
        <div className="mb-4">
          <div className="h-8 bg-gray-200 rounded w-24 animate-pulse mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-40 animate-pulse"></div>
        </div>
        {children && <div className="h-20 bg-gray-200 rounded animate-pulse mb-3"></div>}
        <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className={`${colors.bg} border-2 ${colors.border} ${colors.borderAccent} rounded-xl p-5 md:p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 will-change-transform bg-white`}>
      {/* Header with icon */}
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm text-gray-700 font-semibold leading-tight truncate">
            {title}
          </p>
        </div>
        {icon && (
          <div className={`${colors.icon} w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center flex-shrink-0 ml-2 hover:scale-110 transition-transform`}>
            {icon}
          </div>
        )}
      </div>

      {/* Main Value - Enhanced styling with responsive font sizes */}
      <div className="mb-3 md:mb-4">
        <p className={`text-2xl sm:text-3xl md:text-2xl lg:text-3xl font-extrabold text-gray-800 ${colors.accent} break-words`}>
          {value}
        </p>
        {subText && (
          <p className="text-xs sm:text-sm text-gray-600 mt-1 md:mt-2 font-medium line-clamp-2">
            {subText}
          </p>
        )}
      </div>

      {/* Children (for charts, custom content) */}
      {children && (
        <div className="mb-2 md:mb-3 overflow-hidden">
          {children}
        </div>
      )}

      {/* Footer section with enhanced styling */}
      {footer && (
        <div className="text-xs text-gray-700 pt-2 md:pt-3 border-t-2 border-gray-200 font-medium">
          {footer}
        </div>
      )}
    </div>
  );
};

export default KPICard;
