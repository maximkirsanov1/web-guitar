import Header from "../components/Header/Header";
import Modal from "../components/Modal/Modal";
import ReviewsContent from "../components/ReviewsContent/ReviewsContent";
export default function Reviews() {
  return (
    <>
      <div className="wrapper">
        <Header activeLink={""}></Header>
        <div className="container">
          <ReviewsContent></ReviewsContent>
        </div>
        <Modal></Modal>
      </div>
    </>
  );
}
