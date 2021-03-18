const Header = ({ title, subtitle }) => /* html */ `
  <div class="HeaderWrapper">
    <header class="Header">
      <h1 class="Header-Title fontType_headline">${title}</h1>
      <span class="Header-Subtitle fontColor_gray">${subtitle}</span>
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
      let curUserEmoji = i === 0 ? emoji : users[i].id === selectedUserId ? "👍" : "";
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
        <div class="Person Person_ordinary">
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
      persons.push(VoteBody_Person(user, curUserEmoji, user.id === selectedUserId));
    }
    return persons;
  };
  const VoteBody_Person = (user, emoji, isSelected) => /* html */ `
    <div class="Person Person_ordinary Person_ordinary_hoverOn ${
      isSelected ? "Person_ordinary_selected" : ""
    }" >
      <picture class="Person-AvatarWrapper" data-emoji="${emoji}">
        <source srcset="/images/1x/${user.avatar}" media="(min-width: 700px)">
        <img class="Person-Avatar" src="/images/1x/${user.avatar}" alt="userAvatar" />
      </picture>
      <span class="Person-Name">${user.name}</span>
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
              ${users[0]}
              <div class="Divider Divider_vertical"></div>
              ${users[1]}
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

    const LINE_HEIGHT = 117;
    let columns = [];
    for (let i = 0; i < 9; i++) {
      let v = values[i],
        height = v.value / max.value * LINE_HEIGHT;
      columns.push(ChartBody_Column(v, height, v === max));
    }
    return columns;
  };
  const ChartBody_Column = (value, height, isActive) => /* html */ `
    <div class="ChartBody-Column Column">
      <div class="Column-Line ${isActive ? "Column-Line_active" : ""}" style="height: ${height}px">
        <div class="Column-Value fontType_subhead ${isActive ? "" : "fontColor_gray"}">
          ${value.value > 0 ? value.value : ""}
        </div>
      </div>
      <div class="Column-Title fontColor_gray">${value.title}</div>
    </div>
  `;
  const ChartBody_Users = (users) => {
    let persons = [];
    for (let i = 0; i < 2; i++) {
      persons.push(ChartBody_User(users[i]));
    }
    return persons;
  };
  const ChartBody_User = (user) => /* html */ `
    <div class="Person Person_horizontal">
      <picture class="Person-AvatarWrapper">
        <source srcset="/images/1x/${user.avatar}" media="(max-width: 700px)">
        <img class="Person-Avatar" src="/images/1x/${user.avatar}" alt="userAvatar" />
      </picture>
      <div class="Person-Info">
        <span class="Person-Name">${user.name}</span>
        <span class="Person-Value fontType_caption fontColor_gray">${user.valueText}</span>
      </div>
    </div>
  `;
  return Header(data) + ChartBody(data);
};

const ActivityPage = (data) => {
  const parseTwoHoursIntoOne = (days) => {
    let horizontalDays = [[], [], [], [], [], [], []];
    for (i in days) {
      for (j in days[i]) {
        if (j % 2 === 1) horizontalDays[i].push(days[i][j] + days[i][j - 1]);
      }
    }
    return horizontalDays;
  };
  const findBorders = (days) => {
    let max = -1;
    for (i in days) {
      max = Math.max(max, Math.max.apply(null, days[i]));
    }
    let borders = {
      firstBorder: Math.floor(max / 3),
      secondBorder: 2 * Math.floor(max / 3),
      lastBorder: max,
    };
    // если максимум коммитов за неделею равен 2, то первая граница будет равна нулю,
    // а вторую необходимо установить вручную
    if (max === 2) borders.secondBorder = 1;
    return borders;
  };
  const findHeight = (val, borders) => {
    if (val === 0) return "min";
    else if (1 <= val && val <= borders.firstBorder) return "mid";
    else if (borders.firstBorder < val && val <= borders.secondBorder) return "max";
    else if (borders.secondBorder < val && val <= borders.lastBorder) return "extra";
  };

  const ActivityBody = (data) => {
    let { mon, tue, wed, thu, fri, sat, sun } = data.data;
    let days = parseTwoHoursIntoOne([mon, tue, wed, thu, fri, sat, sun]);
    let borders = findBorders(days);

    let field = ActivityBody_Field(days, borders);
    let intervals = ActivityBody_Intevals(borders, "2 часа");
    return /* html */ `
      <div class="ActivityBodyWrapper">
        <div class="ActivityBody">
          <div class="ActivityBody-Field">
            ${field}
          </div>
          <div class="ActivityBody-Intervals">
            ${intervals}
          </div>
        </div>
      </div>
  `;
  };
  const ActivityBody_Field = (days, borders) => {
    let res = "";
    for (i in days) {
      res += ActivityBody_Field_Row(days[i], borders);
    }
    return res;
  };
  const ActivityBody_Field_Row = (day, borders) => {
    let res = "";
    for (j in day) res += ActivityBody_Field_Turret(findHeight(day[j], borders));
    return /*html*/ `<div class="ActivityBody-Row">${res}</div>`;
  };
  const ActivityBody_Field_Turret = (height) => /* html */ `
    <div class="ActivityBody-Turret ActivityBody-Turret_${height}">
    </div>
  `;
  const ActivityBody_Intevals = (borders, sellSize) =>
    ActivityBody_Inteval("sellSize", sellSize) +
    ActivityBody_Inteval("min", 0) +
    ActivityBody_Inteval("mid", borders.firstBorder > 0 ? "1 — " + borders.firstBorder : "—") +
    ActivityBody_Inteval(
      "max",
      borders.secondBorder > 0 ? borders.firstBorder + 1 + " — " + borders.secondBorder : "—"
    ) +
    ActivityBody_Inteval(
      "extra",
      borders.lastBorder > 0 ? borders.secondBorder + 1 + " — " + borders.lastBorder : "—"
    );
  const ActivityBody_Inteval = (intervalType, value) => /* html */ `
    <div class="ActivityBody-Interval">
      <div class="ActivityBody-IntervalBlock ActivityBody-IntervalBlock_${intervalType}">
        <div></div>
      </div>
      <span class="ActivityBody-IntervalValue fontColor_gray">${value}</span>
    </div>
  `;

  return Header(data) + ActivityBody(data);
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
    case "activity":
      return ActivityPage(data);
    default:
      return `uncorrect alias: ${alias}`;
  }
};

window.renderTemplate = renderTemplate;
