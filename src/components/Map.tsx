/* global kakao */

/*
Kakao Map Docu
https://apis.map.kakao.com/web/guide/
공공 데이터
http://data.seoul.go.kr/dataList/OA-2741/S/1/datasetView.do
마커 생성 Sample
https://apis.map.kakao.com/web/sample/basicMarker/
이미지 마커 생성 Sample
https://apis.map.kakao.com/web/sample/basicMarkerImage/
*/

import Script from "next/script";
import * as stores from "@/data/store_data.json";

declare global {
  interface Window {
    kakao: any;
  }
}

const DEFAULT_LAT = 37.497625203; // 강남역 위도 경도
const DEFAULT_LNG = 127.03088379;

export default function Map() {
  const loadKakaoMap = () => {
    // kakao map 로드 - v3 스크립트를 동적으로 로드
    // 스크립트의 로딩이 끝나기 전에 v3의 객체에 접근하려고 하면 에러가 발생하기 때문에
    // 로딩이 끝나는 시점에 콜백을 통해 객체에 접근할 수 있도록 해 준다.
    // 비동기 통신으로 페이지에 v3를 동적으로 삽입할 경우에 주로 사용된다.
    // v3 로딩 스크립트 주소에 파라메터로 autoload=false 를 지정해 주어야 한다.
    window.kakao.maps.load(function () {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG), // 위도 경도 설정
        level: 3, // zoom level
      };
      // v3가 모두 로드된 후, 이 콜백 함수가 실행됩니다.
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      // 식당 데이터 마커 띄우기
      stores?.["DATA"]?.map((store) => {
        var imageSrc = store?.bizcnd_code_nm
            ? `/images/markers/${store?.bizcnd_code_nm}.png`
            : "/images/markers/default.png", // 마커이미지의 주소입니다
          imageSize = new window.kakao.maps.Size(40, 40), // 마커이미지의 크기입니다
          imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        var markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        // 마커가 표시될 위치입니다
        var markerPosition = new window.kakao.maps.LatLng(
          store?.y_dnts,
          store?.x_cnts
        );

        // 마커를 생성합니다
        var marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

        // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
        // marker.setMap(null);
      });
    });
  };
  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      ></Script>
      <div id="map" className="w-full h-screen"></div>
    </>
  );
}
