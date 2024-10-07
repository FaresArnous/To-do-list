const drawerBtnElement = document.getElementById("drawer-btn");
const navBar = document.getElementById("nav-bar");

function openSideDrawer() {
  navBar.classList.toggle("open");
}

drawerBtnElement.addEventListener("click", openSideDrawer);
