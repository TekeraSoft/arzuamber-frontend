import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { IoMdClose } from "react-icons/io";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useSession } from "next-auth/react";
import { Rating } from "primereact/rating";
import { FaCommentSlash } from "react-icons/fa";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { FaUserShield, FaUser } from "react-icons/fa";
import { deleteCommentDispatch } from "@/store/productSlice";

function Comments({ productComments }) {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [lineClamp, setLineClamp] = useState(true);
  const [popUpModal, setPopUpModal] = useState(false);

  const toggleClamp = () => {
    setLineClamp(!lineClamp);
  };

  const updateIndex = ({ index: current }: { index: number }) => {
    setPhotoIndex(current);
  };

  const toggleOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDelete = (id, rateId) => {
    dispatch(deleteCommentDispatch(id, rateId));
    setPopUpModal(false);
  };

  const handleOpenPopUpModal = () => {
    setPopUpModal(true);
  };

  if (!productComments || productComments.length === 0) {
    return (
      <div className="flex  items-center justify-center gap-2   ">
        <FaCommentSlash className="text-xl md:text-3xl" />

        <p className="text-sm md:text-xl font-medium text-gray-600">
          Henüz yorum yapılmamış.
        </p>
      </div>
    );
  }

  return (
    <div className=" w-full mx-auto md:p-4">
      <div className="space-y-4">
        {productComments.flatMap((comment, commentIndex) => (
          <div
            key={commentIndex}
            className="flex flex-col bg-white rounded-lg  gap-4 px-4 py-1.5 border"
          >
            <div className="flex flex-row justify-between items-start gap-3">
              <div className="flex flex-col items-start justify-start gap-3 w-full">
                <div className="flex justify-between items-center gap-3 w-full">
                  {comment.images?.length > 0 && (
                    <div className="flex justify-start items-center gap-2 ">
                      {Array.isArray(comment.images) &&
                        comment.images.map((image, index) => (
                          <div key={index}>
                            <Image
                              src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${image}`}
                              alt={`Ürün Resmi ${index + 1}`}
                              width={60}
                              height={60}
                              className="rounded-md shadow-sm cursor-pointer border hover:border-black transition duration-500"
                              onClick={() => {
                                setPhotoIndex(index);
                                setIsModalOpen(true);
                              }}
                            />
                          </div>
                        ))}
                    </div>
                  )}
                </div>
                {comment.content.map((content, index) => (
                  <div
                    key={index}
                    className={`flex flex-col w-full gap-1 ${index !== 0 ? "ml-6 border-spacing-1 pl-2 border-l-4 rounded-lg border-secondary" : ""}`}
                  >
                    <div className="flex justify-start items-center gap-4">
                      <div className=" flex justify-center items-center gap-2 ">
                        {index !== 0 ? (
                          <FaUserShield size={20} className="text-secondary" />
                        ) : (
                          <FaUser size={18} />
                        )}
                        <span className={"flex flex-row items-center gap-x-4"}>
                          <p className="  font-semibold text-gray-800">
                            {content.userName}
                          </p>
                          {index === 0 && (
                            <Rating
                              value={comment?.rate?.rate}
                              readOnly
                              cancel={false}
                              stars={5}
                            />
                          )}
                        </span>
                      </div>
                    </div>
                    <p
                      className={`text-gray-500 text-xs  md:text-base ${
                        lineClamp ? "line-clamp-3" : "line-clamp-none"
                      }`}
                    >
                      {content.message}
                    </p>
                    <div className="flex  justify-between items-center mt-1">
                      <p className="text-xs text-gray-400 ">
                        {new Date(content.createdAt).toLocaleString()}
                      </p>
                      {content.message?.length > 250 && (
                        <button
                          onClick={toggleClamp}
                          className="text-secondary font-semibold text-end  text-sm md:text-base hover:underline"
                        >
                          {lineClamp
                            ? t("productDetail.readMore")
                            : t("productDetail.readLess")}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {session?.user?.id === comment?.rate?.userId && (
                <div>
                  <button
                    id={`delete-btn-${comment.id}`}
                    className="bg-red-500 border-none text-white p-2 rounded-md hover:opacity-85 transition-all"
                    onClick={() => handleOpenPopUpModal()}
                  >
                    <IoMdClose />
                  </button>

                  {/* Pop-Up Modal */}
                  {popUpModal && (
                    <ConfirmDialog
                      visible={popUpModal}
                      onHide={() => setPopUpModal(false)}
                      message="Bu yorumu silmek istediğinizden emin misiniz ?"
                      accept={handleDelete.bind(
                        null,
                        comment.id,
                        comment.rate.id,
                      )}
                      reject={() => setPopUpModal(false)}
                      header="Yorumu Sil"
                      acceptLabel="Evet"
                      rejectLabel="Hayır"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        open={isModalOpen}
        plugins={[Zoom]}
        close={toggleOpen}
        index={photoIndex}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
        }}
        slides={productComments
          .flatMap((comment) => comment.images)
          .map((img) => ({
            src: `${process.env.NEXT_PUBLIC_RESOURCE_API}${img}`,
          }))}
        on={{ view: updateIndex }}
        animation={{ fade: 0 }}
        controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
      />
    </div>
  );
}

export default Comments;
