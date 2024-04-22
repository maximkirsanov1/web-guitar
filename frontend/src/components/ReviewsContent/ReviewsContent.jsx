import { useEffect, useState } from "react";
import "./ReviewsContent.scss";
import { getAllReviews } from "../../../api/getAllReviews";
import { UserContext } from "../../App";
import { useContext } from "react";
import { LoaderContext } from "../../App";
import approveSvg from "../../assets/approve.svg";
import deleteSvg from "../../assets/delete.svg";
import { deleteReview } from "../../../api/deleteReview";
import { approveReview } from "../../../api/approveReview";

export default function ReviewsContent() {
  const [reviews, setReviews] = useState([]);
  const { closeLoader } = useContext(LoaderContext);
  const { user } = useContext(UserContext);
  const handleGetReviews = async () => {
    const reviews = await getAllReviews();
    if (reviews) {
      setReviews(reviews);
      closeLoader();
    }
  };
  const handleApproveReview = async (id) => {
    await approveReview(id);
    await handleGetReviews();
  };
  const handleDeleteReview = async (id) => {
    await deleteReview(id);
    await handleGetReviews();
  };

  useEffect(() => {
    if (user && user.role === "superadmin") {
      handleGetReviews();
    }
    if (user && user.role !== "superadmin") {
      alert("Access denied");
    }
  }, [user]);
  return (
    <>
      <div className="admin">
        <ul className="admin__reviews">
          {reviews.map((review, index) => (
            <li className="admin__review" key={index}>
              <div className="admin__review__name">{review.name}</div>
              <div className="admin__review__text">{review.value}</div>
              <div className="admin__review__buttons">
                <button
                  className="admin__review__button"
                  onClick={() => handleApproveReview(review._id)}
                >
                  <img src={approveSvg} alt="" />
                </button>
                <button
                  className="admin__review__button"
                  onClick={() => handleDeleteReview(review._id)}
                >
                  <img src={deleteSvg} alt="" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
