Events.on(EventType.ClientLoadEvent, () => {
  const myDialog = new BaseDialog("Fancy Science V0.3");
  myDialog.addCloseButton();
  
  myDialog.show();
});

Events.on(UnitDestroyEvent, event => {
  if(event.unit.isPlayer()) {
    Vars.ui.hudfrag.showToast("Seriously. Try harder.")
  }
})