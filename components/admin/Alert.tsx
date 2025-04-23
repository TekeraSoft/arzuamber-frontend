"use client";
import React, { useEffect, useRef, useState } from "react";
import { AiFillBell } from "react-icons/ai";
import { BiMessage } from "react-icons/bi";
import {
  deactivateNotificationsDispatch,
  getNotificationsDispatch,
  setNewNotificationToReturnWebsocket,
} from "@/store/adminSlice";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { format } from "date-fns/format";
import { tr } from "date-fns/locale";

function Alert() {
  const [openAlertBox, setOpenAlertBox] = React.useState(false);
  const { notifications } = useSelector((state: RootState) => state.admin);
  const dispatch = useDispatch<AppDispatch>();
  const [pageable, setPageable] = React.useState<boolean>({
    currentPage: 0,
    size: 20,
  });

  const [userInteracted, setUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleUserInteraction = () => {
      setUserInteracted(true);
      // Audio DOM element'i oluşturulursa ilk etkileşimde çalışır
      if (!audioRef.current) {
        audioRef.current = new Audio("/audio/message-song.wav");
        audioRef.current.load();
      }
      window.removeEventListener("click", handleUserInteraction);
    };

    window.addEventListener("click", handleUserInteraction);
    return () => {
      window.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    if (!userInteracted) return;
    dispatch(getNotificationsDispatch(pageable.currentPage, pageable.size));
    const socket = new SockJS(process.env.NEXT_PUBLIC_SOCKET_URI);
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, function () {
      // 🔔 Yeni siparişleri dinle
      stompClient.subscribe("/topic/notification", function (res) {
        const newNotification = JSON.parse(res.body);
        if (audioRef.current) {
          audioRef.current
            .play()
            .catch((err) => console.warn("Ses çalınamadı:", err));
        }
        dispatch(setNewNotificationToReturnWebsocket(newNotification));
      });
    });

    return () => {
      stompClient.disconnect();
    };
  }, [pageable.currentPage, pageable.size, dispatch, userInteracted]);

  const playAudio = () => {
    const audio = new Audio("/audio/message-song.wav");
    audio.play();
  };

  return (
    <span className={`flex relative justify-center`}>
      <span className={`flex relative justify-center items-center`}>
        <AiFillBell
          className={"text-gray-500 cursor-pointer text-2xl "}
          onClick={() => {
            setOpenAlertBox(!openAlertBox);
            dispatch(deactivateNotificationsDispatch());
          }}
        />
        <span
          className={
            "w-3 h-3 md:w-4 md:h-4 right-0 top-0 bg-red-600 text-white text-[11px] md:text-xs flex items-center justify-center rounded-full absolute"
          }
        >
          {notifications?.filter((n) => n.isActive).length}
        </span>
      </span>
      <ul
        className={`${
          openAlertBox ? "flex" : "hidden"
        } shadow flex flex-col overflow-y-auto absolute bg-white text-xs w-72 h-64 mt-12 border`}
      >
        {notifications?.map((item, index) => (
          <li
            key={index}
            className={
              "flex flex-col gap-y-2 border-b bg-opacity-40 text-gray-500 w-full h-fit border-gray-300 p-2"
            }
          >
            <span className={"flex flex-row items-center gap-x-4"}>
              <BiMessage size={32} /> <p>{item?.head}</p>
            </span>
            <p className={"text-end"}>
              {format(item?.createdAt, "dd.MM.yyyy | HH:mm:ss", { locale: tr })}
            </p>
          </li>
        ))}
      </ul>
    </span>
  );
}

export default Alert;
