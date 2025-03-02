Events.on(EventType.ClientLoadEvent, () => {
  const myDialog = new ModsDialog();
  myDialog.addCloseButton();
  
  myDialog.show();
});