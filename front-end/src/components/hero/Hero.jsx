import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import img from "../../assets/teamWork.jpg";

const Hero = () => {
  return (
    <div id="hero" className=" m-auto flex items-center my-5 pt-4 w-[90%] gap-[30%]">
      <div className="w-[40%]">
        <h1 className="font-bold text-2xl">
          What makes a group more productive ?
        </h1>
        <p className="my-5">
          Learn fondamentals of group dynamics, leadership, handling conflit and
          more.
        </p>
        <button className="bg-[#435585] text-white font-bold px-10 rounded-md py-2 flex justify-center items-center gap-2 hover:bg-[#67729D] shadow-md">
          <FontAwesomeIcon icon={faPlay} />
          Get Started
        </button>
      </div>
      <div>
        <img className="w-[500px]" src={img} alt="" />
      </div>
    </div>
  );
};

export default Hero;
