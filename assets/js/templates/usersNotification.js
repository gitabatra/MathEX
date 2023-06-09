function appendNewNotificationListItem(
  notificationId,
  description,
  dateString
) {
  return `<div id="notification-list-item-${notificationId}" class="row mb-2 newNotification">
    <div class="col-auto px-0"><label><h6 class="px-0"><i class="fas fa-bell text-warning"></i> ${description}</h6> 
    </label></div>
    <div class="col text-end">
    <div class="row" id="row">
        <div class="col text-end">
            <b>${dateString}</b>
        </div>
        <div class="col-auto">
            <div class="form-check">
                <input class="form-check-input switchRead" type="checkbox" name="notification-read" value="" id="flex-read-check_${notificationId}">
                <label class="form-check-label" for="flex-read-check_${notificationId}">Read</label>
            </div>
        </div>
    </div>
    </div>      
   </div>`;
}

function appendUsersListSmallScreen(
    userId,
    userObj,
    position,
    disable_toggle_button,
    checked_toggle_button
    ){
    return ` <div class="list-group-item list-group-item-action" aria-current="true">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">${userObj.username}</h5>
      <small><div class="form-check form-switch align-content-center">
       <div class="d-flex flex-wrap align-content-center justify-content-center">
          <input class="form-check-input switchAdmin" type="checkbox" role="switch" id="flex-switch-check_${userId}" ${checked_toggle_button} ${disable_toggle_button}/>
          <label id="switch-check-label-${userId}" class="form-check-label" for="flex-switch-check_${userId}">Turn to Admin</label>
        </div>
      </div></small>
    </div>
    <p class="mb-1">${userObj.email}</p>
    <small><span id="position-badge-${userId}-${position}" class="user-position-${userId}">${position}</span></small>
  </div>`
}

function appendUserToUsersTable(
  userId,
  userObj,
  position,
  disable_toggle_button,
  checked_toggle_button
) {
  return ` <tr>
    <td>${userObj.username}</td>
    <td><p class="fw-normal mb-1"> ${userObj.email}</p></td>
    <td><span id="position-badge-${userId}-${position}" class="user-position-${userId}">${position}</span></td>
    <td class="w-auto align-content-center">
      <div class="form-check form-switch align-content-center">
       <div class="d-flex flex-wrap align-content-center justify-content-center">
          <input class="form-check-input switchAdmin" type="checkbox" role="switch" id="flex-switch-check_${userId}" ${checked_toggle_button} ${disable_toggle_button}/>
          <label id="switch-check-label-${userId}" class="form-check-label" for="flex-switch-check">Turn to Admin</label>
        </div>
      </div>
  </td>
  </tr>`;
}

function appendUserDataTable(){
    return ` <div class="container-sm text-center" id="user-data-table">
    <div class="table-responsive-sm">
<table class="table align-middle mb-0 bg-white">
  <thead class="bg-light">
    <tr>
      <th>Name</th>
      <th>Email ID</th>
      <th>Position</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody id="user-data-table">
  </tbody>
</table></div>
</div>`;
}

