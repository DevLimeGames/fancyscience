Events.on(EventType.ClientLoadEvent, () => {
    showFancyScienceMenu();
});

Events.on(EventType.MenuEvent, (event) => {
    if (event.menu == MenuState.main) {
        Time.runTask(10, showFancyScienceMenu);
    }
});

function showFancyScienceMenu() {
    Core.app.post(() => {
        let dialog = new BaseDialog("FancyScience V0.4");
        dialog.cont.add("Welcome to FancyScience!").padBottom(16).row();

        dialog.cont.button("Campaign", () => {
            dialog.hide();
            Vars.ui.menufrag.toggleMenu();
            Vars.ui.campaign.show();
        }).size(220, 60).padBottom(16).row();

        dialog.cont.button("Load Game", () => {
            dialog.hide();
            Vars.ui.menufrag.toggleMenu();
            Vars.ui.saves.show();
        }).size(220, 60).padBottom(16).row();

        dialog.cont.button("Custom Game", () => {
            dialog.hide();
            Vars.ui.menufrag.toggleMenu();
            Vars.ui.custom.show();
        }).size(220, 60).padBottom(16).row();

        dialog.cont.button("Map Maker", () => {
            dialog.hide();
            Vars.ui.menufrag.toggleMenu();
            Vars.ui.editor.show();
        }).size(220, 60).padBottom(16).row();

        dialog.cont.button("Mods", () => {
            dialog.hide();
            Vars.ui.mods.show();
        }).size(220, 60).padBottom(16).row();

        dialog.cont.button("Settings", () => {
            dialog.hide();
            Vars.ui.settings.show();
        }).size(220, 60).padBottom(16).row();

        dialog.cont.button("Quit", () => {
            Core.app.exit();
        }).size(220, 60).padBottom(16).row();

        dialog.show();
    });
}