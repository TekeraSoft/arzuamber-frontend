import React, { useState } from "react";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";

import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { useTranslations } from "next-intl";

function Comments() {
  const t = useTranslations();

  // Yorumlar ve her bir yorumun oluşturulma tarihi
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Ali",
      text: "Bu ürün çok güzel!",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      createdAt: new Date("2025-03-20T14:30:00"),
    },
    {
      id: 2,
      author: "Ayşe",
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus, neque? Atque quaerat voluptatibus tempore id iure quibusdam ducimus dolores placeat quo corrupti. Officiis commodi quis suscipit expedita impedit, quidem rem sit tempore facere asperiores explicabo hic porro unde cumque ullam quod nulla, doloribus alias eius. Quidem vero, temporibus et mollitia quasi consequatur magnam eveniet distinctio nemo sed voluptates maiores in enim, cumque velit, commodi laudantium. Vero accusantium, voluptate debitis obcaecati impedit nihil alias consectetur ut sed hic exercitationem explicabo illum delectus modi necessitatibus earum. Odio dolore eligendi voluptates veritatis laboriosam sit corporis cum atque quae, culpa obcaecati nemo iure accusantium. Consequuntur repudiandae corporis explicabo incidunt cumque vel rerum nisi. Vitae, error alias vel, voluptate ducimus tempore distinctio, obcaecati porro beatae aspernatur eaque delectus facilis eum labore reiciendis inventore dicta. Nesciunt obcaecati similique excepturi, iste libero quisquam aspernatur accusamus deserunt quo sed facilis itaque fugit explicabo illo tempore distinctio et est eius voluptatibus fuga in quidem! Maiores adipisci, corrupti aperiam assumenda exercitationem in rem ipsa velit, sequi eligendi dolorem, perspiciatis optio dolorum? Qui dolorem voluptatum ex repellendus iure asperiores nulla, quos rerum eos. Dolore, adipisci quo eos facilis mollitia quod molestiae sequi quia corporis excepturi doloribus cumque eveniet architecto veniam ratione nobis itaque. Mollitia cum voluptas minima odit dolorum, magnam voluptatibus quaerat, earum fugiat veritatis incidunt accusantium provident debitis iusto rem voluptatum deleniti! Nobis culpa maiores cupiditate ullam suscipit, libero soluta officiis a accusantium nostrum vitae dicta odio possimus eaque repellendus. Inventore totam a, quo debitis, perspiciatis animi hic illum vel soluta nobis adipisci facere est labore dolorum quibusdam suscipit corporis, praesentium obcaecati commodi beatae? Voluptatum voluptates quaerat illo pariatur libero alias, reprehenderit id excepturi voluptas odit harum officia? Odio expedita, doloribus ipsum officiis, sint delectus fugiat minima nemo dolor vel repudiandae beatae aliquam placeat est quos recusandae veniam eveniet quisquam.",
      createdAt: new Date("2025-03-21T09:10:00"),
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
    },
    {
      id: 3,
      author: "Mehmet",
      text: "Beklediğim gibi, harika!",
      createdAt: new Date("2025-03-22T11:15:00"),
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
    },
  ]);
  const [lineClamp, setLineClamp] = useState(true);

  const toggleClamp = () => {
    setLineClamp(!lineClamp);
  };

  // Yorum silme işlemi
  const handleDelete = (id) => {
    confirmPopup({
      target: document.getElementById(`delete-btn-${id}`),
      message: "Yorumu silmek istediğinizden emin misiniz?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        setComments(comments.filter((comment) => comment.id !== id));
        console.log(`Yorum ${id} silindi.`);
      },
      reject: () => {
        console.log("Yorum silme işlemi iptal edildi.");
      },
    });
  };

  return (
    <div className="w-full  mx-auto p-4">
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex  justify-between items-center bg-white p-4 rounded-lg shadow-md gap-4"
          >
            {/* Avatar ve Yorum Bilgileri */}
            <div className="flex justify-start items-start gap-3 w-full ">
              <Avatar image={comment.image} size="large" className="min-w-12" />
              <div className="flex flex-col">
                <div className="font-semibold text-gray-800">
                  {comment.author}
                </div>
                {/* Yorum metnini sınırlandırma */}
                <p
                  className={`text-secondary text-base ${
                    lineClamp ? "line-clamp-3" : "line-clamp-none"
                  }`}
                >
                  {comment.text}
                </p>
                {comment.text.length > 250 && (
                  <button
                    onClick={toggleClamp}
                    className="text-secondary font-semibold text-end mt-1 hover:underline"
                  >
                    {lineClamp
                      ? t("productDetail.readMore")
                      : t("productDetail.readLess")}
                  </button>
                )}
                <div className="text-xs text-gray-400 mt-1">
                  {comment.createdAt.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Silme Butonu */}
            <div>
              <Button
                id={`delete-btn-${comment.id}`}
                label="Sil"
                icon="pi pi-trash"
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-all"
                onClick={() => handleDelete(comment.id)}
              />
              <ConfirmPopup />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;
