const Header = (data) => /* html */ `
  <div class="HeaderWrapper">
    <header class="Header">
      <h1 class="Header-Title fontType_headline">${data.title}</h1>
      <span class="Header-Subtitle fontColor_gray">${data.subtitle}</span>
    </header>
  </div>
`;

const LeadersPage = (data) => {
  const LeadersBody = (data) => {
    let usersPedestals = LeadersBody_Pedestals(data);
    return /* html */ `
      <div class="LeadersBodyWrapper">
        <div class="LeadersBody">
          <div class="LeadersBody-Pedestals">
            ${usersPedestals[4]}
            ${usersPedestals[2]}
            ${usersPedestals[0]}
            ${usersPedestals[1]}
            ${usersPedestals[3]}
          </div>
        </div>
      </div>
`;
  };
  const LeadersBody_Pedestals = (data) => {
    let { users, emoji, selectedUserId } = data;

    let usersPedestals = [];
    for (let i = 0; i < 5; i++) {
      let curUserEmoji =
        i === 0 ? emoji : users[i].id === selectedUserId ? "👍" : "";
      usersPedestals.push(LeadersBody_Pedestal(users[i], i + 1, curUserEmoji));
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
    return usersPedestals;
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
        <span class="Person-Value fontType_caption fontColor_gray">${user.valueText}</span>
      </div>
    </div>
    <div class="LeadersBody-Block LeadersBody-Block_${place}">
      <div class="LeadersBody-PlaceWrapper">
        <span class="LeadersBody-Place fontType_headline">${place}</span>
      </div>
    </div>
  </section>
`;
  return Header(data) + LeadersBody(data);
};

const VotePage = (data) => {
  const VoteBody = (data) => {
    let persons = VoteBody_Persons(data);
    return /* html */ `
      <div class="VoteBodyWrapper">
        <div class="VoteBody">
          ${persons[0]}
          <div class="VoteBody-PersonsGroup">
           ${persons[1]}
           ${persons[4]}
          </div>
          <div class="VoteBody-ButtonsGroup">
            <div class="VoteBody-Button VoteBody-Button_top VoteBody-Button_disabled"></div>
            <div class="VoteBody-Button VoteBody-Button_bottom"></div>
          </div>
          <div class="VoteBody-PersonsGroup">
           ${persons[2]}
           ${persons[5]}
          </div>
          ${persons[3]}
        </div>
      </div>
`;
  };
  const VoteBody_Persons = (data) => {
    let { users, selectedUserId } = data;
    let persons = [];
    for (let i = 0; i < 8; i++) {
      let user = users[i];
      let curUserEmoji = user.id === selectedUserId ? "👍" : "";
      persons.push(
        VoteBody_Person(user, curUserEmoji, user.id === selectedUserId ?? false)
      );
    }
    return persons;
  };
  const VoteBody_Person = (user, emoji, isSelected) => /* html */ `
    <div class="VoteBody-Person" data-isSelected="${isSelected}">
      <div class="Person">
        <picture class="Person-AvatarWrapper" data-emoji="${emoji}">
          <source srcset="/images/1x/${user.avatar}" media="(min-width: 700px)">
          <img class="Person-Avatar" src="/images/1x/${user.avatar}" alt="userAvatar" />
        </picture>
        <span class="Person-Name">${user.name}</span>
      </div>
    </div>
`;
  return Header(data) + VoteBody(data);
};

const ChartPage = (data) => {
  const ChartBody = (data) => {
    let columns = ChartBody_Columns(data.values);
    let users = ChartBody_Users(data.users);
    return /* html */ `
      <div class="ChartBodyWrapper">
        <div class="ChartBody">
          <div class="ChartBody-InternalWrapper">
            <div class="ChartBody-Columns">
              ${columns.reduce((prev, cur) => prev + cur)}
            </div>
            <div class="ChartBody-Users">
              ${users.reduce((prev, cur) => prev + cur)}
            </div>
          </div>
        </div>
      </div>
    `;
  };
  const ChartBody_Columns = (values) => {
    let activeIndex = values.findIndex((v) => v.active);
    let max = values[activeIndex];
    values = values.slice(activeIndex - 6, activeIndex + 3);
    values.forEach((v) => {
      if (v.value > max.value) max = v;
    });

    let columns = [];
    for (let i = 0; i < 9; i++) {
      let v = values[i],
        height = (70 / max.value) * v.value;
      columns.push(ChartBody_Column(v, height, v === max));
    }
    return columns;
  };
  const ChartBody_Column = (value, height, isActive) => /* html */ `
    <div class="ChartBody-Column Column">
      <div class="Column-Value fontType_subhead ${
        isActive ? "" : "fontColor_gray"
      }">${value.value > 0 ? value.value : ""}</div>
      <div class="Column-Line Column-Line_active_${isActive}" style="height: ${height}%"></div>
      <div class="Column-Title fontColor_gray">${value.title}</div>
    </div>
  `;
  const ChartBody_Users = (users) => {
    let persons = [];
    for (let i = 0; i < 2; i++) {
      persons.push(ChartBody_User(users[i], i+1));
    }
    return persons;
  };
  const ChartBody_User = (user, number) => /* html */ `
    <div class="Person_horizontal Person_horizontal_${number}">
      <picture class="Person_horizontal-AvatarWrapper">
        <source srcset="/images/1x/${user.avatar}" media="(max-width: 700px)">
        <img class="Person_horizontal-Avatar" src="/images/1x/${user.avatar}" alt="userAvatar" />
      </picture>
      <div class="Person_horizontal-Info">
        <span class="Person_horizontal-Name">${user.name}</span>
        <span class="Person_horizontal-Value fontType_caption fontColor_gray">${user.valueText}</span>
      </div>
    </div>
  `;
  return Header(data) + ChartBody(data);
};

const renderTemplate = (alias, data) => {
  // возвращает содержимое для body по полученному alias & data
  switch (alias) {
    case "leaders":
      return LeadersPage(data);
    case "vote":
      return VotePage(data);
    case "chart":
      return ChartPage(data);
    default:
      return `uncorrect alias: ${alias}`;
  }
};

window.renderTemplate = renderTemplate;
