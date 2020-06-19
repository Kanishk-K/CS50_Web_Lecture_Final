# CS50_Web_Lecture_Final

# MainPage/models.py (SQL x7)
- Creates Event, Award, Member, Team, ProfileRequest and Alert models.
- Creates an event with a name attribute.
- Creates an award with an award attribute.
- Creates a Member which is mapped to only one user, an extension of the user model.
- Creates a Team model with a manytomany field to a Member meaning one Member can be a part of many teams and one team can have many members.
- Creates a ProfileRequest model which is mapped to one user, an extension of the user model.
- Creates an Alert model, contains a text field for the text alert and if it is active or not through a boolean field.

# SciOLY/Urls.py
- Maps each url path to a function defined in one of the views.py files.

# AdminConsole/views.py (Python)
- Manages the admin console and admin features.
- Admins can set the status of users.
- Admins can reject or accept profile change applications.
- Admins can create new teams, add members to said teams, or remove members from teams.
- Admins can set the status of user's as graduated.
- Admins can create alerts on the homepage.
- Admins can create new events or awards and then add those respective events or awards to members.

# MainPage/views.py (Python)
- Manages the rendering of the homepage at "".
- If a user selects a team from the dropdown it will send the Ajax request a response containing members in the team.
- If a user selects a member from that dropdown it will send an Ajax response of the member's image, member's bio, member's awards and member's events.

# users/views.py (Python)
- Manages any form of registration, login, logout or modification to the User model.
- Allows users to submit applications for an account.
- Allows users to log in to the website, if the user is not verified as an accepted student it will not let them in.
- Handles any profile change requests, adds images to the /media/ directory and creates a ProfileRequest Model object.

# users/forms.py (Python)
- Adds more fields to the UserCreationForm, adding fields for a first name, last name and email.

# static/MainPage/script.js (Javascript)
- Handles the javascript for the side navigation bar.
- If a user Selects a team on the homepage, generates an Ajax request for information for users on the selected team..
- When user information is recieved, it will dynamically generate buttons on the dropdown and dyncamically add onclick functions to them with their own imbedded ajax requests.
- When a user selects a user from the user dropdown it will generate an ajax reqeust for user information and then dynamically add them to the screen.

# static/Applications/Application.js (Javascript)
- If the admin selects an activate user button it will send an ajax request to the server to update the user's status accordingly then remove the application from the screen.
- If the admin rejects a user it will send an ajax request to the server in order to update the status of the user accordingly and update the display to reflect the user rejected.

# static/Applications/Graduate.js (Javascript)
- If the admin clicks the graduate button on any user it will send an ajax response to the server in order to update the user's status accordingly.

# static/Applications/ProfileChange.js (Javascript)
- If the admin approves the change it will reflect it on the server side, otherwise it will delete the request from the server.

# static/Applications/StudentManager.js (Javascript)
- If the admin creates a non-blank event or award it will create one on the server and update the page accordingly.
- If the admin clicks the delete award/event button on the user it will reflect those changes on the server as well. Removing the event/award from the screen as well.
- If the admin clicks the add award/event button on the user it will reflet those changes on the server, dynamically generate code for the remove buttons and append a list item to the ul.

# static/Applications/TeamManage.js (Javascript)
- If the admin clicks the remove team button it will send a request to the server to remove the team, removing the team from the display once a response is revcieved.
- If the admin removes a member from the team it will remove the user from the team on the server and reflect changes accordingly on the webpage.
- If the admin adds a member to the team it will submit changes to the server, dynamically generate remove buttons and add onclick events to them then display the change.

# static/ProfilePage/script.js (Javascript)
- If the user clicks a key in order to change their bio the Characters remaining section on the screen will update accordingly.
- If the user submits an image to the upload field it will update the profile image display accordingly to reflect how the user's change will look like on the webpage.
