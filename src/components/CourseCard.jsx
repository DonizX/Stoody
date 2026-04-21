function CourseCard({ title, xp, coins }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
      <h3 className="text-lg font-bold mb-2">{title}</h3>

      <div className="flex justify-between text-sm text-gray-600">
        <span>{xp}</span>
        <span>{coins}</span>
      </div>

      <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded">
        Start
      </button>
    </div>
  );
}

export default CourseCard;