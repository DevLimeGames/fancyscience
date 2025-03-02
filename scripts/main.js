Events.on(EventType.ClientLoadEvent, () => {
    const menu = new MenuFragment((frag) => {
        frag.table((t) => {
            t.add("Fancy Science v0.3").pad(10);
            t.row();
            
            t.row();
            t.button("Close", () => {
                menu.hide();
            }).size(200, 60);
        }).grow();
    });

    menu.show();
});