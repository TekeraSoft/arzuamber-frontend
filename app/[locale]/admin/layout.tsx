import Layout from "@/components/admin/Layout";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import StoreProvider from "@/store/StoreProvider";
import {ToastContainer} from "react-toastify";
import React from "react";

export default async function AdminLayout({children,}: {
    children: React.ReactNode;
}) {

    const messages = await getMessages()

    return (
        <NextIntlClientProvider messages={messages}>
            <StoreProvider>
        <Layout>
            {children}
        </Layout>
            </StoreProvider>
        </NextIntlClientProvider>
    );
}
