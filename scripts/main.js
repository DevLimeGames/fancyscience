Events.on(EventType.ClientLoadEvent, () => {
  const myDialog = new BaseDialog("Fancy Science V0.3");
  myDialog.addCloseButton();
  
  myDialog.show();
});

Events.on(UnitDestroyEvent, event => {
  if(event.unit.isPlayer()
    const myDialog = new BaseDialog("Message");
    myDialog.addCloseButton();
    myDialog.cont.add("Seriously? Try harder.")
  
    myDialog.show();
  }
})