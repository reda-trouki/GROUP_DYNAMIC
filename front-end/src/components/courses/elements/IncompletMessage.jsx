import openBox from "../../../assets/open-box.png"; // Adjust the path to your actual image

const IncompleteMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold text-blue-500 mb-4">
        Incomplete Concepts
      </h2>
      <p className="text-lg mb-6">You haven't completed any concept yet.</p>
      <p className="text-base">Start exploring and complete your course!</p>
      <img
        src={openBox}
        alt="Empty"
        className="mt-8 max-w-full h-auto"
        style={{ maxHeight: "200px" }} // Set a max height if needed
      />
    </div>
  );
};

export default IncompleteMessage;
