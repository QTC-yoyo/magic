$(document).ready(function () {

  // Get the filename of the page currently open.
  let currentPage = window.location.pathname.split("/").pop();

  // GitHub Pages may open the homepage without showing index.html.
  if (currentPage === "") {
    currentPage = "index.html";
  }

  // Load the navigation information from menu.json.
  $.getJSON("menu.json")
    .done(function (data) {

      // Begin creating the navigation.
      let menuHTML = `
        <nav class="main-menu">
          <div class="website-name">
            magic
          </div>

          <div class="menu-links">
      `;

      // Repeat these instructions for every item in menu.json.
      data.menuItems.forEach(function (item) {

        // The active class will highlight the current page.
        let activeClass = "";

        if (item.link === currentPage) {
          activeClass = "active";
        }

        // Create a navigation link using the JSON information.
        menuHTML += `
          <a href="${item.link}" class="${activeClass}">
            ${item.name}
          </a>
        `;
      });

      // Finish the navigation HTML.
      menuHTML += `
          </div>
        </nav>
      `;

      // Display the finished navigation inside menu-container.
      $("#menu-container").html(menuHTML);
    })

    // Display an error if menu.json cannot be loaded.
    .fail(function () {
      $("#menu-container").html(`
        <p class="menu-error">
          The navigation menu could not be loaded.
        </p>
      `);
    });

});

