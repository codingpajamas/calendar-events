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
				<div class="mb-3">
					Event Name
					<input type="text" v-model="newEvent.name" class="form-control">
					<small v-cloak class="text-danger" 
						v-if="errors.name" 
						v-for="err in errors.name"
					>@{{err}}</small>
				</div>

				<div class="mb-3">
					Start Date
					<input type="date" v-model="newEvent.start" class="form-control">
					<small v-cloak class="text-danger" 
						v-if="errors.start" 
						v-for="err in errors.start"
					>@{{err}}</small>
				</div>
				<div class="mb-3">
					End Date
					<input type="date" v-model="newEvent.end" class="form-control">
					<small v-cloak class="text-danger" 
						v-if="errors.end" 
						v-for="err in errors.end"
					>@{{err}}</small>
				</div>
				<div class="mb-3">
					<div>Recurrence Rules</div>
					<div class="form-check form-check-inline mr-3" v-for="(day, index) in days" :key="index">
						<input class="form-check-input" type="checkbox" :id="'repeat'+day" :value="day" v-model="newEvent.rrule">
						<label class="form-check-label" :for="'repeat'+day">@{{day}}</label>
					</div>
				</div>
			</div>
			<div class="modal-footer justify-content-center"> 
				<button class="btn-primary btn" @click="submitNewEvent" :disabledxxxx="isSaving">
					<span v-if="isSaving">Submitting...</span>
					<span v-else>Submit New Event</span> 
				</button> 
			</div>
		</div>
	</div>
</div>