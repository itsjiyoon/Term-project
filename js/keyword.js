const API_KEY = 'YOUR_KAKAO_REST_API_KEY'; 
const query = '강남 병원';  // 유저한테 입력받은 키워드를 여기에 받으면 됩니다
const category = 'HP8';     // 병원 카테고리라서 만약 다른 키워드 검색 넣고싶음 여기 수정하면 됩니다

const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}&category_group_code=${category}`;

fetch(url, {
  method: 'GET',
  headers: {
    Authorization: `KakaoAK ${API_KEY}`
  }
})
.then(response => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
})
.then(data => {
  console.log('검색 결과:', data);
})
.catch(error => {
  console.error('API 요청 중 오류 발생:', error);
});
