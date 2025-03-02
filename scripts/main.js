Events.on(EventType.ClientLoadEvent, () => {
  const myDialog = new ModsDialog();
  myDialog.addCloseButton();
  
  myDialog.show();
});

Events.on(UnitDestroyEvent, event => {
  if(event.unit.isPlayer()
    Vars.ui.hudfrag.showToast("Pathetic.");
  }
})