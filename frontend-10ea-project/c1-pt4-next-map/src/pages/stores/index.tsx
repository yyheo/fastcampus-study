import { StoreType } from "@/interface";
import Image from "next/image";

export default function StoreListPage({ stores }: { stores: StoreType[] }) {
  return (
    <div className="px-4 md:max-w-5xl mx-auto py-8">
      <ul role="list" className="divide-y divide-gray-100">
        {stores?.map((store, index) => (
          <li className="flex justify-between gap-x-6 py-5" key={index}>
            <div className="flex gap-x-4">
              <Image
                src={
                  store?.category
                    ? `/images/markers/${store?.category}.png`
                    : "/images/markers/default.png"
                }
                width={48}
                height={48}
                alt="아이콘 이미지"
              />
              <div>
                <div className="text-sm font-semibold leading-6 text-gray-900">
                  {store?.name}
                </div>
                <div className="mt-1 text-xs font-semibold leading-5 text-gray-500">
                  {store?.storeType}
                </div>
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items:end">
              <div className="text-sm font-semibold leading-6 text-gray-900">
                {store?.address}
              </div>
              <div className="mt-1 text-xs font-semibold leading-5 text-gray-500">
                {store?.phone} | {store?.foodCertifyName} |{" "}
                {store?.category}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/*
• getServerSideProps: 서버 사이드 렌더링을 위한 데이터 가져오기 함수.
• 매 요청 마다 데이터를 서버에서 가져옴
• 자주 업데이트 되는 posts 데이터들을 외부 API로부터 fetch 해서 사전 렌더링 하고 싶을 때 사용
*/

export async function getServerSideProps() {
  const stores = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stores`
  ).then((res) => res.json());
  return {
    props: { stores },
  };
}