const rellax = new Rellax('.rellax');

const menus = document.querySelectorAll("[data-menu-to-open]");
const pages = document.querySelectorAll("[data-page-name]");
const pageNavBtns = document.querySelectorAll(".nav-btn");
const workBtn = document.querySelector('[data-open-menu="work"]');
const whiteScreen = document.querySelector('.white-screen');
let openMenu = "";
let currentPage = 'home';
const optionalPages = ['home', 'about', 'nomnom']

function init() {
  if(window.location.hash && withoutHash(window.location.hash) !== currentPage) {
    setPage(withoutHash(window.location.hash));
  }

  document.addEventListener("click", (event) => {
    const menuToOpen = event.target.getAttribute("data-open-menu");
    if (menuToOpen && menuToOpen !== openMenu) {
      setOpenMenu(menuToOpen);
    }
    else if (
      !elementInParent(
        event.target,
        document.querySelector(`[data-menu-to-open="${openMenu}"]`)
      )
    ) {
      closeAllMenus();
    }
  });
  
  window.addEventListener('popstate', () => {
      const hash = withoutHash(window.location.hash);
      console.log('hash: ', hash);
      if(hash !== currentPage) {
        setPage(hash);
      }
  });
}

function setOpenMenu(menuToOpen) {
  openMenu = menuToOpen;
  for (const menu of menus) {
    if (menuToOpen === menu.getAttribute("data-menu-to-open")) {
      menu.classList.toggle("show");
    } else {
      menu.classList.remove("show");
    }
  }
}

function closeAllMenus() {
  openMenu = '';
  for (const menu of menus) {
    menu.classList.remove("show");
  }
}

function setPage(pageName) {
  if (!optionalPages.includes(pageName)) {
    window.location = window.location.href.split('#')[0];
    return;
  }

  currentPage = pageName;
  closeAllMenus();
  openWhiteScreen();
  setTimeout(() => {
    for(const page of pages) {
      if (page.getAttribute('data-page-name') === pageName) {
        page.classList.add('show');
      }
      else {
        page.classList.remove('show');
      }
    }
    for(const navBtn of pageNavBtns) {
      if (withoutHash(navBtn.getAttribute('href')) === pageName) {
        navBtn.classList.add('active');
      }
      else {
        navBtn.classList.remove('active');
      }
    }
    if(!["home", "about"].includes(pageName)) {
      workBtn.classList.add('active');
    }
    else {
      workBtn.classList.remove('active');
    }
    closeWhiteScreen();
  }, 600);
}

function openWhiteScreen() {
  whiteScreen.classList.remove('hide');
  setTimeout(() => whiteScreen.classList.add('show'), 50);
}

function closeWhiteScreen() {
  whiteScreen.classList.remove('show');
  setTimeout(() => whiteScreen.classList.add('hide'), 500);
}

function elementInParent(element, parentElementToCheck) {
  if (element === parentElementToCheck) {
    return true;
  } else if (element !== document.body) {
    elementInParent(element.parentElement, parentElementToCheck);
  }

  return false;
}

function withoutHash(str) {
  return str && str.substr(1);
}

init();
