Events.on(EventType.ClientLoadEvent, () => {
    Core.app.post(() => {
        let dialog = new BaseDialog("FancyScience Updater");
        dialog.cont.add("Manage your FancyScience installation.").padBottom(32).row();

        dialog.cont.button("Install Latest Release", () => {
            installLatestRelease();
        }).size(220, 60).padBottom(32).row();

        dialog.cont.button("Install Preview", () => {
            installPreview();
        }).size(220, 60).padBottom(32).row();

        dialog.cont.button("Close", () => {
            dialog.hide();
        }).size(220, 60).padBottom(32).row();

        dialog.show();
    });
});

function installLatestRelease() {
    let latestDownload = "https://github.com/DevLimeGames/fancyscience/releases/latest/download/FancyScience.zip";
    Vars.ui.showInfoToast("Downloading Latest Release...", 3);
    downloadAndUpdateMod(latestDownload);
}

function installPreview() {
    let previewDownload = "https://github.com/DevLimeGames/fancyscience/archive/main.zip";
    Vars.ui.showInfoToast("Downloading Preview Version...", 3);
    downloadAndUpdateMod(previewDownload);
}

function downloadAndUpdateMod(url) {
    let modFolder = Vars.mods.getMod("fancyscience").file.parent(); 
    let tempFile = modFolder.child("FancyScience_Temp.zip");

    Http.get(url, (res) => {
        let bytes = res.getResult();
        if (bytes) {
            tempFile.writeBytes(bytes, false);
            Vars.ui.showInfoToast("Download complete! Restart the game to apply the update.", 4);
        } else {
            Vars.ui.showErrorMessage("Update failed!");
        }
    }, (err) => {
        Vars.ui.showErrorMessage("Download error: " + err);
    });
}