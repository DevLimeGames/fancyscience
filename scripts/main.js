Events.on(EventType.ClientLoadEvent, function() {
    fetchReleaseDetails();
});

function fetchReleaseDetails() {
    var currentVersion = "0.5 Preview";
    var repo = "DevLimeGames/fancyscience";
    var apiUrl = "https://api.github.com/repos/" + repo + "/releases/latest";

    Http.get(apiUrl, function(res) {
        var json = JSON.parse(res.getResultAsString());
        if (json && json.name && json.body) {
            showFancyScienceChangelog(currentVersion, json.name, json.body, json.html_url);
        } else {
            showFancyScienceChangelog(currentVersion, "Unknown", "No details available.", "https://github.com/DevLimeGames/fancyscience/releases/latest");
        }
    }, function(err) {
        showFancyScienceChangelog(currentVersion, "Error", "Failed to load release details.", "https://github.com/DevLimeGames/fancyscience/releases/latest");
    });
}

function showFancyScienceChangelog(currentVersion, latestVersion, releaseNotes, githubReleaseURL) {
    Core.app.post(function() {
        var dialog = new BaseDialog("FancyScience Changelog");
        dialog.cont.add("[accent]FancyScience - Latest Release").padBottom(16).row();
        dialog.cont.add("[lightgray]Current Version: " + currentVersion).padBottom(16).row();
        dialog.cont.add("[lightgray]Latest Version: " + latestVersion).padBottom(16).row();
        dialog.cont.add(releaseNotes).width(400).wrap().padBottom(16).row();

        dialog.cont.button("View on GitHub", function() {
            Core.app.openURI(githubReleaseURL);
        }).size(220, 60).padBottom(16).row();

        dialog.cont.button("Close", function() {
            dialog.hide();
        }).size(220, 60).padBottom(16).row();

        dialog.show();
    });
}