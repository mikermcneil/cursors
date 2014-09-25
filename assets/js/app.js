angular.module('PBJ', []);
angular.module('PBJ').controller('AppCtrl', ['$scope', function ($scope){

  // Ensure `cursors` is an array
  $scope.cursors = [];


  // Initial fetch to get cursors
  // (only get ones who've been updated recently)
  //
  // (also subscribes to subsequent updates)
  io.socket.get('/cursor', {
    where: {
      updatedAt: {
        '>': new Date(((new Date()).getTime() - 15000))
      }
    }
  }, function (cursors, res){
    if (res.statusCode >= 300 || res.statusCode < 200) {
      console.error('Error fetching cursors (status: %s): ', res.statusCode, '\nBody:\n',cursors);
      return;
    }

    // Loop through and build each style object
    // (and cast ids)
    cursors = _.map(cursors, function (eachCursor){
      eachCursor.id = +eachCursor.id;
      eachCursor.style = {
        top: (eachCursor.y||0)+'px',
        left: (eachCursor.x||0)+'px'
      };
      return eachCursor;
    });

    // Update the DOM
    $scope.cursors = cursors;
    $scope.$apply();
  });


  // Immediately create the cursor for the current user
  io.socket.post('/cursor', {
    name: 'Guest_'+(Math.floor(Math.random()*100000)),
    x: 0,
    y: 0
  }, function(myCursor, res) {
    if (res.statusCode >= 300 || res.statusCode < 200) {
      console.error('Error creating a cursor (status: %s): ', res.statusCode, '\nBody:\n',myCursor);
      return;
    }

    // Start listening for cursor movement for the CURRENT USER
    // and update the server (throttled)
    $(window).mousemove(_.throttle(function onLocalCursorMovement(e) {
      // console.log('fired mousemove');

      // Inform other users about our new local cursor position
      io.socket.put('/cursor/'+myCursor.id, {
        x: e.pageX,
        y: e.pageY
      }, function(data, res) {
        if (res.statusCode >= 300 || res.statusCode < 200) {
          console.error('Error updating local cursor position (status: %s): ', res.statusCode, '\nBody:\n',data);
          return;
        }
      });
    }, 30));
  });


  // Listen for socket events of OTHER cursors and update the DOM
  io.socket.on('cursor', function onRemoteCursorActivity(event){

    try {


      // Cast id to an integer (just to be safe)
      event.data.id = event.data.id || event.id;
      event.data.id = +event.data.id;

      // (Re)build style object
      event.data.style = {
        top: (event.data.y||0)+'px',
        left: (event.data.x||0)+'px'
      };
      console.log('Received socket event:',event.data);

      switch(event.verb) {

        case 'created':
          // Add a new cursor to the DOM
          $scope.cursors.push(event.data);

          // Then refresh the DOM
          $scope.$apply();
          break;

        case 'updated':
          var existingCursor = _.find($scope.cursors, { id: +event.data.id });
          if (!existingCursor) {
            // Create the cursor in the DOM
            $scope.cursors.push(event.data);
          }
          else {
            // Cursor already exists in the DOM, update it
            existingCursor = _.extend(existingCursor, event.data);
          }

          // Finally, in either case, refresh the DOM
          $scope.$apply();
          break;

        default:
          throw new Error('Unrecognized socket event format');
      }
    }
    catch(e) {
      console.error('Malformd comet event:',event);
      return;
    }
  });


}]);


