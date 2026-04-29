function CourseCard({ title, description, xp, coins, onStart }) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
      <div className="mb-4">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-between mb-4 p-2 sm:p-3 bg-gray-50 rounded-xl text-xs sm:text-sm">
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-base sm:text-lg">✨</span>
          <span className="font-semibold text-gray-900">{xp} XP</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-base sm:text-lg">💰</span>
          <span className="font-semibold text-gray-900">{coins} Coins</span>
        </div>
      </div>

      <button
        onClick={onStart}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2 sm:py-3 rounded-xl text-sm sm:text-base hover:shadow-lg active:scale-95 transition-all"
      >
        Start
      </button>
    </div>
  );
}

export default CourseCard;