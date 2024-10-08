import { BarLoader } from "react-spinners";

const Loading = ({ style }) => {
  return (
    <div className="loading-container" style={style}>
      <div className="loader"><BarLoader color="#F4CFB1" height={5} width={250} /></div>
    </div>
  );
};

export default Loading;
