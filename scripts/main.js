Events.on(EventType.ClientLoadEvent, () => {
    Core.app.post(() => {
        let dialog = new BaseDialog("FancyScience Updater");
        dialog.cont.add("Check for updates and update FancyScience!").padBottom(32).row();

        dialog.cont.button("Check for Update", () => {
            checkForUpdate();
        }).size(220, 60).padBottom(32).row();

        dialog.cont.button("Close", () => {
            dialog.hide();
        }).size(220, 60).padBottom(32).row();

        dialog.show();
    });
});

function checkForUpdate() {
    let repo = "DevLimeGames/fancyscience";
    let apiUrl = `https://api.github.com/repos/${repo}/releases/latest`;

    Http.get(apiUrl, (res) => {
        let json = JSON.parse(res.getResultAsString());
        if (!json || !json.tag_name) {
            Vars.ui.showErrorMessage("No valid release found.");
            return;
        }

        let latestVersion = json.tag_name.trim();
        let currentVersion = Vars.mods.getMod("fancyscience").meta.version.trim();
        let latestDownload = json.assets.length > 0 ? json.assets[0].browser_download_url : json.zipball_url;

        if (!latestDownload) {
            Vars.ui.showErrorMessage("No download link found.");
            return;
        }

        if (latestVersion !== currentVersion) {
            Vars.ui.showInfoToast(`New version ${latestVersion} found! Downloading...`, 3);
            downloadAndUpdateMod(latestDownload);
        } else {
            Vars.ui.showInfoToast("You already have the latest version.", 3);
        }
    }, (err) => {
        Vars.ui.showErrorMessage("Failed to check for updates: " + err);
    });
}

function downloadAndUpdateMod(url) {
    let modPath = Vars.mods.getMod("fancyscience").file.absolutePath();

    Http.get(url, (res) => {
        let bytes = res.getResult();
        if (bytes) {
            Core.files.write(modPath, bytes);
            Vars.ui.showInfoToast("FancyScience updated! Restart the game.", 4);
        } else {
            Vars.ui.showErrorMessage("Update failed!");
        }
    }, (err) => {
        Vars.ui.showErrorMessage("Download error: " + err);
    });
}