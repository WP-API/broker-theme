<?php get_header(); $user = wp_get_current_user(); ?>

<h1>Edit Profile</h1>

<div class="content">
	<form method="post">
		<p>
			<label>Name</label>
			<input name="user_name" type="text" value="<?php echo esc_attr( $user->display_name ) ?>" required />
		</p>
		<p>
			<label>Email Address</label>
			<input name="user_email" type="email" value="<?php echo esc_attr( $user->user_email ) ?>" required />
		</p>
		<p>
			<label>Change Password</label>
			<input name="user_pass" type="password" />
			<span class="description">Only enter a new password if you want to change it.</span>
		</p>

		<p>
			<input type="submit" value="Update Profile" />
		</p>

		<input type="hidden" name="ba-action" value="update-profile" />
		<?php wp_nonce_field( 'ba-update-profile' ) ?>
	</form>
</div>

<?php get_footer() ?>
