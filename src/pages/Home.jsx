import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { useSidebar } from "../context/SidebarContext";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import CourseCard from "../components/CourseCard.jsx";

function Home() {
  const navigate = useNavigate();
  const { search } = useGame();
  const { isCollapsed } = useSidebar();

  // Desktop margin, mobile no margin (bottom nav will be there)
  const marginClass = isCollapsed ? "md:ml-20" : "md:ml-64";

  const courses = [
    { 
      id: "japanese-anime",
      title: "Learn Japanese with Anime", 
      xp: 150, 
      coins: 50,
      description: "Master essential Japanese expressions from your favorite anime series!"
    },
    { 
      id: "english-pokemon",
      title: "English with Pokémon", 
      xp: 120, 
      coins: 40,
      description: "Learn English vocabulary through Pokémon battles and conversations."
    },
    { 
      id: "spanish-basics",
      title: "Spanish Basics", 
      xp: 100, 
      coins: 30,
      description: "Get started with essential Spanish phrases and grammar."
    }
  ];

  const query = (search ?? "").toLowerCase();
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(query)
  );

  const handleStartCourse = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
      <Sidebar />

      <div className={`flex-1 ${marginClass} transition-all duration-300 flex flex-col`}>
        <Navbar />

        {/* Main Content - Adjusted for mobile bottom nav */}
        <div className="flex-1 px-4 sm:px-8 py-6 sm:py-8 space-y-6 pb-20 md:pb-6 overflow-y-auto">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Recommended Courses
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Choose a course and start learning today!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  description={course.description}
                  xp={course.xp}
                  coins={course.coins}
                  onStart={() => handleStartCourse(course.id)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">
                  No courses found matching your search.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;