const challenges = [
  {
    name: "Contact Form",
    imageSrc: "04-contact-form/screenshot.png",
    href: "04-contact-form",
    languages: ["html", "css", "js"],
  },
  {
    name: "FAQs Accordion",
    imageSrc: "03-faq-accordion/screenshot-faq-accordion.png",
    href: "03-faq-accordion",
    languages: ["html", "css"],
  },
  {
    name: "Order Summary Component",
    imageSrc:
      "02-order-summary-component/screenshot-order-summary-component.png",
    href: "02-order-summary-component",
    languages: ["html", "css"],
  },
  {
    name: "Recipe Page",
    imageSrc: "01-recipe-page/screenshot-recipe-page-msilenzi.png",
    href: "01-recipe-page",
    languages: ["html", "css"],
  },
];

const fragment = document.createDocumentFragment();

challenges.forEach(({ name, imageSrc, href, languages }) => {
  const li = document.createElement("li");
  li.className = "card";
  li.style.backgroundImage = `url('${imageSrc}')`;
  fragment.appendChild(li);

  const a = document.createElement("a");
  a.href = href;
  li.appendChild(a);

  const cardBody = document.createElement("div");
  cardBody.className = "card__body";
  a.appendChild(cardBody);

  const title = document.createElement("h2");
  title.className = "card__title";
  title.textContent = name;
  cardBody.appendChild(title);

  const languagesList = document.createElement("ul");
  languagesList.className = "card__languages";
  cardBody.appendChild(languagesList);

  languages.forEach((language) => {
    const languageItem = document.createElement("li");
    languageItem.className = "card__language";
    languageItem.dataset.language = language;
    languageItem.textContent = language;
    languagesList.appendChild(languageItem);
  });
});

const cardList = document.getElementById("card-list");
cardList.appendChild(fragment);
