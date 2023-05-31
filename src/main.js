const $input = document.getElementById("search-input"); //입력창

$input.addEventListener("keydown", function (event) {
  if (event === 13) {
    event.preventDefault();
    document.getElementById("search-btn").click();
  }
});

const searchListener = (event) => {
  event.preventDefault(); // submit 역할을 하는 버튼을 눌렀어도 새로 실행하지 않게
  const movieCards = document.getElementsByClassName("movie-card"); // fetch로 데이터 받아놓은 div
  const searchKeyword = $input.value.toLowerCase(); // 입력창 대소문자 구분하지 않도록. 전부 소문자

  console.log(movieCards);
  Array.from(movieCards).forEach((element) => {
    //forEach를 사용하기 위해 Array.from으로 유사배열객체를 배열로 바꿔줌
    if (
      !element.childNodes[3].textContent.toLowerCase().includes(searchKeyword)
    ) {
      // movie-card의 h3태그의 제목과  search-input의 문자열 포함 비교하는 부분. 자식노드를 하드코딩해서 좋아보이지 않음. 수정 필요

      element.style.display = "none"; // none은 아예 존재하지 않는 것 처럼 지워줌(보여주지 않음)
      // hidden은 자리는 잡고있음
    } else {
      element.style.display = "block";
    }
  });
};

const movieFetch = async () => {
  // 오픈API
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      // 인식 값.
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNmJiNmVhZTAzYjM3ZThiNjYxYTIwYzE2YWU0NWRhYSIsInN1YiI6IjY0NzA4ZGM3YzVhZGE1MDBkZWU2ZGNiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7IpFGGYZEKboxPViPrRXtcfPVFlPIHIn4OXQEhsEreA",
    },
  };
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=2",
    options
  );
  const data = await response.json();
  return data.results;
};

const createList = async () => {
  const movieDatas = await movieFetch(); // 비동기 처리. 데이터 다 받아오고 화면에 출력해야 함.
  const cardList = document.querySelector(".card-list");

  cardList.innerHTML = movieDatas // map함수로 card-list에 들어갈 html구문 바로 넣어줌.
    .map(
      (movie) => `
        <div class="movie-card" id=${movie.id}>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
            <h3>${movie.title}</h3>
            <p>${movie.overview}</p>
            <p>Rating: ${movie.vote_average}</p>
        </div>`
    )
    .join("");

  const movieCards = document.getElementsByClassName("movie-card");
  Array.from(movieCards).forEach((element) => {
    element.addEventListener("click", function (event) {
      alert(element.getAttribute("id"));
    });
  });
};

createList(); // 들어가면 fetch부터 실행.
