

exports.for = function(API, plugin) {

	var streePath = null;

	function findStreePath() {
		if (streePath === null) {			
	        return API.OS.which("stree").then(function(path) {
	        	streePath = path;
	        	if (!path) {
                    API.TERM.stdout.writenl("  \0cyan(If you install `stree` http://www.SourcetreeApp.com (no affiliation with sourcemint)\0)");
                    API.TERM.stdout.writenl("  \0cyan(these packages will be automatically opened for you to commit changes.\0)");
                    API.TERM.stdout.writenl("");
                    throw true;
	        	}
	        	return path;
	        });
		} else {
			return API.Q.resolve(streePath);
		}
	}


	plugin.save = function(node, options) {
		return findStreePath().then(function(streePath) {
			return API.OS.exec(streePath + " " + node.path);
		});
	}
}
