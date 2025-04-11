"use client";
import React, { useEffect, useState } from "react";
import {
  getNotificationsDispatch,
  setNewNotificationToReturnWebsocket,
} from "@/store/adminSlice";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { BiCart, BiComment, BiHeart } from "react-icons/bi";
import { format } from "date-fns/format";
import { tr } from "date-fns/locale";
import { AiFillHeart } from "react-icons/ai";

function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const { notifications, notificationPage } = useSelector(
    (state: RootState) => state.admin,
  );
  const [pageable, setPageable] = useState({ currentPage: 0, size: 20 });
  useEffect(() => {
    dispatch(getNotificationsDispatch(pageable.currentPage, pageable.size));
    const socket = new SockJS(process.env.NEXT_PUBLIC_SOCKET_URI);
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, function () {
      // 🔔 Yeni siparişleri dinle
      stompClient.subscribe("/topic/visitors", function (res) {
        const newNotification = JSON.parse(res.body);
        dispatch(setNewNotificationToReturnWebsocket(newNotification));
      });
    });

    return () => {
      stompClient.disconnect();
    };
  }, [pageable.currentPage, pageable.size, dispatch]);

  return (
    <div className={"border overflow-y-auto h-[85vh]"}>
      <ul className={"flex flex-col gap-y-2"}>
        {notifications?.map((notification, index) => (
          <li className={"border-b p-2 text-xs font-bold"} key={index}>
            <span className={"flex flex-row items-center justify-between"}>
              <span className={"flex flex-row gap-x-4"}>
                {(notification?.type === "ADD_TO_CART" && (
                  <BiCart size={24} />
                )) ||
                  (notification?.type === "COMMENT" && (
                    <BiComment size={24} />
                  )) ||
                  (notification?.type === "FAV" && <BiHeart size={24} />)}
                <span className={"flex flex-col gap-y-1"}>
                  <h3>{notification?.head}</h3>
                  <p className={"text-gray-500"}>{notification?.content}</p>
                </span>
              </span>
              <span>
                {format(notification?.createdAt, "dd.MM.yyyy | HH:mm:ss", {
                  locale: tr,
                })}
              </span>
            </span>
          </li>
        ))}
      </ul>
      <span
        className={`${notificationPage.totalElements === notifications.length ? "hidden" : "flex"} justify-center w-full py-3`}
      >
        <button
          onClick={() => setPageable({ ...pageable, size: pageable.size + 10 })}
          className={"text-blue-600"}
        >
          More...
        </button>
      </span>
    </div>
  );
}

export default Page;
