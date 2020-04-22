<div class="modal fade" id="editEventModal" tabindex="-1" role="dialog" aria-labelledby="editEventModalLabel" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Edit Event Details</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				Event Name
                <input type="text" v-model="selectedEvent.name" class="form-control">
			</div>
			<div class="modal-footer justify-content-center">
				<button class="btn-danger btn" @click="deleteEvent">
            		<i class="fa fa-trash"></i>
            	</button>
            	<button class="btn-primary btn" @click="saveEvent">
            		Save Changes
            	</button> 
			</div>
		</div>
	</div>
</div>