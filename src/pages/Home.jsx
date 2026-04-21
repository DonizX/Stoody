import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import CourseCard from "../components/CourseCard.jsx";

function Home({
  xp,
  xpMax,
  coins,
  level,
  addXP,
  addCoins,
  levelPulse,
  coinAnim,
  search,
  setSearch
}) {

  const courses = [
    { title: "Learn English with Pokémon", xp: 50, coins: 10 },
    { title: "Japanese for Anime", xp: 70, coins: 20 },
    { title: "Spanish Basics", xp: 40, coins: 5 }
  ];

  // 🔥 PROTEÇÃO TOTAL CONTRA undefined
  const query = (search ?? "").toLowerCase();

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(query)
  );

  return (
    <div className="flex bg-gray-50 min-h-screen">

      <Sidebar />

      <div className="flex-1 ml-64">

        <Navbar
          level={level}
          xp={xp}
          xpMax={xpMax}
          coins={coins}
          levelPulse={levelPulse}
          coinAnim={coinAnim}
          search={search}
          setSearch={setSearch}
        />

        <div className="p-8 space-y-6">

          <h2 className="text-2xl font-bold mb-6">
            Recommended for You
          </h2>

          <div className="flex gap-4 mb-6">

            <button
              onClick={() => addXP(Math.floor(Math.random() * 50) + 50)}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              + XP Test
            </button>

            <button
              onClick={() => addCoins(Math.floor(Math.random() * 50) + 50)}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              + Coins Test
            </button>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, i) => (
                <div key={i} onClick={() => addXP(course.xp)}>
                  <CourseCard
                    title={course.title}
                    xp={`+${course.xp} XP`}
                    coins={`+${course.coins} Coins`}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                Nenhum curso encontrado
              </p>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;