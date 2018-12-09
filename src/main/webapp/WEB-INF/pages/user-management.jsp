<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- Meta, title, CSS, favicons, etc. -->
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>${title}</title>

<!-- Datatables -->
<link
	href="/resources/vendors/datatables.net-bs/css/dataTables.bootstrap.min.css"
	rel="stylesheet">
<link
	href="/resources/vendors/datatables.net-buttons-bs/css/buttons.bootstrap.min.css"
	rel="stylesheet">
<link
	href="/resources/vendors/datatables.net-fixedheader-bs/css/fixedHeader.bootstrap.min.css"
	rel="stylesheet">
<link
	href="/resources/vendors/datatables.net-responsive-bs/css/responsive.bootstrap.min.css"
	rel="stylesheet">
<link
	href="/resources/vendors/datatables.net-scroller-bs/css/scroller.bootstrap.min.css"
	rel="stylesheet">

</head>

<body class="nav-md">
	<div class="container body">
		<div class="main_container">
			<jsp:include page="../partials/header.jsp" />

			<!-- Modal -->
			<div class="modal fade" id="myModal" role="dialog">
				<div class="modal-dialog modal-dialog-centered">

					<!-- Modal content-->
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal">x</button>
							<h4 class="modal-title">Create user</h4>
						</div>
						<div class="modal-body">
							<div class="row">
								<div class="col-sm-12 col-md-12">
									<form class="form-horizontal form-label-left">
										<div class="form-group" style="display: none;">
											<label>Id</label> <input id="idUserId" type="text">
										</div>
										<div class="form-group">
											<label class="control-label col-md-3 col-sm-3 col-xs-12">Username</label>
											<div class="col-md-9 col-sm-9 col-xs-12">
												<input type="text" class="form-control" id="idUserName"
													placeholder="Username">
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3 col-sm-3 col-xs-12">Email</label>
											<div class="col-md-9 col-sm-9 col-xs-12">
												<input type="text" class="form-control" id="idUserEmail"
													placeholder="Email">
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3 col-sm-3 col-xs-12">First
												name</label>
											<div class="col-md-9 col-sm-9 col-xs-12">
												<input type="text" class="form-control" id="idUserFirstName"
													placeholder="First name">
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3 col-sm-3 col-xs-12">Last
												name</label>
											<div class="col-md-9 col-sm-9 col-xs-12">
												<input type="text" class="form-control" id="idUserLastName"
													placeholder="Last name">
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3 col-sm-3 col-xs-12">Status</label>
											<div class="col-md-9 col-sm-9 col-xs-12">
												<input type="text" class="form-control" id="idUserStatus"
													readonly="readonly">
											</div>
										</div>
										<div class="form-group">
											<label class="col-md-3 col-sm-3 col-xs-12 control-label">Roles
											</label>

											<div class="col-md-9 col-sm-9 col-xs-12">
												<div class="checkbox">
													<label> <input type="checkbox" class="flat"
														id="idUserRoleUser"> Role User
													</label>
												</div>
												<div class="checkbox">
													<label> <input type="checkbox" class="flat"
														id="idUserRoleStaff"> Role Staff
													</label>
												</div>
												<div class="checkbox">
													<label> <input type="checkbox" class="flat"
														id="idUserRoleAdmin"> Role Admin
													</label>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button id="idSubmit" type="button" class="btn btn-info">Submit</button>
							<button type="button" class="btn btn-default"
								data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>
			<!-- page content -->
			<div class="right_col" role="main">
				<div class="">
					<div class="page-title">
						<div class="title_left">
							<h3>User management</h3>
						</div>

						<div class="title_right">
							<!-- <div
								class="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
								<div class="input-group">
									<input type="text" class="form-control"
										placeholder="Search for..."> <span
										class="input-group-btn">
										<button class="btn btn-default" type="button">Go!</button>
									</span>
								</div>
							</div> -->
						</div>
					</div>

					<div class="clearfix"></div>

					<div class="row">
						<div class="col-md-12 col-sm-12 col-xs-12">
							<div class="x_panel">
								<div class="x_title">
									<h2>
										User management <small>Users</small>
									</h2>
									<!-- <ul class="nav navbar-right panel_toolbox">
										<li><a class="collapse-link"><i
												class="fa fa-chevron-up"></i></a></li>
										<li class="dropdown"><a href="#" class="dropdown-toggle"
											data-toggle="dropdown" role="button" aria-expanded="false"><i
												class="fa fa-wrench"></i></a>
											<ul class="dropdown-menu" role="menu">
												<li><a href="#">Settings 1</a></li>
												<li><a href="#">Settings 2</a></li>
											</ul></li>
										<li><a class="close-link"><i class="fa fa-close"></i></a>
										</li>
									</ul> -->
									<div class="title_right">
										<button class="btn btn-success pull-right" data-title="Create"
											data-toggle="modal" data-target="#myModal" id="idCreate">
											<i class="fa fa-plus"></i> Create
										</button>
									</div>
									<div class="clearfix"></div>
								</div>
								<div class="x_content">
									<div class="row">
										<div class="col-sm-12">
											<div class="card-box table-responsive">
												<br>

												<table id="idDatatable"
													class="table table-striped table-bordered">
													<thead>
														<tr>
															<th>ID</th>
															<th>Username</th>
															<th>Email</th>
															<th>First name</th>
															<th>Last name</th>
															<th>Status</th>
															<th>Role</th>
															<th>Action</th>
														</tr>
													</thead>
													<tbody>
													</tbody>

												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
			<!-- /page content -->

			<jsp:include page="../partials/footer.jsp" />


		</div>
	</div>
	<!-- Datatables -->
	<script
		src="/resources/vendors/datatables.net/js/jquery.dataTables.min.js"></script>
	<script
		src="/resources/vendors/datatables.net-bs/js/dataTables.bootstrap.min.js"></script>
	<script
		src="/resources/vendors/datatables.net-buttons/js/dataTables.buttons.min.js"></script>
	<script
		src="/resources/vendors/datatables.net-buttons-bs/js/buttons.bootstrap.min.js"></script>
	<script
		src="/resources/vendors/datatables.net-buttons/js/buttons.html5.min.js"></script>
	<script
		src="/resources/vendors/datatables.net-keytable/js/dataTables.keyTable.min.js"></script>
	<script src="/resources/js/user-management.js"></script>

</body>
</html>
