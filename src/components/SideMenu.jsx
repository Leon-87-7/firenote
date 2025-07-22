import AddBtn from './AddBtn';
import Logo from './Logo';
import '../styles/components/SideMenu.css';

const SideMenu = () => {
  //TODO here needs to be state lifting
  return (
    <div className="container">
      <Logo />
      <AddBtn />
    </div>
  );
};

export default SideMenu;
