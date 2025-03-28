import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { ConfirmDialog } from "primereact/confirmdialog";

function Comments() {
  const t = useTranslations();

  const { comments } = useSelector((state: RootState) => state.products);
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

  const handleDelete = (id) => {
    console.log("Yorum Silindi !!", id);
    setPopUpModal(false);
  };

  const handleOpenPopUpModal = () => {
    setPopUpModal(true);
  };

  return (
    <div className=" w-full mx-auto md:p-4">
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex flex-col bg-white rounded-lg shadow-md gap-4 px-4 py-1.5"
          >
            <div className="flex flex-row justify-between items-start gap-3">
              <div className="flex flex-col items-start justify-start gap-3 w-full">
                {comment.productImages && (
                  <div className="flex justify-start items-center gap-2 ">
                    {Array.isArray(comment.productImages) &&
                      comment.productImages.map((image, index) => (
                        <div key={index}>
                          <Image
                            src={image}
                            alt={`Ürün Resmi ${index + 1}`}
                            width={50}
                            height={50}
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

                <div className="flex flex-col w-full">
                  <div className="font-semibold text-gray-800">
                    {comment.author}
                  </div>
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
                    {new Date(comment.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>

              <div>
                <button
                  id={`delete-btn-${comment.id}`}
                  className="bg-red-500 border-none text-white p-2 rounded-md hover:opacity-85 transition-all"
                  onClick={() => handleOpenPopUpModal(comment.id)}
                >
                  <IoMdClose />
                </button>

                {/* Pop-Up Modal */}
                {popUpModal && (
                  <ConfirmDialog
                    visible={popUpModal}
                    onHide={() => setPopUpModal(false)}
                    message="Are you sure you want to delete this comment?"
                    accept={handleDelete.bind(null, comment.id)}
                    reject={() => setPopUpModal(false)}
                    header="Confirm Delete"
                  />
                )}
              </div>
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
        slides={comments
          .flatMap((comment) => comment.productImages)
          .map((img) => ({
            src: img,
          }))}
        on={{ view: updateIndex }}
        animation={{ fade: 0 }}
        controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
      />
    </div>
  );
}

export default Comments;
