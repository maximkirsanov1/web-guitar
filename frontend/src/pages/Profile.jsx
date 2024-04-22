import Header from "../components/Header/Header";
import ProfileContent from "../components/Profile/ProfileContent";
import Modal from "../components/Modal/Modal";
export default function Profile() {
  return (
    <>
      <div className="wrapper">
        <Header activeLink={""}></Header>
        <div className="container">
          <ProfileContent></ProfileContent>
        </div>
        <Modal></Modal>
      </div>
    </>
  );
}
