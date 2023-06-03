function appendNewNotificationListItem(notificationId,description,dateString){
    return(`<div id="notification-list-item-${notificationId}" class="row mb-2 newNotification">
    <div class="col-auto px-0"><label><h6 class="px-0"><i class="fas fa-bell text-warning"></i> ${description}</h6> 
    </label></div>
    <div class="col text-end"><b>${dateString}</b></div>      
   </div>`)
}

function appendUserToUsersTable(userId,userObj,position,disable_toggle_button,checked_toggle_button){
    return(` <tr>
    <td>${userObj.username}</td>
    <td><p class="fw-normal mb-1"> ${userObj.email}</p></td>
    <td><span id="position-badge-${userId}-${position}" class="user-position-${userId}">${position}</span></td>
    <td class="w-auto align-content-center">
      <div class="form-check form-switch align-content-center">
       <div class="d-flex flex-wrap align-content-center justify-content-center">
          <input class="form-check-input" type="checkbox" role="switch" id="flex-switch-check_${userId}" ${checked_toggle_button} ${disable_toggle_button}/>
          <label id="switch-check-label-${userId}" class="form-check-label" for="flex-switch-check">Turn to Admin</label>
        </div>
      </div>
  </td>
  </tr>`)
}