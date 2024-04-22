import axios from "axios";
import { url } from "./constUrlApi";
export const addItem = async (
  e,
  title,
  cost,
  img,
  category,
  description,
  property
) => {
  e.preventDefault();
  if (
    title.current.value.trim() === "" ||
    cost.current.value.trim() === "" ||
    category.current.value.trim() === "" ||
    !img.current.files[0] ||
    description.current.value.trim() === "" ||
    property.current.value.trim() === ""
  ) {
    alert("Заполнены не все поля");
    return;
  }
  const formData = new FormData();
  formData.append("title", title.current.value);
  formData.append("cost", parseInt(cost.current.value));
  formData.append("image", img.current.files[0]);
  formData.append("category", category.current.value);
  formData.append("description", description.current.value);
  formData.append("property", property.current.value);

  try {
    await axios.post(`${url}/api/add`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    alert("Данные отправлены");
  } catch (error) {
    alert("ошибка!", error);
  }
};
