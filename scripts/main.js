Events.on(EventType.ClientLoadEvent, () => {
  const myDialog = new BaseDialog("Fancy Science V0.3");
  myDialog.addCloseButton();
  
  myDialog.show();
});