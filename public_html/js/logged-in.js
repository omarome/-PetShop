let isLoggedIn = true
const nav_right = document.querySelector('.nav-right');
if(isLoggedIn === true) {
  nav_right.innerHTML = `<ul class="header-btns">
                <li class="dropdown">
                    <a>👤</a>
                    <ul class="dropdown-content" id="dropdown-content2">
                        <li class="dropdown_item"><a class="dropdown_link" href="../profile.html">Profile</a></li>
                        <li class="dropdown_item"><a class="dropdown_link" href="../adpage.html">Post an ad</a></li>
                        <li class="dropdown_item"><a class="dropdown_link" href="../index.html">Log out</a></li>
                    </ul>
                </li>
            </ul>`
}
else{
  nav_right.innerHTML =`<ul class="header-btns">
                <li class="up-btn"><a href="../adpage.html">Post an Ade</a></li>
                <li class="in-btn" id="show-login"><a href="#">Log In</a></li>
            </ul>`
}