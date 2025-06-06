const koreaCityCoords = {
  seoul: [37.5665, 126.9780],
  busan: [35.1796, 129.0756],
  daegu: [35.8722, 128.6025],
  incheon: [37.4563, 126.7052],
  gwangju: [35.1595, 126.8526],
  daejeon: [36.3504, 127.3845],
  ulsan: [35.5384, 129.3114],
  sejong: [36.4800, 127.2890]
};

const mapContainer = document.getElementById('map');
let map = new kakao.maps.Map(mapContainer, {
  center: new kakao.maps.LatLng(koreaCityCoords.busan[0], koreaCityCoords.busan[1]),
  level: 3
});

let marker = new kakao.maps.Marker();
marker.setMap(map);

const ps = new kakao.maps.services.Places();

document.getElementById("search-button").addEventListener("click", async function () {
  const region = document.getElementById("region-select").value;
  const keyword = document.getElementById("search-input").value.trim();

  if (!keyword || !region) {
    alert("지역과 검색어를 입력해주세요.");
    return;
  }

  const coords = koreaCityCoords[region];
  if (!coords) {
    alert("유효하지 않은 지역입니다.");
    return;
  }

  const [lat, lng] = coords;
  const searchOptions = {
    location: new kakao.maps.LatLng(lat, lng),
    radius: 10000,
    category_group_code: 'HP8'
  };

  ps.keywordSearch(keyword, placesSearchCB, searchOptions);
});

document.getElementById("search-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        document.getElementById("search-button").click();
    }
});

function placesSearchCB(data, status, pagination) {
  const hospitalListElement = document.getElementById("hospital-list");
  const kakaoReviewIframe = document.getElementById("kakao-review-iframe");

  hospitalListElement.innerHTML = "";
  kakaoReviewIframe.src = "about:blank"; // 검색 시 iframe 초기화

  if (status === kakao.maps.services.Status.OK) {
    data.forEach(place => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="hospital-item">
          <h4 class="hospital-name">${place.place_name}</h4>
          <p class="hospital-address">${place.address_name}</p>
          ${place.phone ? `<p class="hospital-phone">${place.phone}</p>` : ''}
          <a href="${place.place_url}#comment" target="_blank" class="hospital-link">자세히 보기</a>
        </div>
      `;
      hospitalListElement.appendChild(li);

      li.addEventListener("click", function() {
        const moveLatLon = new kakao.maps.LatLng(place.y, place.x);
        map.setCenter(moveLatLon);
        marker.setPosition(moveLatLon);
        
        // 카카오맵 후기 페이지를 iframe에 로드 시도
        // 대부분의 경우 보안 정책으로 인해 로드되지 않을 수 있습니다.
        if (kakaoReviewIframe) {
            kakaoReviewIframe.src = `${place.place_url}#comment`;
            console.log(`Attempting to load Kakao review iframe with: ${kakaoReviewIframe.src}`);
        }
      });
    });

    const firstPlace = data[0];
    if (firstPlace) {
        const moveLatLon = new kakao.maps.LatLng(firstPlace.y, firstPlace.x);
        map.setCenter(moveLatLon);
        marker.setPosition(moveLatLon);
    }

  } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    hospitalListElement.textContent = '검색 결과가 없습니다.';
  } else if (status === kakao.maps.services.Status.ERROR) {
    hospitalListElement.textContent = '검색 중 오류가 발생했습니다.';
    console.error("카카오맵 검색 오류:", status);
  }
}