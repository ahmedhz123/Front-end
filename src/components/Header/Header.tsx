import FirstHeader from "./FisrtHeader.js";
import SecondHeader from "./SecondHeader.js";
import ThirdHeader from "./ThirdHeader.js";

const Header = () => {
  return (
    <div style={{paddingBottom: "15px"}}>
      <FirstHeader />
      <SecondHeader />
      <ThirdHeader />
    </div>
  );
};

export default Header;
