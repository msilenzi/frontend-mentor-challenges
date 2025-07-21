const challenges = [
  {
    name: "Contact Form",
    folder: "04-contact-form",
    languages: ["html", "css", "js"],
  },
  {
    name: "FAQs Accordion",
    folder: "03-faq-accordion",
    languages: ["html", "css"],
  },
  {
    name: "Order Summary Component",
    folder: "02-order-summary-component",
    languages: ["html", "css"],
  },
  {
    name: "Recipe Page",
    folder: "01-recipe-page",
    languages: ["html", "css"],
  },
];

const fragment = document.createDocumentFragment();

challenges.forEach(({ name, folder, languages }) => {
  const li = document.createElement("li");
  li.className = "card";
  li.style.backgroundImage = `url('${folder}/screenshot.png')`;
  fragment.appendChild(li);

  const a = document.createElement("a");
  a.href = folder;
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
