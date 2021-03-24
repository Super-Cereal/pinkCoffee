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
  const LeadersBody_Pedestals = ({ users, emoji, selectedUserId }) => {
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
      if (selectedUserId > 3) {
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
        <div class="VoteBody VoteBody_landscape">
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

        <div class="VoteBody VoteBody_portrait">
          <div class="VoteBody-PersonsGroup">
            ${persons[0]}
            ${persons[3]}
            ${persons[6]}
          </div>
          <div class="VoteBody-ButtonsGroup">
            <div class="VoteBody-Button VoteBody-Button_top VoteBody-Button_disabled"></div>
              <div class="VoteBody-PersonsGroup">
                ${persons[1]}
                ${persons[4]}            
              </div>
            <div class="VoteBody-Button VoteBody-Button_bottom"></div>
          </div>
          <div class="VoteBody-PersonsGroup">
            ${persons[2]}
            ${persons[5]}
            ${persons[7]}
          </div>
        </div>
      </div>
`;
  };
  const VoteBody_Persons = ({ users, selectedUserId }) => {
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
        height = (v.value / max.value) * LINE_HEIGHT;
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
  const ActivityBodyContainer = ({ data }) => {
    function parseTwoHoursIntoOne(days) {
      let horizontalDays = [[], [], [], [], [], [], []];
      for (i in days) {
        for (j in days[i]) {
          if (j % 2 === 1) horizontalDays[i].push(days[i][j] + days[i][j - 1]);
        }
      }
      return horizontalDays;
    }
    function findBorders(days) {
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
    }
    let { mon, tue, wed, thu, fri, sat, sun } = data;
    let days = parseTwoHoursIntoOne([mon, tue, wed, thu, fri, sat, sun]);
    let borders = findBorders(days);
    return ActivityBody(days, borders);
  };
  const ActivityBody = (days, borders) => /* html */ `
      <div class="ActivityBodyWrapper">
        <div class="ActivityBody">
          <div class="ActivityBody-Field">
            ${ActivityBody_Field(days, borders)}
          </div>
          <div class="ActivityBody-Intervals">
            ${ActivityBody_Intevals(borders, "2 часа")}
          </div>
        </div>
      </div>
  `;
  const ActivityBody_Field = (days, borders) => {
    let res = "";
    for (i in days) {
      res += ActivityBody_Field_Row(days[i], borders);
    }
    return res;
  };
  const ActivityBody_Field_Row = (day, borders) => {
    function findHeight(val, borders) {
      if (val === 0) return "min";
      else if (1 <= val && val <= borders.firstBorder) return "mid";
      else if (borders.firstBorder < val && val <= borders.secondBorder) return "max";
      else if (borders.secondBorder < val && val <= borders.lastBorder) return "extra";
    }
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

  return Header(data) + ActivityBodyContainer(data);
};
const DiagramPage = (data) => {
  const DiagramBody = (data) => /* html */ `
    <div class="DiagramBodyWrapper">
      <div class="DiagramBody">
        <div class="DiagramBody-InternalWrapper">
          ${DiagramBody_Diagram(data.totalText, data.differenceText)}
          ${DiagramBody_Legend(data.categories)}
        </div>
      </div>
    </div>
  `;
  // const DiagramBody_MainScript = () => /* html */ `
  //   <script>
  //     let dataD = [30, 32, 58, 62];
  //     let r = 120;

  //     let canvas = d3.select("svg")
  //       .attr("width", "240").attr("height", "240")
  //       .attr("viewbox", "0 0 240 240")
  //       .attr("fill", "none").attr("xmlns", "http://www.w3.org/2000/svg")
  //       .style("transform", "rotate(-31deg)");
  //     let group = canvas.append("g")
  //       .attr("transform", "translate(120, 120)");

  //     let whites = ["url(#paint03_radial)", "url(#paint00_radial)", "url(#paint02_radial)", "url(#paint01_radial)"],
  //       w = -1;
  //     const color_white = () => {
  //       w += 1;
  //       return whites[w];
  //     }

  //     let opacities = ["0.8", "0.6", "0.25", "0.5"], 
  //       o = -1;
  //     const opacity_white = () => {
  //       o += 1;
  //       return opacities[o];
  //     }

  //     let filters = ["url(#filter03_ii)", "url(#filter00_ii)", "url(#filter02_ii)", "url(#filter01_ii)"],
  //       f = -1;
  //     const filters_white = () => {
  //       f += 1;
  //       return filters[f]
  //     }
  //     let arc = d3.svg.arc()
  //       .innerRadius(0.7*r).outerRadius(r)
  //       .padAngle(0.02).cornerRadius(6);

  //     let pie = d3.layout.pie().sort(null).value(d => d);

  //     let arcs = group.selectAll(".arc")
  //       .data(pie(dataD))
  //       .enter().append("g")
  //       .attr("filter", d => filters_white())
      
  //     arcs.append("path")
  //       .attr("d", arc)
  //       .attr("fill", d => color_white())
  //       .attr("fill-opacity", d => opacity_white())
  //   </script>
  // `;
  // const DiagramBody_D3Script = () => /* html */ `
  //   <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js"></script>
  // `;
  const DiagramBody_Diagram = (totalText, differenceText) => /* html */ `
    <div class="DiagramBody-Diagram Diagram">
      <div class="Diagram-Text">
        <span class="fontType_subhead">${totalText}</span>
        <span class="fontColor_gray">${differenceText}</span>
      </div>
    </div>
  `;
  // const DiagramBody_Diagram_d3_defs = () => /* html */ `
  //   <svg class="Diagram-D3">
  //     <defs>
  //     <radialGradient id="paint00_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="scale(120)">
  //       <stop offset="0.8125" stop-color="#FFB800" stop-opacity="0.4"/>
  //       <stop offset="1" stop-color="#FFEF99" stop-opacity="0.2"/>
  //     </radialGradient>
  //     <radialGradient id="paint01_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="scale(120)">
  //           <stop offset="0.828125" stop-color="#BFBFBF" stop-opacity="0.69"/>
  //           <stop offset="0.921875" stop-color="#E4E4E4" stop-opacity="0.2"/>
  //     </radialGradient>
  //     <radialGradient id="paint02_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="scale(120)">
  //           <stop offset="0.828125" stop-color="#A6A6A6" stop-opacity="0.69"/>
  //           <stop offset="0.921875" stop-color="#CBCBCB" stop-opacity="0.2"/>
  //     </radialGradient>
  //     <radialGradient id="paint03_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="scale(120)">
  //           <stop offset="0.8125" stop-color="#FFB800" stop-opacity="0.7"/>
  //           <stop offset="1" stop-color="#FFEF99" stop-opacity="0.4"/>
  //     </radialGradient>
  //     <filter id="filter00_ii" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
  //       <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  //       <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
  //       <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  //       <feOffset/>
  //       <feGaussianBlur stdDeviation="10"/>
  //       <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
  //       <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.69 0 0 0 0 0.225 0 0 0 0.4 0"/>
  //       <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
  //       <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  //       <feOffset dx="-1" dy="1"/>
  //       <feGaussianBlur stdDeviation="0.5"/>
  //       <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
  //       <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"/>
  //       <feBlend mode="normal" in2="effect1_innerShadow" result="effect2_innerShadow"/>
  //     </filter >
  //     <filter id="filter01_ii" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
  //       <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  //       <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
  //       <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  //       <feOffset/>
  //       <feGaussianBlur stdDeviation="10"/>
  //       <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
  //       <feColorMatrix type="matrix" values="0 0 0 0 0.5125 0 0 0 0 0.5125 0 0 0 0 0.5125 0 0 0 0.6 0"/>
  //       <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
  //       <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  //       <feOffset dx="-1" dy="1"/>
  //       <feGaussianBlur stdDeviation="0.5"/>
  //       <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
  //       <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"/>
  //       <feBlend mode="normal" in2="effect1_innerShadow" result="effect2_innerShadow"/>
  //     </filter >
  //     <filter id="filter02_ii" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
  //       <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  //       <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
  //       <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  //       <feOffset/>
  //       <feGaussianBlur stdDeviation="10"/>
  //       <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
  //       <feColorMatrix type="matrix" values="0 0 0 0 0.4125 0 0 0 0 0.4125 0 0 0 0 0.4125 0 0 0 0.2 0"/>
  //       <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
  //       <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  //       <feOffset dx="-1" dy="1"/>
  //       <feGaussianBlur stdDeviation="0.5"/>
  //       <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
  //       <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"/>
  //       <feBlend mode="normal" in2="effect1_innerShadow" result="effect2_innerShadow"/>
  //     </filter >
  //     <filter id="filter03_ii" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
  //       <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  //       <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
  //       <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  //       <feOffset/>
  //       <feGaussianBlur stdDeviation="10"/>
  //       <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
  //       <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.69 0 0 0 0 0.225 0 0 0 0.9 0"/>
  //       <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
  //       <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  //       <feOffset dx="-1" dy="1"/>
  //       <feGaussianBlur stdDeviation="0.5"/>
  //       <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
  //       <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"/>
  //       <feBlend mode="normal" in2="effect1_innerShadow" result="effect2_innerShadow"/>
  //     </filter >
  //   </defs>
  //   </svg>
  // `;
  const DiagramBody_Legend = (categories) => {
    let res = "";
    for (i in categories) {
      if (i != 0) res += /* html */ `<div class="Divider Divider_horizontal"></div>`;
      res += DiagramBody_LegendLine(categories[i], i);
    }
    return /* html */ `<div class="DiagramBody-Legend Legend">${res}</div>`;
  };
  const DiagramBody_LegendLine = (category, index) => /* html */ `
      <div class="LegendLine">
        <div class="LegendLine-LeftBlock">
          <span class="LegendLine-Title LegendLine-Title_${index}">${category.title}</span>
        </div>
        <div class="LegendLine-RightBlock">
          <span class="LegendLine-DiffText fontColor_gray">
            ${category.differenceText.split(" ")[0]}
          </span>
          <span class="LegendLine-TotalText fontColor_gray">
            ${category.valueText.split(" ")[0]}
          </span>        
        </div>
      </div>
  `;
  return Header(data) + DiagramBody(data);
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
    case "diagram":
      return DiagramPage(data);
    default:
      return `uncorrect alias: ${alias}`;
  }
};

window.renderTemplate = renderTemplate;
