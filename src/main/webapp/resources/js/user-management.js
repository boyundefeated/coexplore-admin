$(function() {
	var table = $('#idDatatable')
			.DataTable(
					{
						"processing" : true,
						"serverSide" : true,
						// "language" : DATATABLE_LANGUAGE_CONFIX,
						"searching" : DATATABLE_ENABLE_SEARCHING,
						"ajax" : {
							url : CONSTANTS.PREFIX_API_PATH + "/user/datatable",
							headers : getAuthHeader(),
						},
						"columns" : [
								{
									"data" : "id"
								},
								{
									"data" : "login",
									"defaultContent" : "",
									"orderable" : true
								},
								{
									"data" : "email",
									"defaultContent" : "",
									"orderable" : true
								},
								{
									"data" : "firstName",
									"defaultContent" : "",
									"orderable" : false
								},
								{
									"data" : "lastName",
									"defaultContent" : "",
									"orderable" : false
								},
								{
									"data" : null,
									"defaultContent" : "",
									"orderable" : false,
									"render" : function(data, type, row) {
										if (row.activated) {
											return "ACTIVATED";
										}
										return 'PENDING';
									},
								},
								{
									"data" : null,
									"defaultContent" : "",
									"orderable" : false,
									"render" : function(data, type, row) {
										if (row.authorities) {
											return row.authorities.toString();
										}
										return '';
									},
								},
								{
									"data" : null,
									"defaultContent" : ''
											+ '<button class="btn btn-info btn-xs" data-title="Edit" data-toggle="modal" data-target="#myModal"><i class="fa fa-pencil"></i> Edit</button>&nbsp'
											+ '<button class="btn btn-danger btn-xs" data-title="Delete"><i class="fa fa-trash-o"></i> Delete </button>',
									"orderable" : false
								} ],
					});
	$('#idDatatable').on(
			'click',
			'button',
			function(event) {
				// console.log('event: ',
				// event.currentTarget.getAttribute('data-title'));
				var row = table.row($(this).parents('tr'));
				var data = row.data();
				var type = event.currentTarget.getAttribute('data-title');

				if (type == 'Edit') {
					$("#idUserId").val(data.id);
					$("#idUserName").val(data.login);
					$("#idUserEmail").val(data.email);
					$("#idUserFirstName").val(data.firstName);
					$("#idUserLastName").val(data.lastName);
					if (data.activated) {
						$("#idUserStatus").val("ACTIVATED");
					} else {
						$("#idUserStatus").val("PENDING");
					}
					$("#idUserRoleUser").prop('checked', false);
					$("#idUserRoleStaff").prop('checked', false);
					$("#idUserRoleAdmin").prop('checked', false);
					if (data.authorities) {
						data.authorities.forEach(function(role) {
							if (role == "ROLE_ADMIN") {
								$("#idUserRoleAdmin").prop('checked', true);
							}
							if (role == "ROLE_STAFF") {
								$("#idUserRoleStaff").prop('checked', true);
							}
							if (role == "ROLE_USER") {
								$("#idUserRoleUser").prop('checked', true);
							}
						}, this);
					}
				}

				if (type == 'Delete') {
					$.confirm({
						title : 'Confirm?',
						content : 'Are you sure?',
						icon : 'fa fa-question-circle',
						closeIcon : true,
						buttons : {
							confirm : {
								text : "Yes",
								btnClass : 'btn-success',
								action : function() {
									$.ajax({
										type : 'DELETE',
										headers : getAuthHeader(),
										url : CONSTANTS.PREFIX_API_PATH
												+ '/user/' + data.login,
										success : function() {
											makeSuccessNotification();
											row.remove().draw(false);
										},
										error : function(err) {
											checkCommonError(err);
										},
										contentType : "application/json",
									});
								}
							},
							cancel : {
								text : "No",
								action : function() {
									console.log('Canceled!');
								}
							}
						}
					});
				}
			});

	$('#myModal').on('show.bs.modal', function(event) {
		var button = $(event.relatedTarget); // Button that triggered the
		// modal
		var modal = $(this);
		var title = button.data('title');
		modal.find('.modal-title').text(title);
		$('#idSubmit').unbind();
		if (title == 'Create') {
			console.log("open");
			$("#idUserId").val("");
			$("#idUserName").val("");
			$("#idUserEmail").val("");
			$("#idUserFirstName").val("");
			$("#idUserLastName").val("");
			$("#idUserStatus").val("");
			$("#idUserRoleUser").prop('checked', false);
			$("#idUserRoleStaff").prop('checked', false);
			$("#idUserRoleAdmin").prop('checked', false);

			$('#idSubmit').on('click', function(e) {
				e.preventDefault();
				var user = {};
				user.login = $("#idUserName").val();
				user.email = $("#idUserEmail").val();
				user.firstName = $("#idUserFirstName").val();
				user.lastName = $("#idUserLastName").val();
				let
				authorities = [];
				if ($('#idUserRoleAdmin').is(':checked')) {
					authorities.push("ROLE_ADMIN");
				}
				if ($('#idUserRoleStaff').is(':checked')) {
					authorities.push("ROLE_STAFF");
				}
				if ($('#idUserRoleUser').is(':checked')) {
					authorities.push("ROLE_USER");
				}
				user.authorities = authorities;

				$.ajax({
					type : "POST",
					url : CONSTANTS.PREFIX_API_PATH + "/user/",
					headers : getAuthHeader(),
					data : JSON.stringify(user),
					contentType : "application/json",
					dataType : 'json',
					success : function(response) {
						makeSuccessNotification();
						$('#myModal').modal('hide');
						table.ajax.reload(null, false); // user paging is not
						// reset on reload
					},
					error : function(err) {
						checkCommonError(err);
					}
				});
				return false;
			});
		} else if (title == 'Edit') {
			$('#idSubmit').on('click', function(e) {
				e.preventDefault();
				var user = {};
				user.id = $("#idUserId").val();
				user.login = $("#idUserName").val();
				user.email = $("#idUserEmail").val();
				user.firstName = $("#idUserFirstName").val();
				user.lastName = $("#idUserLastName").val();
				let
				authorities = [];
				if ($('#idUserRoleAdmin').is(':checked')) {
					authorities.push("ROLE_ADMIN");
				}
				if ($('#idUserRoleStaff').is(':checked')) {
					authorities.push("ROLE_STAFF");
				}
				if ($('#idUserRoleUser').is(':checked')) {
					authorities.push("ROLE_USER");
				}
				user.authorities = authorities;
				$.ajax({
					type : "PUT",
					url : CONSTANTS.PREFIX_API_PATH + "/user/",
					headers : getAuthHeader(),
					data : JSON.stringify(user),
					contentType : "application/json",
					dataType : 'json',
					success : function(response) {
						makeSuccessNotification();
						$('#myModal').modal('hide');
						table.ajax.reload(null, false); // user paging is not
						// reset on reload
					},
					error : function(err) {
						checkCommonError(err);
					}
				});
				return false;
			});
		}
	});

});