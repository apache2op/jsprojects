const APIURL = "https://api.github.com/users/";

const main = document.querySelector("main");
const searchBox = document.querySelector("#search");

// Fetch user profile on submit
const getUser = async (username) => {
  const response = await fetch(APIURL + username);
  const data = await response.json();

  const card = `
    <div class="card">
      <img class="avatar" src="${data.avatar_url}" alt="${data.name}" />
      <div class="user-info">
        <h2>${data.name ? data.name : "No Name"}</h2>
        <p>${data.bio ? data.bio : ""}</p>
        <ul>
          <li>${data.followers} <strong>Followers</strong></li>
          <li>${data.following} <strong>Following</strong></li>
          <li>${data.public_repos} <strong>Repos</strong></li>
        </ul>
        <div id="repos"></div>
      </div>
    </div>
  `;

  main.innerHTML = card;

  getRepos(username);
};

// Fetch user's repositories
const getRepos = async (username) => {
  const reposElem = document.querySelector("#repos");
  const response = await fetch(APIURL + username + "/repos");
  const data = await response.json();
  reposElem.innerHTML = "";
  data.slice(0, 6).forEach((item) => {
    const elem = document.createElement("a");
    elem.classList.add("repo");
    elem.href = item.html_url;
    elem.innerText = item.name;
    elem.target = "_blank";
    reposElem.appendChild(elem);
  });
};

// Form handler
function formSubmit() {
  if (searchBox.value) {
    getUser(searchBox.value);
  }
  searchBox.value = "";
  return false;
}

// Optionally, fetch your profile by default
getUser("octocat");

// Enter key also triggers search
searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    formSubmit();
  }
});
