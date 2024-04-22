import Header from "../components/Header/Header";
import Modal from "../components/Modal/Modal";
import ItemContent from "../components/ItemContent/ItemContent";
export default function Item() {
  return (
    <>
      <div className="wrapper">
        <Header activeLink={""}></Header>
        <div className="container">
          <ItemContent></ItemContent>
        </div>
        <Modal></Modal>
      </div>
    </>
  );
}
