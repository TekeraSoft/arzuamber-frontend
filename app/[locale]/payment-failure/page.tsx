import React from 'react';
import PageContainer from "@/components/Containers/PageContainer";
import {Link} from "@/i18n/routing";
import {MdCancel} from "react-icons/md";

function PaymentFailurePage(props) {
    return (
        <PageContainer>
            <div className="w-full min-h-[665px] flex flex-col justify-center items-center bg-gray-100 rounded-lg">
                <div className="flex flex-col items-center">
                    <MdCancel className=" h-20 w-20  md:w-32 md:h-32 text-secondary mb-4" />
                    <h1 className="text-2xl font-bold text-gray-800">Ödeme Alınamadı!</h1>
                    <p className="text-gray-600 mt-2">Lütfen bilgilerinizi kontrol ediniz ve tekrar deneyiniz.</p>
                    <Link
                        href="/payment"
                        className="mt-6 px-6 py-2 bg-secondary text-white rounded-lg shadow-md hover:scale-105 transition"
                    >
                        Ödeme Sayfası
                    </Link>
                </div>
            </div>
        </PageContainer>
    );
}

export default PaymentFailurePage;