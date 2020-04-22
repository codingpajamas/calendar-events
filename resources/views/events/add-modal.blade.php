<div class="modal fade" id="addEventModal" tabindex="-1" role="dialog" aria-labelledby="addEventModalLabel" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Add New Event</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<div class="mb-2">
					Event Name
                	<input type="text" v-model="newEvent.name" class="form-control">
				</div>

				<div class="mb-2">
					Date
                	<input type="text" v-model="newEvent.date" class="form-control">
				</div>
			</div>
			<div class="modal-footer justify-content-center"> 
            	<button class="btn-primary btn" @click="submitEventModal">
            		Submit New Event
            	</button> 
			</div>
		</div>
	</div>
</div>