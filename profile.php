<?php get_header(); $user = wp_get_current_user(); ?>

<h1>Edit Profile</h1>

<div class="content">
	<form>
		<p>
			<label>Name</label>
			<input type="text" value="<?php echo esc_attr( $user->display_name ) ?>" required />
		</p>
		<p>
			<label>Email Address</label>
			<input type="email" value="<?php echo esc_attr( $user->user_email ) ?>" required />
		</p>
		<p>
			<label>Change Password</label>
			<input type="password" required />
			<span class="description">Only enter a new password if you want to change it.</span>
		</p>

		<p>
			<input type="submit" value="Update Profile" />
		</p>
	</form>
</div>

<?php get_footer() ?>
