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
            Vars.ui.loadAnd(MenuState.mode.campaign);
        }).size(220, 60).padBottom(16).row();

        dialog.cont.button("Load Game", () => {
            Vars.ui.loadAnd(MenuState.mode.saves);
        }).size(220, 60).padBottom(16).row();

        dialog.cont.button("Custom Game", () => {
            Vars.ui.loadAnd(MenuState.mode.custom);
        }).size(220, 60).padBottom(16).row();

        dialog.cont.button("Map Maker", () => {
            Vars.ui.loadAnd(MenuState.mode.editor);
        }).size(220, 60).padBottom(16).row();

        dialog.cont.button("Mods", () => {
            Vars.ui.mods.show();
        }).size(220, 60).padBottom(16).row();

        dialog.cont.button("Settings", () => {
            Vars.ui.settings.show();
        }).size(220, 60).padBottom(16).row();

        dialog.cont.button("Quit", () => {
            Core.app.exit();
        }).size(220, 60).padBottom(16).row();

        dialog.show();
    });
}