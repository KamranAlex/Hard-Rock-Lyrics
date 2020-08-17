const searchBox = document.getElementById("search-box");
const searchButton = document.getElementById("search-btn");
const simpleResults = document.getElementsByClassName("simple-results");

const apiLink = "https://api.lyrics.ovh/suggest/";

//Event Listener for SEARCH button...
searchButton.addEventListener("click", function () {
  const searchValue = searchBox.Value;
  if (searchValue == "") {
    alert("Please Type a Song or Artist Name !!!");
  } else {
    searchedSongs(searchValue);
  }
});

//Search by Song or Artist...
function searchedSongs(searchData) {
  fetch(`${apiLink}${searchData}`)
    .then((res) => res.json())
    .then((data) => showData(data));
}

//Show the Searched Results..
function showData(results) {
  output = "";

  for (let i = 0; i < 10; i++) {
    const getResult = results.data[i];
    output += `<p class='author lead'>
      <strong>${getResult.title}</strong> - Album by <span> ${getResult.artist.name}</span>
      <button class='btn btn-success'>Get Lyrics</button>
    </p>`;
    console.log(getResult);
  }

  //   simpleResults.innerHtml = output;
}
