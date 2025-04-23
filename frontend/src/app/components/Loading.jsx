import { BeatLoader } from "react-spinners";
function Loading({ loading }) {
  return (
    <div className="loadingContainer">
      <BeatLoader loading={loading} size={20} />
    </div>
  );
}

export default Loading;
