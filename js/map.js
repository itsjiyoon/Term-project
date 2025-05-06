// script.js

// 지도 생성
const mapContainer = document.getElementById('map');
const mapOption = {
  center: new kakao.maps.LatLng(35.1796, 129.0756), // 부산 중심
  level: 6
};
const map = new kakao.maps.Map(mapContainer, mapOption);
const ps = new kakao.maps.services.Places();

let marker = null;
let infowindow = null;

// ✅ 여기에 병원 이름만 수정하면 됩니다 (근데 검색어가 제대로 인식이 안됨..)
const keyword = "부산대학교병원";

// 검색 실행
ps.keywordSearch(keyword, (data, status) => {
  if (status === kakao.maps.services.Status.OK) {
    const place = data.find(p => p.place_name.includes(keyword)) || data[0];
    const coords = new kakao.maps.LatLng(place.y, place.x);

    if (marker) marker.setMap(null);
    marker = new kakao.maps.Marker({
      map: map,
      position: coords
    });

    if (infowindow) infowindow.close();
    infowindow = new kakao.maps.InfoWindow({
      content: `<div style="padding:5px;">${place.place_name}</div>`
    });
    infowindow.open(map, marker);

    map.setCenter(coords);
  } else {
    alert("병원을 찾을 수 없습니다.");
  }
});
