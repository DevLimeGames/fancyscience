Events.on(EventType.ClientLoadEvent, () => {
    Core.app.post(() => {
        let dialog = new BaseDialog("FancyScience V0.4");
        dialog.cont.add("Check for updates and update FancyScience!").row();

        dialog.cont.button("Check for Update", () => {
            checkForUpdate();
        }).size(220, 60).row();

        dialog.cont.button("Close", () => {
            dialog.hide();
        }).size(220, 60).row();

        dialog.show();
    });
});

function checkForUpdate() {
    let repo = "DevLimeGames/Fancyscience";
    let apiUrl = `https://api.github.com/repos/${repo}/releases/latest`;

    Http.get(apiUrl, (res) => {
        try {
            let json = JSON.parse(res.getResultAsString());
            if (!json || !json.tag_name || !json.assets || json.assets.length === 0) {
                Vars.ui.showErrorMessage("Failed to fetch the latest release.");
                return;
            }

            let latestVersion = json.tag_name.replace("V", "").trim();
            let currentVersion = Vars.mods.getMod("fancyscience").meta.version.replace("V", "").trim();
            let latestDownload = json.assets[0].browser_download_url;
            let changelog = json.body || "No changelog provided.";

            if (parseFloat(latestVersion) > parseFloat(currentVersion)) {
                showUpdateDialog(latestVersion, changelog, latestDownload);
            } else {
                Vars.ui.showInfoToast("You already have the latest version.", 3);
            }
        } catch (error) {
            Vars.ui.showErrorMessage("Error parsing update data: " + error);
        }
    }, (err) => {
        Vars.ui.showErrorMessage("Failed to check for updates: " + err);
    });
}

function showUpdateDialog(version, changelog, downloadUrl) {
    let dialog = new BaseDialog("FancyScience Update Available!");
    dialog.cont.add(`**New version: ${version}**`).row();
    dialog.cont.pane(p => {
        p.add(changelog).width(400).wrap().left();
    }).size(450, 200).row();

    dialog.cont.button("Update Now", () => {
        dialog.hide();
        downloadAndUpdateMod(downloadUrl);
    }).size(200, 50).row();

    dialog.cont.button("Cancel", () => {
        dialog.hide();
    }).size(200, 50).row();

    dialog.show();
}

function downloadAndUpdateMod(url) {
    let modFile = Vars.mods.getMod("fancyscience").file;

    Vars.ui.showInfoToast("Downloading update...", 3);

    Http.get(url, (res) => {
        let bytes = res.getResult();
        if (bytes) {
            Core.files.write(modFile.absolutePath(), bytes);
            Vars.ui.showInfoToast("FancyScience updated! Restarting...", 4);
            restartGame();
        } else {
            Vars.ui.showErrorMessage("Update failed!");
        }
    }, (err) => {
        Vars.ui.showErrorMessage("Download error: " + err);
    });
}

function restartGame() {
    Time.runTask(3 * 60, () => {
        Core.settings.manualSave();
        Core.app.exit();
    });
}