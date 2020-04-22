<div class="modal fade" id="dateEventModal" tabindex="-1" role="dialog" aria-labelledby="dateEventModalLabel" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">
					@{{month + ' ' + selectedDate.date + ', ' + year}} Events
				</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<ul class="list-group" v-if="selectedDate.events.length"> 
					<li class="list-group-item  d-flex justify-content-between align-items-center" 
						v-for="event in selectedDate.events" 
					>
						@{{event.name}}
						
						<button class="btn btn-sm" @click="editEvent(event)">
							<i class="fa fa-pencil"></i>
						</button>  	 
					</li> 
				</ul>

				<div class="alert alert-warning" v-else>
					No events for this date
				</div>
			</div> 
		</div>
	</div>
</div>