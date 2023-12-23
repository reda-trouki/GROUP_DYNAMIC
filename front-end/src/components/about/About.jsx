import DecisionMakingImage from "../../assets/decisionMaking.jpeg";
import CommunicationImage from "../../assets/communication.jpeg";
import leadershipImage from '../../assets/leadership.jpeg';
import conflictManagementImage from '../../assets/conflictManagement.jpeg'
const Sections = () => {
  
  return (
    <div
      id="course"
      className="w-90 m-auto flex flex-col items-center justify-center"
    >
      <div className="flex justify-center">
        <div className="text-center md:max-w-xl lg:max-w-3xl">
          <h2 className="mb-8 px-4 text-2xl font-serif">About The Course</h2>
        </div>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
      >
        <CourseCard
          image={DecisionMakingImage}
          title="Decision Making"
          description="Explore effective group decision-making with models and strategies to enhance informed and collaborative choices."
        />
        <CourseCard
          image={CommunicationImage}
          title="Communication"
          description="Explore fundamental group communication, learn effective skills, active listening, and strategies for open and transparent communication."
        />
        <CourseCard
          image={conflictManagementImage}
          title="Conflict Management"
          description="Addresses conflict identification, resolution, and teaches strategies, negotiation skills, turning conflicts into growth opportunities in group settings"
        />
        <CourseCard
          image={leadershipImage}
          title="Leadership"
          description="Focuses on developing group leadership skills, exploring styles, communication strategies, and methods for motivating and guiding a team towards common goals."
        />
        
      </div>
    </div>
  );
};

const CourseCard = ({ image, title, description }) => {
  return (
    <div className=" max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="w-full">
        <img
          className="w-full h-40 object-cover rounded-t-lg"
          src={image}
          alt=""
        />
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Sections;
