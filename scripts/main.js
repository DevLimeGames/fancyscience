Events.on(EventType.ClientLoadEvent, () => {
    const menu = new MenuFragment((frag) => {
        frag.table((t) => {
            t.add("Fancy Science v0.3").pad(10);
            t.row();
            
            // Open Mod Browser to Fancy Science
            t.button("Update Mod", () => {
                Vars.ui.mods.show(); // Opens the mod browser
                Time.runTask(10, () => {
                    Vars.ui.mods.frag.toggle(); // Ensures the fragment is visible
                    Vars.ui.mods.mods.each(mod => {
                        if (mod.meta.name === "FancyScience") {
                            Vars.ui.mods.showMod(mod); // Opens Fancy Science mod page
                        }
                    });
                });
            }).size(200, 60);
            
            t.row();
            t.button("Reload Mod", () => {
                Vars.mods.reload(); // Reloads all mods
            }).size(200, 60);
            
            t.row();
            t.button("Close", () => {
                menu.hide();
            }).size(200, 60);
        }).grow();
    });

    menu.show();
});