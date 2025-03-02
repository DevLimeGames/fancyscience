Events.on(EventType.ClientLoadEvent, () => {
  const myDialog = new ContentInfoDialog();
  myDialog.addCloseButton();
  
  myDialog.show();
});