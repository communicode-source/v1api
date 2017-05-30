// somewhere in a controller
function bookmarkNewProject(req, res) {
    const dbHandler = new ProjectHandler();
	  const feedHandler = new ActivityFeedHandler();

    let data, statusCode;

    try {
  	  const project = req.body.project;

      data = await dbHandler.addBookmark(project);

  	  // I know this is crazy but maybe good?
  	  const pipe = feedHandler.addActivity({
  	  	actor:  req.body.user,
  		  verb: 'bookmarked',
  		  object: project.nonprofit_id
  	  })
  	  .handle({
        'notifications': new NotificationHandler(),
        'activityfeed': feedHandler
      }).through(request => {
  	  	return {
  			  showFollowers: (request) => {
  				    request.notifications.fire(request.activity);
  			   },
  			   showInFeed: (request) => {
  				    request.activityfeed.addToFeed(request.activity.actor);
  			   }
  		  };
  	  });

      statusCode = this.statusCode['success'];
    } catch(err) {
      data = await dbHandler.addBookmark();
      statusCode = this.statusCode['not found'];
    }

	  pipe.dispatch(['showFollowers', 'addInFeed']);
    return new Response(data, statusCode);
}
