import spinner from "../assets/images/loading.gif";

const LoadingSpinner = () => {
  return (
    <img
      src={spinner.src}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 drop-shadow-lg w-auto h-1/4"
    ></img>
  );
};

export default LoadingSpinner;
