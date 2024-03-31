import { StoreType } from "@/interface";
import { useEffect } from "react";

interface MarkerProps {
  map: any;
  storeDatas: StoreType[];
}

export default function Markers({ map, storeDatas }: MarkerProps) {
  const loadKakaoMarkers = () => {
    if (map) {
      // 식당 데이터 마커 띄우기
      storeDatas?.map((store) => {
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
          image: markerImage,
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

        // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
        // marker.setMap(null);

        // 마커 커서가 오버 되었을때 마커 위에 표시 될 커스텀 오버레이 생성

        // 커스텀 오버레이에 표시할 내용입니다
        // HTML 문자열 또는 Dom Element 입니다
        var customOverlayContent = `<div class="info-window">${store?.upso_nm}</div>`;

        // 커스텀 오버레이를 생성합니다
        var customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: customOverlayContent,
          xAnchor: 0.6,
          yAnchor: 0.91,
        });

        // 마커에 마우스오버 이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, "mouseover", function () {
          // 마커에 마우스오버 이벤트가 발생하면 커스텀 오버레이를 지도에 표시합니다
          customOverlay.setMap(map);
        });

        // 마커에 마우스아웃 이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, "mouseout", function () {
          // 마커에 마우스아웃 이벤트가 발생하면 커스텀오버레이 제거
          customOverlay.setMap(null);
        });
      });
    }
  };
  useEffect(() => {
    loadKakaoMarkers();
  }, [map]);
  return <></>;
}
