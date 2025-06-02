// 지역 좌표
const koreaCityCoords = {
  seoul: [37.5665, 126.9780],
  busan: [35.1796, 129.0756],
  daegu: [35.8722, 128.6025],
  incheon: [37.4563, 126.7052],
  gwangju: [35.1595, 126.8526],
  daejeon: [36.3504, 127.3845],
  ulsan: [35.5384, 129.3114],
  sejong: [36.4800, 127.2890]};


const mapContainer = document.getElementById('map');
let map = new kakao.maps.Map(mapContainer, {
  center: new kakao.maps.LatLng(37.5665, 126.9780), // 초기 위치
  level: 3
});

let marker = new kakao.maps.Marker();
marker.setMap(map);

document.getElementById("search-button").addEventListener("click", async function () {
  const region = document.getElementById("region-select").value;
  const keyword = document.getElementById("search-input").value.trim();

  if (!keyword || !region) return;

  const coords = koreaCityCoords[region];
  if (!coords) return;

  const [lat, lng] = coords;
  const radius = 10000; 

  const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(keyword)}&x=${lng}&y=${lat}&radius=${radius}&category_group_code=HP8`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: "KakaoAK " 
      }
    });

    const data = await response.json();
    const dropdown = document.getElementById("address-dropdown");
    dropdown.innerHTML = "";

    data.documents.forEach(place => {
      const div = document.createElement("div");
      div.className = "dropdown-item";
      div.textContent = place.place_name;
      div.dataset.x = place.x;
      div.dataset.y = place.y;
      div.dataset.name = place.place_name;
      dropdown.appendChild(div);
    });

    dropdown.style.display = "block";

    if (data.documents.length > 0) {
      const first = data.documents[0];
      const moveLatLon = new kakao.maps.LatLng(first.y, first.x);
      map.setCenter(moveLatLon);
      marker.setPosition(moveLatLon);
    }

  } catch (err) {
    console.error("검색 오류:", err);
  }
});

document.getElementById("address-dropdown").addEventListener("click", function (e) {
  if (!e.target.classList.contains("dropdown-item")) return;

  const x = e.target.dataset.x;
  const y = e.target.dataset.y;
  const placeName = e.target.dataset.name;

  // 지도 이동
  const moveLatLon = new kakao.maps.LatLng(y, x);
  map.setCenter(moveLatLon);
  marker.setPosition(moveLatLon);

  // 블로그 리뷰 검색 실행
  searchBlogReviews(placeName);

  this.style.display = "none";
});



// 블로그 관련 
function searchBlogReviews(keyword) {
  const encodedKeyword = encodeURIComponent(keyword);
  const url = `http://localhost:3000/search?query=${encodedKeyword}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const postList = data.items.map(item => ({
        title: item.title,
        link: item.link
      }));
      displayPosts(postList); 
    if (postList.length > 0) {
        const iframe = document.getElementById("review");
        iframe.src = postList[0].link;
      }
    })
    .catch(err => console.error("블로그 검색 오류:", err));
}
 
function displayPosts(postList) {
  const postListElement = document.getElementById("post-list");
  postListElement.innerHTML = ""; 

  postList.forEach(post => {
    const li = document.createElement("li");
    li.innerHTML = `
    <a href="${post.link}" target="_blank">
        <img src="images/sanjini.png" alt="블로그 이미지" class="post-image" />
        ${post.title}
      </a>
    `;
    postListElement.appendChild(li);
  });
}

