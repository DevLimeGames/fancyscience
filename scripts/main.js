Events.on(EventType.ClientLoadEvent, () => {
    Core.app.post(() => {
        let dialog = new BaseDialog("FancyScience Updater");
        dialog.cont.add("Manage your FancyScience installation.").padBottom(32).row();

        dialog.cont.button("Preview", () => {
            openModBrowser("FancyScience");
        }).size(220, 60).padBottom(32).row();

        dialog.cont.button("Release", () => {
            openModBrowser("FancyScience");
        }).size(220, 60).padBottom(32).row();

        dialog.cont.button("Close", () => {
            dialog.hide();
        }).size(220, 60).padBottom(32).row();

        dialog.show();
    });
});

function openModBrowser(modName) {
    Vars.ui.mods.show();
    Time.runTask(10, () => {
        Vars.ui.mods.frag.search.setText(modName);
    });
}