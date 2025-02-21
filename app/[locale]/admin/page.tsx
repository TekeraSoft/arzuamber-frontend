'use client'
import React from "react";
import {useSession} from "next-auth/react";

function AdminPage() {
  const {data:session} = useSession()
  console.log(session)
  return <div className="w-full min-h-screen ">SummaryPage</div>;
}

export default AdminPage;
