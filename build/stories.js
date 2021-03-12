const Header = (data) => /* html */ `
  <div class="HeaderWrapper">
    <header class="Header">
      <h1 class="Header-Title fontType_headline">${data.title}</h1>
      <span class="Header-Subtitle fontColor_gray">${data.subtitle}</span>
    </header>
  </div>
`;

const LeadersBody = (data) => /* html */ `
  <div class="LeadersBodyWrapper">
    <div class="LeadersBody">
      <div class="LeadersBody-Pedestals">
        ${LeadersBody_Pedestals(
          data.users,
          data.emoji,
          data.selectedUserId ?? null
        )}
      </div>
    </div>
  </div>
`;

const LeadersBody_Pedestals = (users, emoji, selectedUserId) => {
  let usersPedestals = ["", "", "", "", ""];

  for (let i = 0; i < 5; i++) {
    let curUserEmoji =
      i === 0 ? emoji : users[i].id === selectedUserId ? "👍" : "";
    usersPedestals[i] = LeadersBody_Pedestal(users[i], i + 1, curUserEmoji);
  }
  // на случай если выбранный юзер не находится в лидерах
  if (selectedUserId) {
    let selectedUserIndex = users.findIndex((u) => u.id === selectedUserId);
    if (selectedUserIndex > 4) {
      usersPedestals[4] = LeadersBody_Pedestal(
        users[selectedUserIndex],
        selectedUserIndex + 1,
        "👍"
      );
    }
  }
  return (
    usersPedestals[4] +
    usersPedestals[2] +
    usersPedestals[0] +
    usersPedestals[1] +
    usersPedestals[3]
  );
};

const LeadersBody_Pedestal = (user, place, emoji) => /*html*/ `
  <section class="LeadersBody-Pedestal LeadersBody-Pedestal_${place}">
    <div class="LeadersBody-PersonWrapper">
      <div class="Person">
        <picture class="Person-AvatarWrapper" data-emoji="${emoji}">
          <source srcset="/images/1x/${user.avatar}" media="(max-width: 700px)">
          <img class="Person-Avatar" src="/images/1x/${user.avatar}" alt="userAvatar" />
        </picture>
        <span class="Person-Name">${user.name}</span>
        <span class="Person-Value fontType_caption fontColor_grayLight">${user.valueText}</span>
      </div>
    </div>
    <div class="LeadersBody-Block LeadersBody-Block_${place}">
      <span class="LeadersBody-Place fontType_headline">${place}</span>
    </div>
  </section>
`;

const LeadersPage = (data) => {
  return Header(data) + LeadersBody(data);
};

const renderTemplate = (alias, data) => {
  // возвращает содержимое для body по полученному alias & data
  switch (alias) {
    case "leaders":
      return LeadersPage(data);
    default:
      return `uncorrect alias: ${alias}`;
  }
};

window.renderTemplate = renderTemplate;
