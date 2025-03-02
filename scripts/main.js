Events.on(EventType.ClientLoadEvent, () => {
   const myDialog = new BaseDialog("Fancy Science v0.3");
  myDialog.addCloseButton();
  myDialog.cont.add("Close");
  
  myDialog.show();
});