// 玩家对象
function Player(name, teamColor, playerDirector) {
  this.name = name;
  this.teamColor = teamColor;
  this.state = "alive";
  this.playerDirector = playerDirector;
  this.playerDirector.ReceiveMessage("addPlayer", this);
}

Player.prototype.win = function () {
  this.state = "win";
  console.log(`${this.name}'s team ${this.teamColor} is winner!`);
};

Player.prototype.lose = function () {
  this.state = "lose";
  console.log(`${this.name}'s team ${this.teamColor} is loser!`);
};

Player.prototype.die = function () {
  this.state = "die";
  this.playerDirector.ReceiveMessage("playerDie", this);
};

Player.prototype.outline = function () {
  this.state = "outline";
  this.playerDirector.ReceiveMessage("playerOutline", this);
};

Player.prototype.changeTeam = function (teamColor) {
  if (player.state === "die") {
    this.playerDirector.ReceiveMessage("playerchangeTema", teamColor, this);
    this.teamColor = teamColor;
  } else {
    console.log("角色未死亡，无法转换队伍");
  }
};

// 玩家中介者
function PlayerDirector() {
  this.playerList = {};
}

// 接收信息
PlayerDirector.prototype.ReceiveMessage = function () {
  const [messageType, ...params] = arguments;
  const fn = this[messageType];
  if (fn) {
    fn.apply(this, params);
  } else {
    throw new Error("无法处理此消息");
  }
  this[messageType];
};

// 添加玩家
PlayerDirector.prototype.addPlayer = function (player) {
  const team = this.playerList[player.teamColor];
  if (team) {
    team.push(player);
  } else {
    this.playerList[player.teamColor] = [player];
  }
};

// 玩家死亡
PlayerDirector.prototype.playerDie = function (player) {
  let team_all_die = true;
  const currentTeam = this.playerList[player.teamColor];
  for (let i of currentTeam) {
    if (i.state !== "die") {
      team_all_die = false;
      break;
    }
  }
  if (team_all_die) {
    for (let team of Object.values(this.playerList)) {
      for (let i of team) {
        if (i.teamColor === player.teamColor) {
          i.lose();
        } else {
          i.win();
        }
      }
    }
  }
};

// 玩家离线
PlayerDirector.prototype.playerOutline = function (player) {
  let team = this.playerList[player.teamColor];
  this.playerList[player.teamColor] = team.filter((i) => i !== player);
};

// 玩家变换队伍
PlayerDirector.prototype.playerchangeTema = function (newTeamColor, player) {
  this.playerOutline(player);
  this.addPlayer(player);
};

// 玩家工厂

const PlayerFactory = (function () {
  let playerDirector = null;
  return function (name, teamColor) {
    if (!playerDirector) {
      playerDirector = new PlayerDirector();
    }
    return new Player(name, teamColor, playerDirector);
  };
})();

const player1 = PlayerFactory("player1", "red");
const player2 = PlayerFactory("player2", "blue");
const player3 = PlayerFactory("player3", "blue");

player3.outline();
player1.die();
