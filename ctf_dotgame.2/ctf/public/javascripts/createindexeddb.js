let db;
db = new Dexie("ctf");
db
  .delete()
  .then(() => {
    db = new Dexie("ctf");
    db.version(1).stores({
      //colors: "++id, color, description",
      goals: "++id,who,x,y",
      flags: "++id,who,x,y,src",
      goalboundry: "++id,who,x,y,w,h,c",
      dropboundry: "++id,x,y,w,h,c",
      dots: "++id,who,number,x,y,r,type,live",
      gameinfo: "++id,who,live,latency,channel,playername,opponentname"
    });
  })
  .then(() => {
    for (i = 1; i <= 10; i++) {
      db.dots.add({
        who: "guest",
        number: i,
        x: 0,
        y: 0,
        r: 0,
        type: "placeholder",
        live: "false"
      });
    }
  })
  .then(() => {
    for (i = 1; i <= 10; i++) {
      db.dots.add({
        who: "host",
        number: i,
        x: 0,
        y: 0,
        r: 0,
        type: "placeholder",
        live: "false"
      });
    }
  })
  .then(() => {
    db.dropboundry.add({
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      c: "placeholder"
    });
  })
  .then(() => {
    db.goalboundry.add({
      who: "guest",
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      c: "placeholder"
    });
  })
  .then(() => {
    db.goalboundry.add({
      who: "host",
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      c: "placeholder"
    });
  })
  .then(() => {
    db.goals.add({
      who: "guest",
      x: 0,
      y: 0
    });
  })
  .then(() => {
    db.goals.add({
      who: "host",
      x: 0,
      y: 0
    });
  })
  .then(() => {
    db.gameinfo.add({
      who: "placeholder",
      live: "placeholder",
      latency: 0,
      channel: "placeholder",
      playername: "placeholder",
      opponentname: "placeholder"
    });
  })
  .then(() => {
    db.flags.add({
      who: "host",
      x: 0,
      y: 0,
      src: "placeholder"
    });
  })
  .then(() => {
    db.flags.add({
      who: "guest",
      x: 0,
      y: 0,
      src: "placeholder"
    });
  });
