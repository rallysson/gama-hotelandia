const URL_API = "https://demo1340398.mockable.io/bedrooms";

function formatToReal(number) {
  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function openMap(bedroom) {
  $("#myModal").modal({});

  const locationBedroom = {
    lat: bedroom.lat,
    lng: bedroom.lng,
  };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: locationBedroom,
  });

  const marker = new google.maps.Marker({
    position: locationBedroom,
    map: map,
  });
}

function render(bedrooms) {
  const bedroomsElements = bedrooms.map((bedroom) => {
    const div = document.createElement("div");
    div.className = "bedroom";
    div.onclick = () => openMap(bedroom);

    div.innerHTML = `
    <img
      class="bedroom__image"
      src="${bedroom.photo}"
      alt="bedroom"
    />
    <div class="bedroom__info">
      <span class="bedroom__name">
        <b>${bedroom.name}</b>
      </span>
      <div class="bedroom__location">
        <img class="location-icon" src="./assets/icon-location.png" />
        <span>${bedroom.location}</span>
        </div>
      <div class="bedroom__description">
        <span>${bedroom.property_type}</span> 
        <span>${formatToReal(bedroom.price)}</span>
      </div>
    </div>`;

    return div;
  });

  const containerBedrooms = document.querySelector(".main__bedrooms");
  const paginationContainer = document.getElementById("pagination");

  containerBedrooms.innerHTML = "";
  containerBedrooms.append(...bedroomsElements);
  paginationContainer.style.display = "block";
}

function onSubmit(e) {
  e.preventDefault();
  console.log(e);
}

function handlePagination(page) {
  const BEDROOMS_PER_PAGE = 10;
  const start = (page - 1) * BEDROOMS_PER_PAGE;
  const end = start + 10 <= window.bedrooms.length ? start + 10 : undefined;
  const elements = window.bedrooms.slice(start, end);

  render(elements);
}

window.onload = function onLoad() {
  fetch(URL_API)
    .then((res) => res.json())
    .then((bedrooms) => {
      window.bedrooms = bedrooms;
      render(bedrooms.slice(0, 10));
    });
};
